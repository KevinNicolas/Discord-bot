import { AudioPlayerService } from "../services";
import { ICommand } from "../interfaces";
import type { Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, ICommand>;
    audioPlayer: Map<string, AudioPlayerService>
  }
  export type InteractionType<T extends ApplicationCommandType> = T extends ApplicationCommandType.ChatInput
  ? ChatInputCommandInteraction
  : T extends ApplicationCommandType.Message
  ? MessageContextMenuCommandInteraction
  : T extends ApplicationCommandType.User
  ? UserContextMenuCommandInteraction
  : never;
}