# `@hackclub/markdown`

Render Markdown to HTML, Hack Club-style. Used primarily on the [Hack Club Workshops](https://hackclub.com/workshops/) site.

Based on the [Next.js documentation site](https://github.com/zeit/next-site/pull/473/files#diff-879732a0915babd1688248ad1144c2d4).

```sh
yarn add @hackclub/markdown
# or npm i @hackclub/markdown
```

## Usage

This package does not include any frontend code, such as React or CSS.

This package is designed for rendering at build or otherwise on a server, not client-side.

```js
import fs from 'fs'
import md from '@hackclub/markdown'

const getReadme = async () => (
  const text = fs.readFileSync('./README.md', 'utf8')
  return await md(text, '/README.md', '/static')
)
```

| Param       | Default | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| input       | Req’d!  | String. The Markdown text to transform.                         |
| filePath    | Req’d!  | String. The Markdown’s path (for fixing relative image links).  |
| imagePrefix | `'/'`   | String. A prefix for the path to relative images.               |
| removeTitle | `false` | Bool. Remove starting `h1` (if titles are rendered separately). |

We recommend using [gray-matter](https://npm.im/gray-matter) alongside `@hackclub/markdown` for parsing frontmatter, but it’s not included in this package.
