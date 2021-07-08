import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setUserState } = userSlice.actions;

export const selectCurrentUser = state => state.user.currentUser;

export default userSlice.reducer;
