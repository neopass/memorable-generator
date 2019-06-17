# memorable-generator

A memorable-style password generator

```
npm install @neopass/memorable-generator @neopass/words-by-length-view
```

Basic usage:

```javascript
const { WordsByLengthView } = require('@neopass/words-by-length-view')
const { MemorableGenerator } = require('@neopass/memorable-generator')
const words = require('./some/largish/list/of/words.txt')

const view = new WordsByLengthView(words)
const memorable = new MemorableGenerator(view)
const pass = memorable.generate(16)

console.log(pass) // Tinging91%madcap
```
