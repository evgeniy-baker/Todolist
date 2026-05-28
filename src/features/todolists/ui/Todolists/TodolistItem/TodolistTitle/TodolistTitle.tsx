import { EditableSpan } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  type DomainTodolist,
} from '@/features/todolists/model/todolists-slice'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import styles from './TodolistTitle.module.css'
import {
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from '@/features/todolists/api/todolistsApi.ts'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const [deleteTodolist] = useDeleteTodolistMutation()

  const { id, title, entityStatus } = todolist

  // const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
    // dispatch(deleteTodolistTC(id))
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title })
    // dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
