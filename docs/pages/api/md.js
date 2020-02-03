import md from '@hackclub/markdown'

export default async (req, res) => {
  const { text } = req.query
  const html = await md(text, 'README.md', '/', false)
  console.log(text, html)
  res.status(200).end(html)
}
