import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedScreen from "./FeedScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";

import { fetchUserState, fetchUsetPosts, fetchUsetFollowing } from "../../features/user/userSlice";
import { auth } from "../../firebase";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserState());
    dispatch(fetchUsetPosts());
    dispatch(fetchUsetFollowing());
  }, []);

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={24} />
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
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Profile", { uid: auth.currentUser.uid });
          }
        })}
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
