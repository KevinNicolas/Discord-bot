import { Client, GatewayIntentBits } from 'discord.js'

import Config from './config'
import { loadListeners } from './events'
import { updateAllGuildCommands } from './utils'
import { PlayerService } from './services'

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates,
]

const client = new Client({ intents })

async function boostrap() {
  // await PlayerService.loadPlayer(client);

  loadListeners(client);
  
  client.login(Config.discord.token);
  await updateAllGuildCommands(client);
}
boostrap();