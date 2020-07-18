import React, { useState, useEffect } from 'react'
import {
  Container,
  NavLink,
  Heading,
  Text,
  Card,
  Grid,
  Label,
  Textarea
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ColorSwitcher from '../components/color-switcher'
import Content from '../components/content'

const sample = `# Hello!

This is [Hack Club **Markdown**](https://github.com/hackclub/markdown).

\`\`\`js
const hi = () => console.log('Hello!')
\`\`\`
`

export default () => {
  const [text, setText] = useState(sample)
  const [html, setHtml] = useState('')
  useEffect(() => {
    fetch(`/api/md?text=${encodeURIComponent(text)}`)
      .then((res) => res.text())
      .then((res) => setHtml(res))
  }, [text])
  return (
    <Container sx={{ py: [3, 4, 5] }}>
      <Meta
        as={Head}
        name="Markdown"
        description="Render Markdown to HTML, Hack Club-style. Get the package on npm at @hackclub/markdown."
      />
      <ColorSwitcher />
      <Heading as="h1" variant="title" sx={{ textAlign: 'center' }}>
        <Text
          as="span"
          sx={{
            color: 'muted',
            WebkitTextStroke: 'currentColor',
            WebkitTextStrokeWidth: '2px',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Hack Club
        </Text>{' '}
        <Text
          as="span"
          sx={{
            color: 'primary'
          }}
        >
          Markdown
        </Text>
      </Heading>
      <Grid
        gap={4}
        columns="auto auto"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 2,
          mt: 3,
          mb: 4,
          a: { color: 'muted', transition: 'color .125s ease-in-out' }
        }}
      >
        <NavLink href="https://github.com/hackclub/markdown">GitHub</NavLink>
        <NavLink href="https://npmjs.com/package/@hackclub/markdown">
          npm
        </NavLink>
      </Grid>
      <Grid gap={[3, 4]} columns={[null, 2]}>
        <div>
          <Label htmlFor="demo" sx={{ fontSize: 2 }}>
            Enter your Markdown
          </Label>
          <Textarea
            id="demo"
            onChange={(e) => setText(e.target.value)}
            value={text}
            rows={12}
            variant="forms.input"
            autoFocus
          />
        </div>
        <Card sx={{ py: [3, 3] }}>
          <Content html={html} />
        </Card>
      </Grid>
    </Container>
  )
}
