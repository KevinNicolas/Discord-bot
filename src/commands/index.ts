export * from './ping.command'

import { PingCommand } from './ping.command'

export const commands = Object.freeze({
  ping: PingCommand
})
export default commands;

// const rest = new REST({ version: "10" }).setToken(Config.discord.token)

// type DeployCommandsProps = {
//   guildId: string;
// };

// export async function deployCommands({ guildId }: DeployCommandsProps) {
//   try {
//     await rest.put(
//       Routes.applicationGuildCommands(Config.discord.appId, guildId),
//       {
//         body: Object.values(commands).map(({ data }) => data)
//       }
//     )
//   } catch (error) {
//     console.error(error);
//   }
// }