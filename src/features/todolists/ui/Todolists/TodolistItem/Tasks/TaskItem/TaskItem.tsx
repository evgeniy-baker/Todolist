import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '@/common/hooks'
import { updateTaskTC, deleteTaskTC } from '@/features/todolists/model/tasks-slice.ts'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import type { ChangeEvent } from 'react'
import { getListItemSx } from './TaskItem.styles'
import { DomainTask } from '@/features/todolists/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enums/enums.ts'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'

type Props = {
  task: DomainTask
  todolistId: string
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolistId, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const newTask = { ...task, status }
    dispatch(updateTaskTC(newTask))
  }

  const changeTaskTitle = (title: string) => {
    const newTask = { ...task, title }
    dispatch(updateTaskTC(newTask))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
          disabled={todolist.entityStatus === 'loading'}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitle}
          disabled={todolist.entityStatus === 'loading'}
        />
      </div>
      <IconButton onClick={deleteTask} disabled={todolist.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}