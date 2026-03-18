import { test, expect, describe } from 'bun:test'
import md from '../dist'

describe('basic markdown', () => {
  test('renders headings', async () => {
    const result = await md('# Hello\n\n## World')
    expect(result).toContain('<h1>')
    expect(result).toContain('<h2 id="world"')
  })

  test('renders bold and italic', async () => {
    const result = await md('**bold** and *italic*')
    expect(result).toContain('<strong>bold</strong>')
    expect(result).toContain('<em>italic</em>')
  })

  test('renders links', async () => {
    const result = await md('[Hack Club](https://hackclub.com/)')
    expect(result).toContain('<a')
    expect(result).toContain('href="https://hackclub.com/"')
    expect(result).toContain('Hack Club')
  })

  test('renders unordered lists', async () => {
    const result = await md('- one\n- two\n- three')
    expect(result).toContain('<ul>')
    expect(result).toContain('<li>')
  })

  test('renders ordered lists', async () => {
    const result = await md('1. one\n2. two\n3. three')
    expect(result).toContain('<ol>')
    expect(result).toContain('<li>')
  })

  test('renders blockquotes', async () => {
    const result = await md('> a quote')
    expect(result).toContain('<blockquote>')
  })

  test('renders images', async () => {
    const result = await md('![alt text](https://example.com/img.png)')
    expect(result).toContain('<img')
    expect(result).toContain('alt="alt text"')
  })

  test('renders horizontal rules', async () => {
    const result = await md('---')
    expect(result).toContain('<hr>')
  })
})

describe('code blocks', () => {
  test('renders inline code', async () => {
    const result = await md('use `console.log()`')
    expect(result).toContain('<code class="inline">')
    expect(result).toContain('console.log()')
  })

  test('renders fenced code blocks with syntax highlighting', async () => {
    const result = await md('```js\nconst x = 1\n```')
    expect(result).toContain('<code class="language-js">')
    expect(result).toContain('token keyword')
  })

  test('converts sh language to shell (sh-to-shell plugin)', async () => {
    const result = await md('```sh\necho hello\n```')
    expect(result).toContain('language-shell')
  })
})

describe('github flavored markdown', () => {
  test('renders strikethrough', async () => {
    const result = await md('~~deleted text~~')
    expect(result).toContain('<del>deleted text</del>')
  })

  test('renders tables', async () => {
    const input = '| Name | Value |\n|------|-------|\n| a    | 1     |\n| b    | 2     |'
    const result = await md(input)
    expect(result).toContain('<table>')
    expect(result).toContain('<thead>')
    expect(result).toContain('<tbody>')
    expect(result).toContain('<th>Name</th>')
    expect(result).toContain('<td>a</td>')
  })

  test('renders task lists', async () => {
    const result = await md('- [x] done\n- [ ] todo')
    expect(result).toContain('<input')
    expect(result).toContain('type="checkbox"')
    expect(result).toContain('checked')
    expect(result).toContain('done')
    expect(result).toContain('todo')
  })

  test('autolinks bare URLs', async () => {
    const result = await md('Visit https://hackclub.com for more')
    expect(result).toContain('<a')
    expect(result).toContain('href="https://hackclub.com"')
  })
})

describe('video link to details', () => {
  test('converts standalone .mov URL to video details', async () => {
    const result = await md(
      'https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov'
    )
    expect(result).toContain('<details')
    expect(result).toContain('<video')
    expect(result).toContain('class="details-video"')
  })

  test('converts standalone .mp4 URL to video details', async () => {
    const result = await md('https://example.com/clip.mp4')
    expect(result).toContain('<details')
    expect(result).toContain('<video')
  })

  test('does not convert video URL when inline with other text', async () => {
    const result = await md(
      'This should not be rendered: https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov'
    )
    expect(result).not.toContain('<video')
    expect(result).not.toContain('<details')
  })

  test('handles mixed video and non-video content', async () => {
    const input = `Not a video: https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov

But this should!

https://user-images.githubusercontent.com/27078897/141502788-e4687f86-2d43-458b-a524-c420fba09ffd.mov`

    const result = await md(input)
    expect(result).toContain('<details')
    expect(result).toContain('<video')
    expect(result).toContain('But this should!')
  })
})

describe('rehype docs plugin', () => {
  test('adds id and link to h2-h6 headings', async () => {
    const result = await md('## Getting Started')
    expect(result).toContain('id="getting-started"')
    expect(result).toContain('class="heading"')
    expect(result).toContain('href="#getting-started"')
  })

  test('does not add heading link to h1', async () => {
    const result = await md('# Title')
    expect(result).not.toContain('class="heading"')
  })

  test('marks external links', async () => {
    const result = await md('[ext](https://example.com)')
    expect(result).toContain('class="external"')
  })

  test('marks internal links starting with /', async () => {
    const result = await md('[page](/docs/intro)')
    expect(result).toContain('class="internal"')
  })

  test('marks hash links as internal', async () => {
    const result = await md('[section](#overview)')
    expect(result).toContain('class="internal"')
  })

  test('strips file extensions from internal links', async () => {
    const result = await md('[guide](/docs/guide.md)')
    expect(result).toContain('href="/docs/guide"')
    expect(result).not.toContain('.md')
  })

  test('prefixes relative image paths with imagePrefix', async () => {
    const result = await md('![](img/photo.png)', '/workshop/README.md', '/raw')
    expect(result).toContain('src="/raw/workshop/img/photo.png"')
  })

  test('does not prefix absolute image URLs', async () => {
    const result = await md('![](https://example.com/photo.png)')
    expect(result).toContain('src="https://example.com/photo.png"')
  })

  test('removes h1 title when removeTitle is true', async () => {
    const result = await md('# Title\n\nContent', '/README.md', '/', true)
    expect(result).not.toContain('<h1>')
    expect(result).toContain('Content')
  })

  test('keeps h1 title when removeTitle is false', async () => {
    const result = await md('# Title\n\nContent')
    expect(result).toContain('<h1>')
  })
})

describe('raw html passthrough', () => {
  test('allows inline HTML in markdown', async () => {
    const result = await md('Hello <strong>world</strong>')
    expect(result).toContain('<strong>world</strong>')
  })

  test('allows HTML details/summary', async () => {
    const result = await md('<details><summary>Click</summary>\n\nHidden content\n\n</details>')
    expect(result).toContain('<details>')
    expect(result).toContain('<summary>')
  })
})
