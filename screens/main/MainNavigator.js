import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setUserState } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedScreen from "./FeedScreen";
import AddScreen from "./AddScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(result => {
        if (result.exists) {
          dispatch(setUserState(result.data()));
        } else console.log("no exist");
      });
  }, []);

  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Add");
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={24} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
