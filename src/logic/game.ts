import { stripIndents } from 'common-tags'
import { GuildMember, Message, MessageEmbed, ReactionEmoji } from 'discord.js'
import { Arena, Game, Player } from '../types/game'

export const createPlayer = (user: GuildMember): Player => ({
    user,
    health: 100,
    effects: [],
})

export const createGame = (options: {users: GuildMember[], arena: Arena, message: Message}): Game => ({
    players: options.users.map(createPlayer),
    currentPlayer: 0,
    arena: options.arena,
    message: options.message,
})

export const getCurrentPlayers = (game: Game): [currentPlayer: Player, target: Player] => {
    return [game.players[game.currentPlayer], game.players[(game.currentPlayer + 1) % 2]]
}

export const renderGame = async (game: Game): Promise<Game> => {
    const [currentPlayer, target] = getCurrentPlayers(game)

    await game.message.edit({
        embed: new MessageEmbed()
            .setColor(0X36393F)
            .setDescription(stripIndents`
                **${currentPlayer.user.toString()}'s turn**
                ${currentPlayer.health} :heart:

                **${target.user.toString()}: ${target.health} :heart:**
            `)
    })

    return game
}

export const getCurrentPlayer = (game: Game): Player => game.players[0]

export const handleReaction = (game: Game, reaction: ReactionEmoji): Game => {
    const [currentPlayer, target] = getCurrentPlayers(game)

    const newState = {
        ...game,
        currentPlayer: (game.currentPlayer + 1) % 2
    }

    return newState
}

