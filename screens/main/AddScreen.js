import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

const AddScren = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync(null);
      setImage(uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
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
