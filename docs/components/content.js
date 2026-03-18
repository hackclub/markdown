import { BaseStyles } from 'theme-ui'

const Content = ({ html }) => (
  <BaseStyles
    as="article"
    className="docs"
    sx={{
      fontSize: '1.25rem',
      a: { wordBreak: 'break-word' },
      '.heading a': { color: 'inherit', textDecoration: 'none' }
    }}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default Content
