import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'todolistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      // <- для me запроса
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    },
  }),
  tagTypes: ['Todolist'],
  endpoints: () => ({}),
})
