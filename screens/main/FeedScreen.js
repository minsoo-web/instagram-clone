import React from "react";
import { StyleSheet, Button, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";

const FeedScreen = ({ navigation }) => {
  const signOut = async () => {
    // alert("hellop");
    await auth.signOut();
    navigation.navigate("Landing");
  };
  return (
    <SafeAreaView>
      <Text>Feed</Text>
      <Button onPress={signOut} title="sign out" />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
