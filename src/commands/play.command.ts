import type { ChatInputCommandInteraction } from 'discord.js'
import path from 'path'
import { SlashCommandBuilder } from 'discord.js'
import { createAudioResource, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior } from '@discordjs/voice'
import { generateReplyFn, getVoiceChannelConnection } from 'src/utils'
import { JoinCommand } from './join.command'

const commandDefinition = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play music!')
  // .addStringOption((option) => option
  //   .setName('url')
  //   .setDescription('Url de la musica')
  //   .setRequired(true)
  // )

async function handlePlayCommand(interaction: ChatInputCommandInteraction) {
  const reply = generateReplyFn(interaction);
  let voiceChannelConnection = getVoiceChannelConnection(interaction, { sendReply: false });
  
  if (!voiceChannelConnection) {
    const voiceConnection = JoinCommand.execute(interaction, { sendReply: false });
    if (!voiceConnection) return;
    voiceChannelConnection = voiceConnection;
  }

  const player = createAudioPlayer({ 
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    } 
  });

  voiceChannelConnection.setSpeaking(true);
  const sub = voiceChannelConnection.subscribe(player);
  const source = createAudioResource(path.join(__dirname, '../song.mp3'));
  sub?.player.play(source);


  reply("Done")
}

export const PlayCommand = {
  data: commandDefinition,
  execute: handlePlayCommand
}