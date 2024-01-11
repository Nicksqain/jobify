// user.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";

interface UserState {
  user?: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const slice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;
