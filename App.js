import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  Screen = isLoggedIn ? HomeScreen : LoginScreen
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
