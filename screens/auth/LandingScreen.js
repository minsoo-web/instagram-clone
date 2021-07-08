import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
      <Button onPress={() => navigation.navigate("Register")} title="Register" />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
