import type { Client } from "discord.js";

import { guildCreate } from './guild-create.event'
import { onInteractionCreate } from './interaction-create.event'
import { onReady } from './ready.event'

export function loadListeners(client: Client) {
  client.once('ready', onReady);
  
  client.on('interactionCreate', onInteractionCreate);
  client.on('guildCreate', guildCreate);
}