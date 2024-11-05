import type { Client } from "discord.js";
import { Player, ExtractorLoaderOptionDict } from "discord-player";
import { YoutubeiExtractor } from 'discord-player-youtubei'

import Config from 'src/config'

const defaultExtractors: Readonly<Array<keyof ExtractorLoaderOptionDict>> = [
  'YouTubeExtractor'
] as const

export class PlayerService {
  static async loadPlayer(client: Client) {
    const player = new Player(client)

    await player.extractors.register(YoutubeiExtractor, {
      authentication: Config.youtube.credential,
      streamOptions: {
        useClient: 'ANDROID'
      }
    })

    await player.extractors.loadDefault((ext) => !defaultExtractors.includes(ext))
  }
}