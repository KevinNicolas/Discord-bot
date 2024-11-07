import type { ChatInputCommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import { joinVoiceChannel, VoiceConnection } from "@discordjs/voice";

export function joinIntoVoiceChannel(interaction: ChatInputCommandInteraction): { connection?: VoiceConnection, voiceChannel?: VoiceBasedChannel, error?: string } {

  const member: GuildMember = interaction.member as GuildMember;
  if (!member.voice.channel) {
    return { error: "No estas en un canal de voz" };
  }

  const voiceChannel = member.voice.channel

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guild!.id,
    adapterCreator: interaction.guild!.voiceAdapterCreator as any,
  })

  return {
    connection,
    voiceChannel
  };
}