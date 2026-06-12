import { baseApi } from '@/app/baseApi'
import type { BaseResponse } from '@/common/types'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import { PAGE_COUNT } from '@/common/constants'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //

    getTasks: build.query<GetTasksResponse, { id: string; params: { page: number } }>({
      query: ({ id, params }) => {
        return { url: `todo-lists/${id}/tasks`, params: { ...params, count: PAGE_COUNT } }
      },
      // providesTags: ["Task"],
      providesTags: (_res, _error, { id }) => [{ type: 'Task', id }],
    }),

    //

    addTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      // invalidatesTags: ['Task'],
      invalidatesTags: (_result, _error, { todolistId }) => {
        return [{ type: 'Task', id: todolistId }]
      },
    }),

    //

    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Task'],
      invalidatesTags: (_result, _error, { todolistId }) => {
        return [{ type: 'Task', id: todolistId }]
      },
      onQueryStarted: async ({ todolistId, taskId }, { dispatch, queryFulfilled }) => {
        // <- Optimistic update
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            'getTasks',
            { id: todolistId, params: { page: 1 } },
            (state) => {
              const index = state.items.findIndex((task) => task.id === taskId)
              if (index !== -1) state.items.splice(index, 1)
            },
          ),
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),

    //

    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      // invalidatesTags: ['Task'],
      invalidatesTags: (_result, _error, { todolistId }) => {
        return [{ type: 'Task', id: todolistId }]
      },

      onQueryStarted: async ({ todolistId, taskId, model }, { dispatch, queryFulfilled }) => {
        // <- Optimistic update
        const patchResult = dispatch(
          tasksApi.util.updateQueryData(
            'getTasks',
            { id: todolistId, params: { page: 1 } },
            (state) => {
              const index = state.items.findIndex((task) => task.id === taskId)
              if (index !== -1) {
                state.items[index] = { ...state.items[index], ...model }
              }
            },
          ),
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} = tasksApi
