import { resolve } from 'path'
import { readdirSync } from 'fs'
import { Command } from './types/command'

export function loadCommands(): Map<string, Command> {
    const commands = new Map<string, Command>()
    // Read every file in ./commands and filter out the non-JS files
    readdirSync(resolve(__dirname, 'commands'))
        .filter(f => f.endsWith('.js'))
        .forEach(async f => {
            // Attempt to load the file
            console.log(`Loading command ${f}`)
            try {
                const command = await import(`./commands/${f}`) as Command
                commands.set(command.info.name, command)
            } catch (error) {
                console.error(`Failed to load command ${f}: ${error}`)
            }
        })

    return commands
}
