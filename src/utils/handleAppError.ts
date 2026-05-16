import { changeStatusAC, setErrorAC } from '@/app/app-slice.ts'
import { Dispatch } from '@reduxjs/toolkit'
import { BaseResponse } from '@/common/types'

export const handleAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  dispatch(changeStatusAC({ status: 'failed' }))
  const errorMessage = data.messages.length ? data.messages[0] : 'Произошла ошибка'
  dispatch(setErrorAC({ error: errorMessage }))
}
