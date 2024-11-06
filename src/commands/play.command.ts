import type { ChatInputCommandInteraction, Client } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { createAudioPlayer, createAudioResource, NoSubscriberBehavior } from "@discordjs/voice";
import { Command } from "../command";
import { getVoiceChannelConnection, joinIntoVoiceChannel } from "../utils";
import { YtdlService } from "../services";
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

    let voiceState = this.client.voiceState.get(interaction.guild!.id)
    if (!voiceState) {
      const player = createAudioPlayer({ 
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        } 
      });

      

      const state: IVoiceState = {
        guild: interaction.guild!,
        playerSubscription: voiceChannel.connection!.subscribe(player)!,
        queue: [],
        voiceConnection: voiceChannel.connection!,
        volume: 100,
        loop: false,
        playing: false
      }

      voiceState = state;
      this.client.voiceState.set(interaction.guild!.id, voiceState)
    }

    voiceState.voiceConnection.setSpeaking(true);

    const url = interaction.options.getString('url', true)
    const audioDetails = await YtdlService.fetchBasicInfo(url)

    if (voiceState.playing) {
      voiceState.queue.push({ info: audioDetails });
      reply(`"${audioDetails.title}" fue agregado al queue`);
    }
    else {
      const stream = YtdlService.fetchStream(url);
      const source = createAudioResource(stream);
      voiceState.playerSubscription.player.play(source);
      voiceState.playing = true;
      reply(`Reproduciendo "${audioDetails.title}"`);
    }

    this.client.voiceState.set(interaction.guild!.id, voiceState);
  }
}

export default PlayCommand
module.exports = PlayCommand
