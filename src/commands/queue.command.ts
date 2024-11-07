import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
import { Command } from '../command'

export class QueueCommand extends Command {
  constructor(client: Client) {
    const name = 'queue';
    const commandDefinition = new SlashCommandBuilder()
      .setName(name)
      .setDescription('Muestra el queue de canciones');
    
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

    const songList = audioPlayer.songQueue.map((song, index) => `${index + 1}. ${song.title}`);
    let messages = audioPlayer.actualSong ? [`*. Reproduciendo actualmente: "${audioPlayer.actualSong.title}"`, ...songList] : songList;
    reply(messages.join('\n'));
  }
}

export default QueueCommand
module.exports = QueueCommand