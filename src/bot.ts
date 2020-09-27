import * as dotenv from 'dotenv'
dotenv.config()

import { Client, Message } from 'discord.js'

import { ExtendedClient } from './types/client'
import { loadConfig } from './config'
import { loadCommands } from './commands'

const config = loadConfig()
const commands = loadCommands()
const bot = new Client({ disableMentions: 'everyone' }) as ExtendedClient

bot.config = config
bot.commands = commands

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user?.tag} (ID: ${bot.user?.id})`)
    bot.generateInvite([
        'SEND_MESSAGES',
        'MANAGE_MESSAGES'
    ]).then(invite => {
        console.log(`Click here to invite the bot to your guild:\n${invite}`)
    })
})

function getContent(message: Message): string | null {
    const { content } = message
    const prefixes = [
        config.prefix,
        ...(bot.user ? [bot.user.toString()] : [])
    ]

    const found = prefixes.find(prefix => content.startsWith(prefix))

    return found ? content.substr(found.length).trim() : null
}

bot.on('message', message => {
    if (message.author.bot || !message.guild) {
        return
    }

    const content = getContent(message)
    if (!content) {
        return
    }

    const split = content.split(' ')
    const label = split[0]
    const args = split.slice(1)

    commands.get(label)?.run(bot, message, args)
})

bot.login(config.token)
