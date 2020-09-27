import { Snowflake, Message } from 'discord.js'
import { Invite, Game } from './types/game'
import { createGame } from './logic/game'
import { shuffle } from 'lodash'

export const GameManager = {
    games: [] as Game[],
    invites: [] as Invite[],

    findGame(id: Snowflake): Game | undefined {
        return this.games.find(game => game.players.some(player => player.user.id === id))
    },
    findGameByMessage(message: Message): Game | undefined {
        return this.games.find(game => game.message.id === message.id)
    },
    findInvite(id: Snowflake): Invite | undefined {
        return this.invites.find(invite => invite.from.id === id || invite.to.id === id)
    },
    removeInvite(invite: Invite): boolean {
        const index = this.invites.indexOf(invite)
        if (index > -1) {
            this.invites.splice(index, 1)
            return true
        }
        return false
    },
    async startGame(invite: Invite): Promise<boolean> {
        if (!this.removeInvite(invite)) {
            return false
        }

        if (this.findGame(invite.from.id) || this.findGame(invite.to.id)) {
            return false
        }

        const message = await invite.channel.send(':hourglass: Generating game, please wait...')

        const game = createGame({
            users: shuffle([invite.to, invite.from]),
            arena: invite.arena,
            message
        })

        this.games.push(game)

        await renderGame(game)

        return true
    }
}
