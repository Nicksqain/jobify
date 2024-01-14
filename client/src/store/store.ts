// store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { orderSlice, userSlice, notificationSlice } from "../slices";
// import { localStorageMiddleware } from "../slices/cartSlice";

const rootReducer = combineReducers({
  orderSlice,
  userSlice,
  notificationSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
