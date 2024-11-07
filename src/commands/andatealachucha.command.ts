import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../command"
import { getVoiceChannelConnection } from '../utils';

export class AndateALaChuchaCommand extends Command {
  constructor(client: Client) {
    const name = 'andate-a-la-chucha';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Salir del canal de voz');
    
    super({
      client,
      name,
      commandDefinition,
    })
  }

  public execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>): void {
    const reply = this.getReply(interaction);

    const voiceConnection = getVoiceChannelConnection(interaction);
    if (!voiceConnection.connection) return;

    voiceConnection.connection.disconnect();
    voiceConnection.connection.destroy();

    reply('Done!');
  }
}

export default AndateALaChuchaCommand
module.exports = AndateALaChuchaCommand