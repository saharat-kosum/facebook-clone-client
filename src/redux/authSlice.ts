import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../type";

const initialState : InitialState = {
  mode : "light",
  user : null,
  token : null,
}

export const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogIn: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogOut: (state) => {
      state.user = null
      state.token = null
    }
  }
})

export const {setMode, setLogIn, setLogOut} = authSlice.actions
export default authSlice.reducer