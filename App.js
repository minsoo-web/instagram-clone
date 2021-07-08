import "react-native-gesture-handler";
import React from "react";

import RootNavigator from "./screens/RootNavigator";

import { store } from "./app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
