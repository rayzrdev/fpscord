import { Message, PermissionString } from 'discord.js'
import { ExtendedClient } from './client'

export type Command = {
    run(bot: ExtendedClient, message: Message, args: string[]): Promise<any> | any
    info: CommandInfo
}

export type CommandInfo = {
    name: string
    usage?: string
    description: string
    ownerOnly?: boolean
    permissions?: PermissionString[]
}
