import { instance } from '@/common/instance'
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.types.ts'
import { BaseResponse } from '@/common/types'

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },

  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },

  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    )
  },
}
