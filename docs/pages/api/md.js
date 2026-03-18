import md from '@hackclub/markdown'

export default async function handler(req, res) {
  const { text } = req.query
  const html = await md(text, 'README.md', '/', false)
  res.status(200).end(html)
}
