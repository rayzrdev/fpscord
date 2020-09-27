import { GuildMember, Message, ReactionEmoji } from 'discord.js'
import { Arena, Game, Player } from '../types/game'

export const createPlayer = (user: GuildMember): Player => ({
    user,
    health: 100,
    effects: [],
})

export const createGame = (options: {users: GuildMember[], arena: Arena, message: Message}): Game => ({
    players: options.users.map(createPlayer),
    arena: options.arena,
    message: options.message,
})

export const getCurrentPlayer = (game: Game): Player => game.players[0]

export const handleReaction = (game: Game, reaction: ReactionEmoji): Game => {
    const currentPlayer = game.players[0]
    const target = game.players[1]

    const newState = {
        ...game,
        players: [...game.players.slice(1), game.players[0]]
    }

    return newState
}
