import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = { isAuthenticated: false }


const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
      localStorage.setItem("isAuthenticated", "1")
    },
    logout(state) {
      state.isAuthenticated = false
      localStorage.setItem("isAuthenticated", "0")
    },
    checkIsAuthenticated(state) {
      const data = localStorage.getItem("isAuthenticated")
      if (data === "1") {
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
      }
    }
  }
})


export const authActions = authSlice.actions

export default authSlice.reducer