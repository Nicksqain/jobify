// store/store.ts
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { orderSlice, userSlice, notificationSlice } from "../slices";
import socketMiddleware from "../middlewares/socketMiddleware";

const appReducer = combineReducers({
  orderSlice,
  userSlice,
  notificationSlice,
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(socketMiddleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
