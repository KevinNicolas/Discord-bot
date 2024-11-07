import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { Command } from '../command'

export class ResumeCommand extends Command {
  constructor(client: Client) {
    const name = 'resume';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Reanuda la reproduccion de la cancion actual');
    
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

    if (!audioPlayer.actualSong) {
      reply('No hay una cancion reproduciendose actualmente')
      return;
    }

    audioPlayer.resume();
    reply(`Se reanudo la cancion ${audioPlayer.actualSong.title}`)
  }
}

export default ResumeCommand
module.exports = ResumeCommand