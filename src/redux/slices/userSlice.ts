/* eslint-disable @typescript-eslint/no-redeclare */
import { createSlice } from '@reduxjs/toolkit';

interface userSlice {
   pageCounter: number
   userPersonalData: {
      name: string
      email: string
      phone: string
      position: number
      photo: string
   }
}

const initialState: userSlice = {
   pageCounter: 6,
   userPersonalData: {
      name: '',
      email: '',
      phone: '',
      position: 0,
      photo: '',
   }
}

export const userSlice = createSlice({
   name: 'userSlice',
   initialState,
   reducers: {
      setPageCounter(state, action) {
         state.pageCounter = state.pageCounter + action.payload;
      },
      setUserName(state, action) {
         state.userPersonalData.name = action.payload;
      },
      setUserEmail(state, action) {
         state.userPersonalData.email = action.payload;
      },
      setUserPhone(state, action) {
         state.userPersonalData.phone = action.payload;
      },
      setUserPosition(state, action) {
         state.userPersonalData.position = action.payload;
      },
      setUserPhoto(state, action) {
         state.userPersonalData.photo = action.payload;
      },
   }
})

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;