import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://virtserver.swaggerhub.com/dlgarciabr/volunteerhub-api/1.0.0/s' }),
  endpoints: () => ({}),
})