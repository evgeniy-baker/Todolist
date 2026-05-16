import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import type { Todolist } from '@/features/todolists/api/todolistsApi.types'
import { createAppSlice } from '@/app/createAppSlice.ts'
import { changeStatusAC } from '@/app/app-slice.ts'
import { RequestStatus } from '@/common/types'
import { ResultCode } from '@/common/enums'
import { handleNetworkError } from '@/utils/handleCatchErrors.ts'
import { handleAppError } from '@/utils/handleAppError.ts'

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: 'loading' }))
          const res = await todolistsApi.getTodolists()
          dispatch(changeStatusAC({ status: 'succeeded' }))
          return { todolists: res.data }
        } catch (error) {
          dispatch(changeStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          return action.payload?.todolists.map((tl) => {
            return { ...tl, filter: 'all', entityStatus: 'idle' }
          })
        },
      },
    ),

    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: 'loading' }))
          const res = await todolistsApi.createTodolist(title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: 'succeeded' }))
            return { todolist: res.data.data.item }
          } else {
            handleAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: 'loading' }))
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'loading' }))
          const res = await todolistsApi.deleteTodolist(id)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: 'succeeded' }))
            return { id }
          } else {
            handleAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleNetworkError(error, dispatch)
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'failed' }))
          return rejectWithValue(null)
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
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: 'loading' }))
          const res = await todolistsApi.changeTodolistTitle(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: 'succeeded' }))
            return payload
          } else {
            handleAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleNetworkError(error, dispatch)
          return rejectWithValue(null)
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
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>(
      (state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      },
    ),

    changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>(
      (state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      },
    ),
  }),
})

export const { selectTodolists } = todolistsSlice.selectors
export const {
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'
