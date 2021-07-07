import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { auth } from "../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <View>
      <TextInput placeholder="name" value={name} onChangeText={text => setName(text)} />
      <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)} />
      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign Up" onPress={register} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
