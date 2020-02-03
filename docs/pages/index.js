import React, { useState, useEffect } from 'react'
import Content from '../components/content'

export default () => {
  const [text, setText] = useState('Hello **Hack Club!**')
  const [html, setHtml] = useState('')
  useEffect(() => {
    fetch(`/api/md?text=${encodeURIComponent(text)}`)
      .then(res => res.text())
      .then(res => setHtml(res))
  }, [text])
  return (
    <main>
      <link rel="stylesheet" href="https://workshop-cards.now.sh/style.css" />
      <h1>Markdown</h1>
      <textarea onChange={e => setText(e.target.value)} value={text} />
      <Content html={html} />
    </main>
  )
}
