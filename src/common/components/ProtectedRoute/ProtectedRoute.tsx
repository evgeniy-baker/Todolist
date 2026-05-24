import React, { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router'

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath }: Props) => {
  if (isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children || <Outlet />
}
