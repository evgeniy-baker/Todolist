import { z } from 'zod'
import { loginSchema } from '@/features/auth/model/schemas.ts'

export type LoginInputs = z.infer<typeof loginSchema>
