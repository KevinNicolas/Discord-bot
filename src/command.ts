import { ChatInputCommandInteraction, Client, InteractionReplyOptions, MessagePayload, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { ICommand } from "./interfaces";

interface IConstructorParams {
  name: ICommand['name'];
  client: Client;
  commandDefinition: ICommand['commandDefinition'];
  replyConditions?: Array<() => boolean>
}

export abstract class Command implements ICommand {
  public commandDefinition: SlashCommandOptionsOnlyBuilder;
  public name: string;
  protected client: Client<boolean>;
  private replyConditions: Array<() => boolean>;
  
  constructor({ client, commandDefinition, name, replyConditions }: IConstructorParams) {
    this.name = name;
    this.commandDefinition = commandDefinition;
    this.client = client
    this.replyConditions = replyConditions ?? [];
  }

  public getReply(interaction: ChatInputCommandInteraction) {
    return (options: string | InteractionReplyOptions | MessagePayload): ReturnType<ChatInputCommandInteraction['reply']> | null => {
      const isRepliable = () => {
        return interaction.isRepliable();
      }
      
      const conditions = [isRepliable, ...this.replyConditions]
      if (conditions.some((condition) => !condition())) return null;
      
      return interaction.reply(options);
    };
  }

  public execute(interaction: ChatInputCommandInteraction, opts?: Record<string, any>): void | Promise<void> {
    const reply = this.getReply(interaction);
  };
}