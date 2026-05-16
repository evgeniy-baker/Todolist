import { changeStatusAC, setErrorAC } from '@/app/app-slice.ts'
import { Dispatch } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

export const handleNetworkError = (error: unknown, dispatch: Dispatch) => {
  dispatch(changeStatusAC({ status: 'failed' }))

  if (isAxiosError(error)) {
    dispatch(setErrorAC({ error: error.response?.data?.message || error.message }))
  } else if (error instanceof Error) {
    dispatch(setErrorAC({ error: error.message }))
  } else {
    dispatch(setErrorAC({ error: 'Произошла ошибка' }))
  }
}
