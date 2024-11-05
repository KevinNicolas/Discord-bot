import type { CommandInteraction } from "discord.js";
import type { VoiceConnection } from '@discordjs/voice'
import { getVoiceConnection } from '@discordjs/voice'
import { generateReplyFn } from "src/utils";

interface IOptions {
  sendReply?: boolean
}

export function getVoiceChannelConnection(interaction: CommandInteraction, options?: IOptions): VoiceConnection | null  {
  const { sendReply = true } = options ?? {};

  const reply = generateReplyFn(interaction, () => sendReply)

  const voiceChannel = interaction.guild?.members.me?.voice?.channel;
  if (!voiceChannel) {
    reply("No estoy en un canal de voz #001")
    return null
  }
  
  const voiceConnection = getVoiceConnection(voiceChannel.guild.id);
  if (!voiceConnection) {
    reply("No estoy en un canal de voz #002")
    return null
  }

  return voiceConnection
}