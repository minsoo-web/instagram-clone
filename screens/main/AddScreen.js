import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const AddScren = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync(null);
      setImage(uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={"1:1"} />
      </View>
      {/*  */}
      <Button
        style={{
          flex: 0.1,
          alignSelf: "flex-end",
          alignItems: "center"
        }}
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      {/*  */}
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <Button title="Save" onPress={() => navigation.navigate("Save", { image })} />
      {image && <Image style={{ flex: 1 }} source={{ uri: image }} />}
    </SafeAreaView>
  );
};

export default AddScren;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row"
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1 / 1
  }
});
