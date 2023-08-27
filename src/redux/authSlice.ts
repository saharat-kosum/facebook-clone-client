import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, UserType } from "../type";

const initialState : InitialState = {
  mode : "light",
  user : null,
  mockIMG : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1693129793~exp=1693130393~hmac=7346bd884e9145dfe06641270fd59554806208016d3acec6f42b5aebba8c28f7"
}

export const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogIn: (state, action:PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setLogOut: (state) => {
      state.user = null
    }
  }
})

export const {setMode, setLogIn, setLogOut} = authSlice.actions
export default authSlice.reducer