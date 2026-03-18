import '@hackclub/theme/fonts/reg-ital-bold.css'
import theme from '@hackclub/theme'
import { ThemeUIProvider } from 'theme-ui'

export default function App({ Component, pageProps }) {
  return (
    <ThemeUIProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeUIProvider>
  )
}
