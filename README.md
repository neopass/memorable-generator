# memorable-generator

A memorable-style password generator plugin for [Neopass](https://www.npmjs.com/package/neopass).

```
npm install @neopass/memorable-generator @neopass/words-by-length-view
```

Basic usage:

```javascript
const { WordsByLengthView } = require('@neopass/words-by-length-view')
const { MemorableGenerator } = require('@neopass/memorable-generator')
const words = require('./some/large/list/of/words.txt')

const view = new WordsByLengthView(words)
const memorable = new MemorableGenerator(view)
const pass = memorable.generate(16)

console.log(pass) // Tinging91%madcap
```

With [Neopass](https://www.npmjs.com/package/neopass):

```javascript
const { neopass } = require('neopass')
const { wordListSync } = require('@neopass/wordlist')
const { WordsByLengthView } = require('@neopass/words-by-length-view')
const { MemorableGenerator } = require('@neopass/memorable-generator')

/**
 * We're using @neopass/wordlist to feed the view, but any
 * word list of sufficient size will do.
 */
const view = new WordsByLengthView(wordListSync())

const neo = neopass({
  plugins: [new MemorableGenerator(view)]
})

const pass = neo.generate(16, 'memorable')
console.log(pass) // smugly$Luminous7
```
