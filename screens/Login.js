// Login.js
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, {useState, useContext} from "react";
import config from "../config";
import AuthContext from '../utils/AuthContext';
import {styles} from '../utils/Style';

function handleLogin(username, password, setWrongPassword, setLoggedIn) {
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

export default function LoginScreen({ route, navigation }) {
  const setLoggedIn = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleLogin(username, password, setWrongPassword, setLoggedIn)
        }
      >
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
}