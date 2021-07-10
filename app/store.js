import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import usersReducer from "../features/user/usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});
