require('dotenv').config()

import * as path from 'path'
import * as fs from 'fs'
import { Client, Message } from 'discord.js'

import { ExtendedClient } from './types/client'
import { Command } from './types/command'
import { loadConfig } from './config'

const config = loadConfig()

const commands = new Map<string, Command>()
const bot = new Client({ disableMentions: 'everyone' }) as ExtendedClient

bot.config = config
bot.commands = commands

// Read every file in ./commands and filter out the non-JS files
fs.readdirSync(path.resolve(__dirname, 'commands'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        // Attempt to load the file
        console.log(`Loading command ${f}`)
        try {
            // Require the raw file
            let command = require(`./commands/${f}`)
            // Validate that there's a run function and a valid help object
            if (typeof command.run !== 'function') {
                throw 'Command is missing a run function!'
            } else if (!command.help || !command.help.name) {
                throw 'Command is missing a valid help object!'
            }
            // Store the command in the map based on its name
            commands.set(command.help.name, command)
        } catch (error) {
            // Log any errors from the validator or from requiring the file
            console.error(`Failed to load command ${f}: ${error}`)
        }
    })

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user?.tag} (ID: ${bot.user?.id})`)
    bot.generateInvite([
        'SEND_MESSAGES',
        'MANAGE_MESSAGES'
    ]).then(invite => {
        console.log(`Click here to invite the bot to your guild:\n${invite}`)
    })
})

const getContent = (message: Message): string | null => {
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
