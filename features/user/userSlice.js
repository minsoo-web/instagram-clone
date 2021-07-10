import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import { fetchUsersData } from "./usersSlice";

const initialState = {
  currentUser: null,
  userPosts: [],
  userFollowing: []
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
    },
    setUserFollowing: (state, action) => {
      state.userFollowing = action.payload;
    }
  }
});

export const { setUserState, setUserPost, setUserFollowing } = userSlice.actions;

export const selectCurrentUser = state => state.user.currentUser;
export const selectUserPosts = state => state.user.userPosts;
export const selectUserFollowing = state => state.user.userFollowing;

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
export const fetchUserPosts = () => {
  return async dispatch => {
    const response = await db
      .collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get();

    const dispatchData = response.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    dispatch(setUserPost(dispatchData));
  };
};

// 유저 포스트
export const fetchUsetFollowing = () => {
  return dispatch => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .onSnapshot(snapshot => {
        let following = snapshot.docs.map(doc => {
          const id = doc.id;
          return id;
        });
        dispatch(setUserFollowing(following));
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i]));
        }
      });
  };
};
