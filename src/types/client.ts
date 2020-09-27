import { Client } from 'discord.js'
import { Command } from './command'
import { BotConfig } from '../config'

export type ExtendedClient = Client & {
    config: BotConfig
    commands: Map<string, Command>
}
