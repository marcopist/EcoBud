// Login.js
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import config from "../config";

function handleLogin(
  username,
  password,
  setWrongPassword,
  setLoggedIn
) {
  url = config.baseUrl + "/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  }).then((response) => {
    if (response.status == 200) {
      setLoggedIn(true); // Use setLoggedIn to update the state
    } else {
      setWrongPassword(true);
      throw new Error("Login failed");
    }
  });
}

function LoginScreen({ route, navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const setLoggedIn = route.params.setLoggedIn;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi!</Text>
      {wrongPassword && (
        <Text style={styles.error}>Wrong username or password</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button
        title="Go"
        onPress={() =>
          handleLogin(
            username,
            password,
            setWrongPassword,
            setLoggedIn
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
