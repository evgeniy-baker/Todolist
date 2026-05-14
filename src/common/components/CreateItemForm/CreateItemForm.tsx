import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import { RequestStatus } from '@/common/types'

type Props = {
  onCreateItem: (title: string) => void
  entityStatus?: RequestStatus
}

export const CreateItemForm = ({ onCreateItem, entityStatus }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label={'Enter a title'}
        variant={'outlined'}
        value={title}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        disabled={entityStatus === 'loading'}
      />
      <IconButton
        onClick={createItemHandler}
        color={'primary'}
        disabled={entityStatus === 'loading'}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
