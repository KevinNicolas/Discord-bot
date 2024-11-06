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

    const voiceState = this.client.voiceState.get(interaction.guild!.id);
    
    if (!voiceState) {
      reply('No se ha creado ningun queue')
      return
    }
    const message = voiceState?.queue.map(({ info }, index) => `${index + 1}. ${info.title}`);
    
    reply(message.join('\n'));
  }
}

export default QueueCommand
module.exports = QueueCommand