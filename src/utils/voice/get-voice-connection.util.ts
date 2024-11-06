import type { CommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import type { VoiceConnection } from '@discordjs/voice'
import { getVoiceConnection } from '@discordjs/voice'
// import { generateReplyFn } from "src/utils";

interface IOptions {
  sendReply?: boolean
}

export function getVoiceChannelConnection(interaction: CommandInteraction, options?: IOptions): { connection?: VoiceConnection, voiceChannel?: VoiceBasedChannel, error?: string }  {
  const { sendReply = true } = options ?? {};

  // const reply = generateReplyFn(interaction, () => sendReply)

  const me: GuildMember = interaction.guild?.members.me!
  const voiceChannel = me.voice?.channel;
  if (!voiceChannel) {
    return {
      error: "No estoy en un canal de voz #001"
    }
  }
  
  const connection = getVoiceConnection(voiceChannel.guild.id);
  if (!connection) {
    return {
      error: "No estoy en un canal de voz #002"
    }
  }

  return {
    connection,
    voiceChannel
  }
}