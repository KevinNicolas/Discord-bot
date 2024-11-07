// import type { Client, Guild } from "discord.js";
import type { AudioPlayer, AudioResource, VoiceConnection } from "@discordjs/voice"
import type ytdl from "@distube/ytdl-core";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, NoSubscriberBehavior } from "@discordjs/voice";
import { YtdlService } from './ytdl.service'

interface IQueueItem {
  info: Awaited<ReturnType<typeof ytdl.getBasicInfo>>['videoDetails'];
  resource?: AudioResource
}

export class AudioPlayerService {
  private nowPlaying?: IQueueItem['info'];
  private queue: IQueueItem[] = [];
  private player: AudioPlayer = createAudioPlayer({ 
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    }
  });
  private state = {
    isPlaying: false,
    paused: false
  }

  constructor(
    private readonly voiceConnection: VoiceConnection
  ) {
    this.voiceConnection.subscribe(this.player);
    this.loadListeners();
  }

  
  private playNow(info: IQueueItem['info']) {
    const resource = createAudioResource(YtdlService.fetchStream(info.video_url));
    this.player.play(resource);
    this.nowPlaying = info;
  }

  private loadListeners() {
    this.player.on(AudioPlayerStatus.Idle, () => {
      const nextSong = this.queue.shift();
      if (!nextSong) {
        this.nowPlaying = undefined;
        this.state.isPlaying = false;
        return;
      }

      this.playNow(nextSong.info);
    })

    this.player.on(AudioPlayerStatus.Paused, () => {
      this.state.paused = true;
    })

    this.player.on(AudioPlayerStatus.Playing, () => {
      this.state.isPlaying = true;
      this.state.paused = false;
    })
  }

  public async play(url: string): Promise<IQueueItem['info'] & { inQueue: boolean }> {
    const info = await YtdlService.fetchBasicInfo(url);
    if (this.state.isPlaying) {
      this.queue.push({ info });
      return { ...info, inQueue: true };
    }

    this.playNow(info);
    return { ...info, inQueue: false };
  }

  public pause() {
    this.player.pause();
  }

  public resume() {
    this.player.unpause();
  }

  public disconnect() {
    this.voiceConnection.disconnect();
  }

  public destroy() {
    this.voiceConnection.destroy();
  }
}