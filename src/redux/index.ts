import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '../api/baseApi'
import { userSliceReducer } from './slices/userSlice'

const store = configureStore({
   reducer: combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      userSlice: userSliceReducer,
   }),
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
