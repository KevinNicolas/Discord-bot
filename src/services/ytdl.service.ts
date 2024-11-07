import ytdl from '@distube/ytdl-core'

interface IAudioInfo {
  info: Awaited<ReturnType<typeof ytdl.getBasicInfo>>['videoDetails']
  stream: ReturnType<typeof ytdl>
}

export class YtdlService {
  static async fetchAudio(url: string): Promise<IAudioInfo> {
    const videoInformation = await this.fetchBasicInfo(url)
    const stream = this.fetchStream(url)
    
    return {
      info: videoInformation,
      stream
    }
  }
  
  static fetchStream(url: string) {
    return ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    })
  }

  static async fetchBasicInfo(url: string) {
    return (await ytdl.getBasicInfo(url)).videoDetails
  }
}