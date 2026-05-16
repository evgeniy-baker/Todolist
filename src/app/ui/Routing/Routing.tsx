import { Route, Routes } from 'react-router'
import { Main } from '@/app/ui/Main/Main.tsx'
import { Login } from '@/features/auth/ui/Login/Login.tsx'
import { PageNotFound } from '@/common/components'

const Path = {
  Main: '/',
  Login: '/login',
  NotFound: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
