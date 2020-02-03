const test = require('ava')
const md = require('../dist')

const text = `# Beep

**Boop!** from [Hack Club](https://hackclub.com/).
`

test('returns html for markdown', async t => {
  const result = await md(text)
  t.is(typeof result, 'string')
  t.true(result.startsWith('<h1>'))
  t.true(result.includes('<strong>'))
  t.true(result.includes('Hack Club'))
  t.snapshot(result)
})
