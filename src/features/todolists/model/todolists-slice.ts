import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'

export type DomainTodolist = Todolist & { filter: FilterValues }

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],

  reducers: (create) => {
    return {
      // fetchTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
      //   return action.payload.todolists.map((todolist) => {
      //     return { ...todolist, filter: 'all' }
      //   })
      // }),
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
          return { payload: { id: nanoid(), title, filter: 'all' } as DomainTodolist }
        },
        (state, action) => {
          state.push(action.payload)
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((todolist) => {
          return { ...todolist, filter: 'all' }
        })
      })

      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
  },
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (arg: { id: string; title: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.changeTodolistTitle(arg)
      return arg
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer
export const {
  deleteTodolistAC,
  // changeTodolistTitleAC,
  changeTodolistFilterAC,
  createTodolistAC,
  // fetchTodolistsAC,
} = todolistsSlice.actions
