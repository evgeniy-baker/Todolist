import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolists-slice.ts'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './app-slice.ts'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
