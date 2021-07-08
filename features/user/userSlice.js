import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";

const initialState = {
  currentUser: null,
  userPosts: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserPost: (state, action) => {
      state.userPosts = action.payload;
    }
  }
});

export const { setUserState, setUserPost } = userSlice.actions;

export const selectCurrentUser = state => state.user.currentUser;
export const selectUserPosts = state => state.user.userPosts;

export default userSlice.reducer;

// 유저 상태
export const fetchUserState = () => {
  return async dispatch => {
    const response = await db.collection("users").doc(auth.currentUser.uid).get();

    if (response.exists) {
      dispatch(setUserState(response.data()));
    } else console.log("no exist");
  };
};

// 유저 포스트
export const fetchUsetPosts = () => {
  return async dispatch => {
    const response = await db
      .collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get();

    const dispatchData = response.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    dispatch(setUserPost(dispatchData));
  };
};
