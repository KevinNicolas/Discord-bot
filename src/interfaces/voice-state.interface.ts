import { PlayerSubscription, VoiceConnection } from "@discordjs/voice"
import ytdl from "@distube/ytdl-core";
import { Guild } from "discord.js"
import internal from "stream";

export interface IVoiceState {
  guild: Guild;
  voiceConnection: VoiceConnection;
  playerSubscription: PlayerSubscription;
  queue: Array<{
    info: Awaited<ReturnType<typeof ytdl.getBasicInfo>>['videoDetails']
    stream?: internal.Readable
  }>
  volume: number;
  loop?: boolean;
  playing: boolean;
}