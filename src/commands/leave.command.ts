import type { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { getVoiceChannelConnection } from 'src/utils';
import { generateReplyFn } from 'src/utils'


const commandDefinition = new SlashCommandBuilder()
  .setName('leave')
  .setDescription('Leave of voice channel')

async function handleLeaveCommand(interaction: CommandInteraction) {
  const reply = generateReplyFn(interaction)

  const voiceConnection = getVoiceChannelConnection(interaction);
  if (!voiceConnection) return;
  
  voiceConnection.disconnect();
  reply("Done")
}

export const LeaveCommand = {
  data: commandDefinition,
  execute: handleLeaveCommand
}