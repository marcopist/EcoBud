import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./screens/Login";
import MainApp from "./screens/MainNavigator";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  Screen = isLoggedIn ? MainApp : LoginScreen
  return (
    <View style={styles.container}>
      <Screen setLoggedIn={setLoggedIn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
