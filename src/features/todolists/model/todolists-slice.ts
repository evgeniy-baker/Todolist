import { createAction, createReducer, createSlice, nanoid } from '@reduxjs/toolkit'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as Todolist[],
  reducers: (create) => {
    return {
      deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      }),
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>(
        (state, action) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.id)
          if (todolist) {
            todolist.filter = action.payload.filter
          }
        },
      ),
      createTodolistAC: create.preparedReducer(
        (title: string) => {
          return { payload: { id: nanoid(), title, filter: 'all' } as Todolist }
        },
        (state, action) => {
          state.push(action.payload)
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } =
  todolistsSlice.actions

// export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
// export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>(
//   'todolists/changeTodolistTitle',
// )
// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValues }>(
//   'todolists/changeTodolistFilter',
// )

// const initialState: Todolist[] = []

// export const _todolistsReducer = createReducer(initialState, (builder) => {
//   builder
// .addCase(deleteTodolistAC, (state, action) => {
//   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//   if (index !== -1) {
//     state.splice(index, 1)
//   }
// })
// .addCase(createTodolistAC, (state, action) => {
//   state.push({ ...action.payload, filter: 'all' })
// })
// .addCase(changeTodolistTitleAC, (state, action) => {
//   const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//   if (index !== -1) {
//     state[index].title = action.payload.title
//   }
// })
// .addCase(changeTodolistFilterAC, (state, action) => {
//   const todolist = state.find((todolist) => todolist.id === action.payload.id)
//   if (todolist) {
//     todolist.filter = action.payload.filter
//   }
// })
// })
