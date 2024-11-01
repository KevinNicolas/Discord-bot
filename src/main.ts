import { Client, GatewayIntentBits } from 'discord.js'
import Config from './config'

import { loadListeners } from './events'
import { updateAllGuildCommands } from './utils'

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent
]

const client = new Client({ intents })

async function boostrap() {
  
  await updateAllGuildCommands(client);
  loadListeners(client);

  client.login(Config.discord.token);
}
boostrap();