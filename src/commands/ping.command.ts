import type { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { generateReplyFn } from 'src/utils'

const commandDefinition = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Test connectivity')

async function handlePingCommand(interaction: CommandInteraction) {
  const reply = generateReplyFn(interaction);
  
  reply('Pong!')
}

export const PingCommand = {
  data: commandDefinition,
  execute: handlePingCommand
}