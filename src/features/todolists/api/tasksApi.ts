import { instance } from '@/common/instance'
import { DomainTask, GetTasksResponse } from '@/features/todolists/api/tasksApi.types.ts'
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
  deleteTask<BaseResponse>(todolistId: string, taskId: string) {
    return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskTitle(todolistId: string, taskId: string) {
    return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
