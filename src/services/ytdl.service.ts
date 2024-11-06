import ytdl from '@distube/ytdl-core'

interface IAudioInfo {
  info: Awaited<ReturnType<typeof ytdl.getBasicInfo>>['videoDetails']
  stream: ReturnType<typeof ytdl>
}

export class YtdlService {
  static async fetchAudio(url: string): Promise<IAudioInfo> {
    const videoInformation = await ytdl.getBasicInfo(url);
    const stream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    })
    
    return {
      info: videoInformation.videoDetails,
      stream
    }

  }
}