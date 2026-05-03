import { nanoid } from '@reduxjs/toolkit'
import { createTodolistTC, deleteTodolistTC } from './todolists-slice.ts'
import { createAppSlice } from '@/app/createAppSlice.ts'
import { tasksApi } from '@/features/todolists/api/tasksApi.ts'
import { DomainTask, TaskPriority, TaskStatus } from '@/features/todolists/api/tasksApi.types.ts'

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      // action creators

      changeTaskStatusAC: create.reducer<{
        todolistId: string
        taskId: string
        status: TaskStatus
      }>((state, action) => {
        const task = state[action.payload.todolistId].find(
          (task) => task.id === action.payload.taskId,
        )
        if (task) {
          task.status = action.payload.status
        }
      }),

      changeTaskTitleAC: create.reducer<{
        todolistId: string
        taskId: string
        title: string
      }>((state, action) => {
        const task = state[action.payload.todolistId].find(
          (task) => task.id === action.payload.taskId,
        )
        if (task) {
          task.title = action.payload.title
        }
      }),

      // thunk creators
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, { rejectWithValue }) => {
          try {
            const res = await tasksApi.getTasks(todolistId)
            return { todolistId, tasks: res.data.items }
          } catch (error) {
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),

      createTaskTC: create.asyncThunk(
        async (arg: { todolistId: string; title: string }, { rejectWithValue }) => {
          try {
            const res = await tasksApi.createTask(arg.todolistId, arg.title)
            return { task: res.data.data.item }
          } catch (error) {
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
          },
        },
      ),

      deleteTaskTC: create.asyncThunk(
        async (arg: { todolistId: string; taskId: string }, { rejectWithValue }) => {
          try {
            await tasksApi.deleteTask(arg)
            return arg
          } catch (error) {
            return rejectWithValue(error)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          },
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskStatusAC, changeTaskTitleAC, fetchTasksTC, createTaskTC, deleteTaskTC } =
  tasksSlice.actions
