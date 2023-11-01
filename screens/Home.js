// Home.js
import {
  View,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";
import config from "../config";
import AuthContext from "../utils/AuthContext";
import React, { useContext } from "react";
import {blue} from "../utils/Style";
import { styles } from "../utils/Style";

function handleBankLink() {
  url = config.baseUrl + "/bank/link";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        console.log(data.url);
        Linking.openURL(data.url);
      });
    } else {
      throw new Error("Bank link failed");
    }
  });
}

function handleLogOut(setLoggedIn) {
  url = config.baseUrl + "/logout";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log(response.status);
    if (response.status == 200) {
      console.log("Logged out");
      setLoggedIn(false);
    } else {
      throw new Error("Logout failed");
    }
  });
}

export default function HomeScreen({ route, navigation }) {
  const setLoggedIn = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Transactions")}
      >
        <Text style={styles.buttonText}>Transactions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Analytics")}
      >
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBankLink}>
        <Text style={styles.buttonText}>Connect Bank</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogOut(setLoggedIn)}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}