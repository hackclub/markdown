import md from '../../../dist/index.js'

export default async (req, res) => {
  const { text } = req.query
  // const text = 'hi **hack**'
  const html = await md(text, 'README.md', '/', false)
  console.log(text, html)
  res.status(200).end(html)
}
