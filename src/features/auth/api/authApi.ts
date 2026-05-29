import { instance } from '@/common/instance'
import { LoginInputs } from '@/features/auth/lib/schemas'
import { BaseResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
        query: (body) => ({ method: 'post', url: '/auth/login', body }),
      }),
      logout: build.mutation<BaseResponse, void>({
        query: () => ({ method: 'delete', url: '/auth/login' }),
      }),
      me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
        query: () => '/auth/me',
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi

export const _authApi = {
  login(args: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`/auth/login`, args)
  },
  logout() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>(`/auth/me`)
  },
}
