import { createSlice } from "@reduxjs/toolkit";
import { db, auth } from "../../firebase";

const initialState = {
  users: [],
  userLoaded: 0
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users.push(action.payload);
    },
    setUsersLoaded: state => {
      state.userLoaded += 1;
    },
    setUsersPosts: (state, action) => {
      action.payload.forEach(post => {
        let userIndex = state.users.findIndex(user => user.uid === post.user.uid);
        if (userIndex !== -1) state.users[userIndex].posts.push(post);
      });
    }
  }
});

export const { setUsers, setUsersLoaded, setUsersPosts } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsers = state => state.users.users;
export const selctUserLoaded = state => state.users.userLoaded;

export const fetchUsersData = uid => {
  return (dispatch, getState) => {
    const found = getState().users.users.some(el => {
      return el.uid === uid;
    });

    // not exists
    if (!found) {
      db.collection("users")
        .doc(uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.posts = [];
            dispatch(setUsers(user));
            dispatch(fetchUsersFollowingPosts(user.uid));
          } else console.log("does not exists!");
        });
    }
  };
};

// 유저 포스트
export const fetchUsersFollowingPosts = uid => {
  return (dispatch, getState) => {
    db.collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then(snapshot => {
        dispatch(setUsersLoaded());
        if (snapshot.size) {
          const uid = snapshot.docs[0].ref.path.split("/")[1];
          //   const uid = snapshot.query.EP.path.segments[1];
          const user = getState().users.users.find(el => el.uid === uid);

          let dispatchData = snapshot.docs.map(doc => {
            const data = doc.data();
            const postId = doc.id;
            return { postId, ...data, user };
          });

          dispatch(setUsersPosts(dispatchData));
        }
      });
  };
};
