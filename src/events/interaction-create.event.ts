import type { CacheType, Interaction } from "discord.js";
import { commands } from '../commands'

export async function onInteractionCreate(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
}