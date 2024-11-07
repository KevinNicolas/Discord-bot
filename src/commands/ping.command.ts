import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { Command } from '../command'

export class PingCommand extends Command {
  constructor(client: Client) {
    const name = 'ping';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Prueba de conexion');
    
    super({
      client,
      name,
      commandDefinition,
    })
  }

  public execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>): void {
    const reply = this.getReply(interaction);
    
    reply('Pong!');
  }
}

export default PingCommand
module.exports = PingCommand