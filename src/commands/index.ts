export * from './ping.command'

import { JoinCommand } from './join.command';
import { LeaveCommand } from './leave.command';
import { PingCommand } from './ping.command';
import { PlayCommand } from './play.command';

export const commands = Object.freeze({
  join: JoinCommand,
  leave: LeaveCommand,
  ping: PingCommand,
  play: PlayCommand
})
export default commands;