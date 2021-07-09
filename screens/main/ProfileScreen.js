import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectUserPosts,
  selectCurrentUser,
  selectUserFollowing
} from "../../features/user/userSlice";
import { auth, db } from "../../firebase";

function ProfileScreen({
  navigation,
  route: {
    params: { uid }
  }
}) {
  const [userPosts, setUsersPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  const posts = useSelector(selectUserPosts);
  const currentUser = useSelector(selectCurrentUser);
  const userFollowing = useSelector(selectUserFollowing);

  useEffect(() => {
    if (uid !== auth.currentUser.uid) {
      db.collection("users")
        .doc(uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) setUser(snapshot.data());
          else console.log("not exists!");
        });
      db.collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "desc")
        .get()
        .then(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUsersPosts(posts);
        });
    } else {
      setUser(currentUser);
      setUsersPosts(posts);
    }

    // 팔로우 하고 있는 상태
    if (userFollowing.indexOf(uid) > -1) setFollowing(true);
    else setFollowing(false);
  }, [uid, userFollowing]);

  const onUnfollow = () => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .doc(uid)
      .delete();
  };

  const onFollow = () => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .doc(uid)
      .set({});
  };

  return (
    user && (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text>{user.email}</Text>
          <Text>{user.name}</Text>
          {uid !== auth.currentUser.uid ? (
            <View>
              {following ? (
                <Button title="Following" onPress={onUnfollow} />
              ) : (
                <Button title="Follow" onPress={onFollow} />
              )}
            </View>
          ) : null}
        </View>
        <View style={styles.galleryContainer}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={userPosts}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.downloadURL }} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    )
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    margin: 20
  },
  galleryContainer: {
    flex: 1
  },
  imageContainer: {
    flex: 1 / 3
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  }
});
