import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { Todolist } from '@/features/todolists/api/todolistsApi.types.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import { createAppSlice } from '@/app/createAppSlice.ts'
import { changeStatusAC } from '@/app/app-slice.ts'

export type DomainTodolist = Todolist & { filter: FilterValues }
export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],

  reducers: (create) => {
    return {
      // action creators
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>(
        (state, action) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.id)
          if (todolist) {
            todolist.filter = action.payload.filter
          }
        },
      ),

      // thunk creators
      fetchTodolistsTC: create.asyncThunk(
        async (_arg, { rejectWithValue, dispatch }) => {
          dispatch(changeStatusAC({ status: 'loading' }))

          try {
            const res = await todolistsApi.getTodolists()
            return { todolists: res.data }
          } catch (error) {
            return rejectWithValue(error)
          } finally {
            dispatch(changeStatusAC({ status: 'succeeded' }))
          }
        },
        {
          fulfilled: (state, action) => {
            return action.payload.todolists.map((todolist) => {
              return { ...todolist, filter: 'all' }
            })
          },
        },
      ),

      deleteTodolistTC: create.asyncThunk(
        async (id: string, { rejectWithValue, dispatch }) => {
          dispatch(changeStatusAC({ status: 'loading' }))

          try {
            await todolistsApi.deleteTodolist(id)
            return { id }
          } catch (error) {
            return rejectWithValue(error)
          } finally {
            dispatch(changeStatusAC({ status: 'succeeded' }))
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),

      createTodolistTC: create.asyncThunk(
        async (title: string, { rejectWithValue, dispatch }) => {
          dispatch(changeStatusAC({ status: 'loading' }))

          try {
            const res = await todolistsApi.createTodolist(title)
            return res.data.data.item
          } catch (error) {
            return rejectWithValue(error)
          } finally {
            dispatch(changeStatusAC({ status: 'succeeded' }))
          }
        },
        {
          fulfilled: (state, action) => {
            const newTask = {
              id: nanoid(),
              title: action.payload.title,
              filter: 'all',
            } as DomainTodolist
            state.unshift(newTask)
          },
        },
      ),

      changeTodolistTitleTC: create.asyncThunk(
        async (arg: { id: string; title: string }, { rejectWithValue, dispatch }) => {
          dispatch(changeStatusAC({ status: 'loading' }))

          try {
            await todolistsApi.changeTodolistTitle(arg)
            return arg
          } catch (error) {
            return rejectWithValue(error)
          } finally {
            dispatch(changeStatusAC({ status: 'succeeded' }))
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state[index].title = action.payload.title
            }
          },
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  changeTodolistFilterAC,
  fetchTodolistsTC,
  deleteTodolistTC,
  createTodolistTC,
  changeTodolistTitleTC,
} = todolistsSlice.actions
