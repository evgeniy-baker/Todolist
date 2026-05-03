import { SxProps } from '@mui/material'
import { TaskStatus } from '@/features/todolists/api/tasksApi.types.ts'

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 0,
  justifyContent: 'space-between',
  opacity: isDone ? 0.5 : 1,
})
