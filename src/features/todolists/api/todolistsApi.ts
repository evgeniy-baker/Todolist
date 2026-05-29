import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'
import { baseApi } from '@/app/baseApi.ts'

export const todolistsApi = baseApi.injectEndpoints({
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
