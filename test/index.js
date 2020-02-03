// import test from 'ava'
// import md from '../dist'
const test = require('ava')
const md = require('../dist/index.js')

const text = `# Beep

**Boop!** from Hack Club.
`

test('returns html for markdown', t => {
  // const result = text
  const result = md(text)
  t.is(typeof result, 'string')
  t.true(result.startsWith('<h1>'))
  t.true(result.includes('<strong>'))
  t.true(result.includes('Hack Club'))
  t.snapshot(result)
})

// test('returns a gray object for desaturated base colors', t => {
//   const colors = palx('#444')
//   t.is(typeof colors, 'object')
//   t.snapshot(colors)
//   t.is(Object.keys(colors).length, 4)
// })
