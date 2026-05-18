import { TaskPriority, TaskStatus } from '@/common/enums'
import { DomainTask } from '@/features/todolists/model/types.ts'

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
