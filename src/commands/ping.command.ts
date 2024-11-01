import type { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'

const commandDefinition = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Test connectivity')

async function handlePingCommand(interaction: CommandInteraction) {
  console.info('Handler')
  interaction.reply('Pong!')
}

export const PingCommand = {
  data: commandDefinition,
  execute: handlePingCommand
}