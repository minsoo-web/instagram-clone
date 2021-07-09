import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase";

const SearchScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = search => {
    db.collection("users")
      .where("name", ">=", search)
      .get()
      .then(snapshot => {
        let findUser = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(findUser);
        console.log(findUser);
      });
  };

  return (
    <SafeAreaView>
      <TextInput placeholder="Type here ..." onChangeText={search => fetchUsers(search)} />
      <FlatList
        data={users}
        numColumns={1}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { uid: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
