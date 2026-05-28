import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      // <- для me запроса
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    },
  }),
  tagTypes: ['Todolist'],
  endpoints(build) {
    return {
      //
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => '/todo-lists',
        transformResponse: (todolists: Todolist[]) => {
          return todolists.map((todolist) => ({
            ...todolist,
            filter: 'all',
            entityStatus: 'idle',
          }))
        },
        providesTags: ['Todolist'],
      }),
      createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            method: 'post',
            url: '/todo-lists',
            body: { title },
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            method: 'put',
            url: `/todo-lists/${id}`,
            body: { title },
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      deleteTodolist: build.mutation<BaseResponse, string>({
        query: (id) => {
          return {
            method: 'delete',
            url: `/todo-lists/${id}`,
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      //
    }
  },
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} = todolistsApi

// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>('/todo-lists')
//   },
//   changeTodolistTitle(payload: { id: string; title: string }) {
//     const { id, title } = payload
//     return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<BaseResponse>(`/todo-lists/${id}`)
//   },
// }
