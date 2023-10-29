import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import config from "../config";

function handleLogin(username, password, setLoggedIn, setWrongPassword) {
  url = config.baseUrl + "/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  }).then((response) => {
    if (response.status == 200) {
      setLoggedIn(true);
    } else {
      setWrongPassword(true);
      throw new Error("Login failed");
    }
  });
}

export default function LoginScreen(props) {
  const setLoggedIn = props.setLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {wrongPassword && <Text >Wrong username or password</Text>}
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
      <Button title="Login" onPress={() => handleLogin(username, password, setLoggedIn, setWrongPassword)} />
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
