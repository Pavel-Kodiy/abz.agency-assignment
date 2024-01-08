import { baseApi } from './baseApi';

export const userApi = baseApi.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: ({ page, offset, count }) => ({
            url: '/users',
            params: { page, offset, count }
         }),
         providesTags: ["User"],
      }),
      getPositions: builder.query({
         query: () => ({
            url: '/positions',
         })
      }),
      addNewUser: builder.mutation({
         query: (payload) => ({
            url: '/users',
            method: 'POST',
            body: payload
         }),
         invalidatesTags: ["User"]
      }),
      getToken: builder.query({
         query: () => ({
            url: '/token',
         })
      }),
   }),
});

export const {
   useGetUsersQuery,
   useGetPositionsQuery,
   useAddNewUserMutation,
   useGetTokenQuery
} = userApi;