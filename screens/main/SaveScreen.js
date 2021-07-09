import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import { auth, db, storage } from "../../firebase";
import firebase from "firebase";

const saveScreen = ({
  navigation,
  route: {
    params: { image }
  }
}) => {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;

    const response = await fetch(image);
    const blob = await response.blob();

    const task = storage.ref().child(childPath).put(blob);

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred} `);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = snapshot => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = downloadURL => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        // 홈으로
        navigation.navigate("Feed");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        value={caption}
        onChangeText={text => setCaption(text)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

export default saveScreen;

const styles = StyleSheet.create({});
