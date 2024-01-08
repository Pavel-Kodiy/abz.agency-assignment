// eslint-disable-next-line import/named
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery(({
   baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1',
   prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('userToken');
      if (accessToken) {
         headers.set('Token', `${accessToken}`);
      }
      return headers;
   },
}))

const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   const result = await baseQuery(args, api, extraOptions)
   return result
}

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
})
