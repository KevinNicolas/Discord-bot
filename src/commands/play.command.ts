import type { ChatInputCommandInteraction, Client } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { createAudioPlayer, createAudioResource, NoSubscriberBehavior } from "@discordjs/voice";
import { Command } from "../command";
import { getVoiceChannelConnection, joinIntoVoiceChannel } from "../utils";
import { AudioPlayerService, YtdlService } from "../services";
import { IVoiceState } from "interfaces";

export class PlayCommand extends Command {
  constructor(client: Client) {
    const name = 'play';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Reproducir una musica')
      .addStringOption((option) => option
        .setName('url')
        .setDescription('Url de la musica a reproducir')
        .setRequired(true)
      );
    
    super({
      client,
      name,
      commandDefinition,
    })
  }

  public async execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>) {
    const reply = this.getReply(interaction);

    let voiceChannel = getVoiceChannelConnection(interaction);

    if (!voiceChannel.connection) {
      const voiceConnection = joinIntoVoiceChannel(interaction)
      if (voiceConnection.error) {
        reply(voiceConnection.error)
        return;
      }

      voiceChannel = voiceConnection;

      if (voiceChannel.error) {
        reply(voiceChannel.error)
        return;
      }
    }

    let audioPlayer = this.client.audioPlayer.get(interaction.guild!.id)
    if (!audioPlayer) {
      audioPlayer = new AudioPlayerService(voiceChannel.connection!);
      this.client.audioPlayer.set(interaction.guild!.id, audioPlayer);
    }

    const url = interaction.options.getString('url', true)
    const audioInfo = await audioPlayer.play(url);

    const message = audioInfo.inQueue 
      ? `"${audioInfo.title}" fue agregado al queue`
      : `Reproduciendo "${audioInfo.title}"`;

    reply(message)
  }
}

export default PlayCommand
module.exports = PlayCommand
