import { Main } from '@/app/Main'
import { Faq, PageNotFound, ProtectedRoute } from '@/common/components'
import { Login } from '@/features/auth/ui/Login/Login'
import { Route, Routes } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice.ts'

export const Path = {
  Main: '/',
  Login: '/login',
  Faq: '/faq',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />}></Route>
      </Route>

      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />}></Route>
        <Route path={Path.Faq} element={<Faq />}></Route>
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
