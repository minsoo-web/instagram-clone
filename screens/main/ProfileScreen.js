import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, SafeAreaView, StyleSheet, Text, View, Image, FlatList } from "react-native";
import { selectUserPosts, selectCurrentUser } from "../../features/user/userSlice";

function ProfileScreen({ navigation, route }) {
  const posts = useSelector(selectUserPosts);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.name}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
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
