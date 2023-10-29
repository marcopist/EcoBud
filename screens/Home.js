import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import config from "../config";
import * as Linking from 'expo-linking';

function handleBankLink() {
  url = config.baseUrl + "/bank/link";
  fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        Linking.openURL(data.url);
      });
    } else {
      throw new Error("Bank link failed");
    }
  });
}

export default function HomeScreen(props) {
  const setLoggedIn = props.setLoggedIn;

  return (
    <View style={styles.container}>
      <Button title="Connect Bank" onPress={() => handleBankLink()}/>
      <Button title="Logout" onPress={() => setLoggedIn(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
