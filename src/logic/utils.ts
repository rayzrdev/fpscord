import { IntRange } from '../types/utils'

export function randomInRangeInclusive(range: IntRange): number {
    const [min, max] = range

    return min + Math.round(Math.random() * (max - min))
}
