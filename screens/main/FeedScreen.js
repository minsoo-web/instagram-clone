import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, FlatList, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { selectUsers, selctUserLoaded } from "../../features/user/usersSlice";
import { selectUserFollowing } from "../../features/user/userSlice";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const users = useSelector(selectUsers);
  const userLoaded = useSelector(selctUserLoaded);
  const userFollowing = useSelector(selectUserFollowing);

  useEffect(() => {
    let unsortedPosts = [];

    if (userLoaded === userFollowing.length) {
      // setPosts([1, 2]);
      users.forEach(user => {
        unsortedPosts = [...unsortedPosts, ...user.posts];
      });

      unsortedPosts.sort((x, y) => {
        return x.creation.seconds - y.creation.seconds;
      });

      setPosts(unsortedPosts);
      console.log(posts);
    }
  }, [userLoaded]);

  const signOut = async () => {
    // alert("hellop");
    await auth.signOut();
    navigation.navigate("Landing");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Feed</Text>
        <Button onPress={signOut} title="sign out" />
      </View>
      <View>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View key={item.postId}>
              <Text>{item.caption}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  }
});
