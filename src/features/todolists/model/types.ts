import { z } from 'zod'
import { DomainTaskSchema } from '@/features/todolists/model/schemas.ts'

export type DomainTask = z.infer<typeof DomainTaskSchema>
