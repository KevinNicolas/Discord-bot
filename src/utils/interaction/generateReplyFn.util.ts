import type { ChatInputCommandInteraction, CommandInteraction } from "discord.js";

export function generateReplyFn(interaction: CommandInteraction | ChatInputCommandInteraction, ...conditionList: Array<() => boolean>) {
  const isRepliable = () => {
    const condition = interaction.isRepliable();
    return condition;
  }
  
  const sendReply = [isRepliable, ...conditionList].every(condition => condition());
  
  const reply = (message: string) => (sendReply && interaction.reply(message))
  return reply
}