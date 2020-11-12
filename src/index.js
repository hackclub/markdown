import unified from 'unified'
import markdown from 'remark-parse'
import remarkToRehype from 'remark-rehype'
import raw from 'rehype-raw'
import prism from '@mapbox/rehype-prism'
import html from 'rehype-stringify'
// https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
import githubSchema from 'hast-util-sanitize/lib/github'
import docs, { handlers } from './rehype'

// Allow className for all elements
githubSchema.attributes['*'].push('className')

// Create the processor—the order of the plugins is important
const getProcessor = unified()
  .use(markdown)
  .use(remarkToRehype, { handlers, allowDangerousHTML: true })
  // Add custom HTML found in the markdown file to the AST
  .use(raw)
  // Add syntax highlighting to the sanitized HTML
  .use(prism)
  .use(html)
  .freeze()

const markdownToHtml = async (
  md,
  filePath = '/README.md',
  imagePrefix = '/',
  removeTitle = false
) => {
  try {
    // Init the processor with our custom plugin
    const processor = getProcessor().use(docs, {
      filePath,
      imagePrefix,
      removeTitle
    })
    const file = await processor.process(md)

    // Replace non-breaking spaces (char code 160) with normal spaces to avoid style issues
    return file.contents.replace(/\xA0/g, ' ')
  } catch (error) {
    console.error(`Markdown to HTML error: ${error}`)
    throw error
  }
}

export default markdownToHtml
