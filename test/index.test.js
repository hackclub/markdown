import { test, expect } from 'bun:test'
import md from '../dist'

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

test('returns html for markdown', async () => {
  const result = await md(text)
  expect(typeof result).toBe('string')
  expect(result.startsWith('<h1>')).toBe(true)
  expect(result).toContain('<strong>')
  expect(result).toContain('Hack Club')
})

test('returns html code sh markdown', async () => {
  const result = await md(text2)
  expect(typeof result).toBe('string')
  expect(result).toContain('<code')
})

test('returns html code for video link', async () => {
  const result = await md(textWithVideo)
  expect(typeof result).toBe('string')
  expect(result).toContain('<details')
  expect(result).toContain('<video')
})
