import { randomIn } from 'contingent'

export function capitalize(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export function getIntPart(len: number) {
  const ints: string[] = []
  for (let i = 0; i < len; i++) {
    ints.push(randomIn(0, 10).toString())
  }
  return ints.join('')
}
