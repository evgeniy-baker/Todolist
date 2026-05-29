import {
  changeThemeModeAC,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedInAC,
} from '@/app/app-slice.ts'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { getTheme } from '@/common/theme'
import { NavButton } from '@/common/components/NavButton/NavButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import LinearProgress from '@mui/material/LinearProgress'

import { Path } from '@/common/routing'
import { NavLink, useNavigate } from 'react-router'
import { useLogoutMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums'

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectAppStatus)

  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then((data) => {
        if (data.resultCode === ResultCode.Success) {
          localStorage.removeItem('token')
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        }
      })
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavLink to={Path.Main} style={{ margin: '10px', color: 'white' }}>
              Todolists
            </NavLink>
            <NavLink to={Path.Faq} style={{ margin: '10px', color: 'white' }}>
              FAQ
            </NavLink>
            {isLoggedIn && (
              <span>
                <p style={{ display: 'inline', margin: '10px' }}>{localStorage.getItem('login')}</p>
                <NavButton onClick={logoutHandler}>Logout</NavButton>
              </span>
            )}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
