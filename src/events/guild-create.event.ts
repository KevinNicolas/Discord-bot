import type { Guild } from "discord.js";
import { deployCommands } from '../utils'

export async function guildCreate(guild: Guild) {
  await deployCommands({ guildId: guild.id })
}