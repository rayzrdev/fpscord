import { Message, GuildMember, GuildChannel, TextChannel } from 'discord.js'
import { IntRange } from './utils'

export type Invite = {
    from: GuildMember
    to: GuildMember
    arena: Arena
    channel: GuildChannel & TextChannel
}

export type Arena = {
    name: string
    background: string
}

export type Effect = {
    mutateGameState?(game: Game, currentPlayer: Player): Game
    mutatePlayerState?(currentPlayer: Player): Player
    shouldPersist?(game: Game, currentPlayer: Player): boolean
}

export type Weapon = {
    damage: IntRange
    accuracy: number
    effect?: Effect
}

export type Player = {
    user: GuildMember
    health: number
    weapon?: Weapon
    effects: Effect[]
}

export type Game = {
    players: Player[]
    currentPlayer: number
    arena: Arena
    message: Message
}

