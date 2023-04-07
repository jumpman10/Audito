// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config



export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userName: null,
    sessionId:null,
    role:null
  },
  reducers: {
    handleLogin: (state, action) => {
      state.sessionId = action.payload.sessionId
      state.userName = action.payload.userName
      state.role = action.payload.role
    },

  }
})

export const { handleLogin } = authSlice.actions

export default authSlice.reducer 