// store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { orderSlice, userSlice, notificationSlice } from "../slices";
import socketMiddleware from "../middlewares/socketMiddleware";

const rootReducer = combineReducers({
  orderSlice,
  userSlice,
  notificationSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
