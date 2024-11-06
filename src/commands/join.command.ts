import type { ChatInputCommandInteraction, GuildMember } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { joinVoiceChannel, VoiceConnection } from '@discordjs/voice'
import { generateReplyFn } from 'src/utils'

const commandDefinition = new SlashCommandBuilder()
  .setName('join')
  .setDescription('Join in a voice channel');


interface IOptions {
  sendReply?: boolean
}

function handleJoinCommand(interaction: ChatInputCommandInteraction, options?: IOptions): VoiceConnection | null {
  const { sendReply = true } = options ?? {}
  const reply = generateReplyFn(interaction, () => sendReply)

  const member: GuildMember = interaction.member as GuildMember;
  if (!member.voice.channel) {
    reply("No estas en un canal de voz");
    return null;
  }

  const connection = joinVoiceChannel({
    channelId: member.voice.channel?.id,
    guildId: interaction.guild!.id,
    adapterCreator: interaction.guild!.voiceAdapterCreator as any,
  })

  reply("Done");
  connection.setSpeaking(false);
  return connection;
}

export const JoinCommand = {
  data: commandDefinition,
  execute: handleJoinCommand
}