// order.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrder } from "../models/IOrder";

interface OrderState {
  allOrders: IOrder[];
  allUserOrders: IOrder[];
}

const initialState: OrderState = {
  allOrders: [],
  allUserOrders: [],
};

export const slice = createSlice({
  name: "order",

  initialState,

  reducers: {
    setAllOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.allOrders = action.payload;
    },
    setAllUserOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.allUserOrders = action.payload;
    },
  },
});

export const { setAllOrders, setAllUserOrders } = slice.actions;

export default slice.reducer;
