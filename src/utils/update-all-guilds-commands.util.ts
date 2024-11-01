import type { Client } from "discord.js";
import { deployCommands } from "./deploy-commands.util";

export async function updateAllGuildCommands(client: Client) {
  const guilds = await client.guilds.fetch()
  
  for (const [,guild] of guilds) {
    console.log(`Deploy commands on "${guild.name}" server`)
    await deployCommands({ guildId: guild.id })
  }
}