import { Message, GuildMember } from 'discord.js'
import { IntRange } from './utils'

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
    arena: Arena
    message: Message
}

