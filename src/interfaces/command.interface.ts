import { ChatInputCommandInteraction, Client, SlashCommandOptionsOnlyBuilder } from "discord.js";

export interface ICommand {
  name: string
  commandDefinition: SlashCommandOptionsOnlyBuilder
  execute: (interaction: ChatInputCommandInteraction, opts?: Record<string, any>) => any
}