import type { Client, ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../command";
import { joinIntoVoiceChannel } from '../utils'
import { AudioPlayerService } from '../services'

export class JoinCommand extends Command {
  constructor(client: Client) {
    const name = 'join';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Hace que el bot ingrese al canal de voz en el que te encuentras');

    super({
      client,
      name,
      commandDefinition
    })
  }

  public execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>): void {
    const reply = this.getReply(interaction);

    const voiceChannelInfo = joinIntoVoiceChannel(interaction);
    if (voiceChannelInfo.error) {
      reply(voiceChannelInfo.error);
      return;
    }

    const audioPlayer = new AudioPlayerService(voiceChannelInfo.connection!);
    this.client.audioPlayer.set(interaction.guild!.id, audioPlayer);

    reply(`Ingresando a "${voiceChannelInfo.voiceChannel?.name}"`)
  }
}

export default JoinCommand
module.exports = JoinCommand