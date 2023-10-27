import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

function handleLogin(username, password) {
  console.log("Login button pressed");
}

export default function LoginScreen(props) {
  const setLoggedIn = props.setLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        width={300}
        textAlign="center"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        width={300}
        textAlign="center"
      />
      <Button title="Login" onPress={() => setLoggedIn(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
