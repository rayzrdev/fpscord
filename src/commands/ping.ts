import { Command } from '../types/command'

const pingCommand: Command = {
    run(_, msg) {
        msg.channel.send(':watch: | Ping!').then(m => {
            m.edit(`:watch: | Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\``)
        })
    },
    info: {
        name: 'ping',
        usage: 'ping',
        description: 'Pings the bot to check its connection speed.'
    }
}

export default pingCommand
