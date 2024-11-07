import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { Command } from '../command'

export class SkipCommand extends Command {
  constructor(client: Client) {
    const name = 'skip';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Pasar a la siguiente cancion del queue');
    
    super({
      client,
      name,
      commandDefinition,
    })
  }

  public execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>): void {
    const reply = this.getReply(interaction);
    
    const audioPlayer = this.client.audioPlayer.get(interaction.guild!.id);
    if (!audioPlayer) {
      reply('No me encuentro en un canal de voz');
      return;
    }

    const song = audioPlayer.skip();
    if (!song) {
      reply('No hay mas canciones en el queue');
      return;
    }

    reply(`Reproduciendo "${song.title}"`)
  }
}

export default SkipCommand
module.exports = SkipCommand