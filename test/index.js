const test = require('ava')
const md = require('../dist')

const text = `# Beep

**Boop!** from [Hack Club](https://hackclub.com/).
`

const text2 = `
\`\`\`sh
const hi = () => console.log('Hello!')
\`\`\`
`

const textWithVideo = `
This should not be rendered: https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov

But this should!

https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov
`

test('returns html for markdown', async (t) => {
  const result = await md(text)
  t.is(typeof result, 'string')
  t.true(result.startsWith('<h1>'))
  t.true(result.includes('<strong>'))
  t.true(result.includes('Hack Club'))
  t.snapshot(result)
})

test('returns html code sh markdown', async (t) => {
  const result = await md(text2)
  t.is(typeof result, 'string')
  t.true(result.includes('<code'))
  t.snapshot(result)
})

test('returns html code for video link', async (t) => {
  const result = await md(textWithVideo)
  t.is(typeof result, 'string')
  t.true(result.includes('<details'))
  t.true(result.includes('<video'))
  t.snapshot(result)
})
