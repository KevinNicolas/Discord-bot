import type { CacheType, ChatInputCommandInteraction, Interaction } from 'discord.js'
import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js'
import { sync } from 'glob'
import { resolve } from 'path'
import Config from './config'
import { ICommand } from './interfaces'

export class BotClient extends Client {

  constructor() {
    const intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
    ]

    super({ intents });
    
    this.rest = new REST({ version: "10" }).setToken(Config.discord.token)
    this.init();
  }

  private async init() {
    this.commands = new Collection();
    this.voiceState = new Map();

    await this.loadCommands();
    await this.loadEvents();
    this.login(Config.discord.token);
  }

  private async loadCommands() {
    console.log('# - Loading commands')
    
    const commandsDefinitions = []

    const commandFiles = sync('**/*.command.js');
    for (let commandFilePath of commandFiles) {
      commandFilePath = resolve(commandFilePath);
      const File = require(commandFilePath);
      const command = new File(this);
      command.client = this;
      this.commands.set(command.name, command);
      commandsDefinitions.push(command.commandDefinition as ICommand['commandDefinition'])
    }

    console.log('└ ✅ Done!\n')

    const guilds = await this.guilds.fetch();

    for (const [, guild] of guilds) {
      console.log(`# - Deploy commands on "${guild.name}" server`)
      try {
        await this.rest.put(
          Routes.applicationGuildCommands(Config.discord.appId, guild.id),
          {
            body: commandsDefinitions
          }
        )
        console.log(`└ ✅ Done!`)
      } catch (error) {
        console.error(error);
      }
    }
    console.log('✅ Commands loaded\n')
  }

  private async loadEvents() {
    this.once('ready', () => console.log(`
      ┌----------------┐\n
        ✅ Bot ready!\n  
      └----------------┘\n
    `));
    
    this.on('interactionCreate', (interaction: Interaction<CacheType>) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;
      const command = this.commands.get(commandName);

      if (!command) return interaction.reply('Comando no encontrado...');
      command.execute(interaction as ChatInputCommandInteraction);
    });
  }
}