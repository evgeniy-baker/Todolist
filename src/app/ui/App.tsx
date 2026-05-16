import './App.css'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { ErrorSnackbar, Header } from '@/common/components'
import { useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Routing } from '@/app/ui/Routing/Routing.tsx'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={'app'}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
