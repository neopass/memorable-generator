import { WordsByLengthView, ByLengthResult } from '@neopass/words-by-length-view'

import {
  GeneratorPlugin,
  pullFromClass,
  expandClass,
  classes,
  toChars,
  GenUnits,
} from 'neopass'

import { randomIn, randomBit, randomOf } from 'contingent'
import { capitalize as _capitalize, getIntPart } from './helpers'

const { s } = classes('s')
const specials = toChars(expandClass(pullFromClass(s, 0x20)))

export class MemorableGenerator extends GeneratorPlugin {
  protected _viewResult: ByLengthResult

  constructor(view: WordsByLengthView) {
    super()
    const result = view.get()

    // Check that the words lists don't have any holes.
    const words = result.words
    for (let i = 2; i <= 16; i++) {
      const list = words[i]
      if (!Array.isArray(list) || list.length === 0) {
        throw new Error(`no words found of length ${i}`)
      }
    }

    this._viewResult = result
  }

  get name(): string {
    return 'memorable'
  }

  get title(): string {
    return 'Memorable'
  }

  get units(): GenUnits {
    return 'char'
  }

  configure() {
    return this.generate.bind(this)
  }

  generate(len: number) {
    if (len < 8 || len > 32) {
      throw new Error('memorable passwords must have a length between 8 and 32 characters')
    }

    const wordLength = Math.floor((len - 1) / 2)
    const special = randomOf(specials)

    const lenBit = randomBit()
    const firstLen = lenBit ? wordLength + 1 : wordLength - 1
    const secondLen = lenBit ? wordLength - 1 : wordLength + 1

    const capitalize = randomBit()
    let first = this._augmented(capitalize, len % 2 === 0 ? firstLen + 1 : firstLen)
    let second = this._randomWord(!capitalize, secondLen)

    return randomBit() ? `${first}${special}${second}` : `${second}${special}${first}`
  }

  protected _randomWord(capitalize: boolean, len: number) {
    const wordList = this._viewResult.words[len]

    let word = randomOf(<string[]>wordList)
    if (capitalize) { word = _capitalize(word) }
    return word
  }

  protected _augmented(capitalize: boolean, len: number) {
    const numInts = randomIn(1, Math.floor(len * 0.25) + 2)
    const intPart = getIntPart(numInts)
    const word = this._randomWord(capitalize, len - intPart.length)
    return randomBit() ? `${word}${intPart}` : `${intPart}${word}`
  }
}
