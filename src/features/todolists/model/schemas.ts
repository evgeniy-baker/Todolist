import { z } from 'zod'
import { TaskPriority, TaskStatus } from '@/common/enums'

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number().int(),
  addedDate: z.iso.datetime({ local: true }),
})
