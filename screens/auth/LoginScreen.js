import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { auth } from "../../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
  };

  return (
    <View>
      <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
