// Home.js
import { View, Button, StyleSheet, Linking } from "react-native";
import config from "../config";

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
        console.log(data.url)
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
    if (response.status == 200) {
      console.log("Logged out");
      setLoggedIn(false);
    } else {
      throw new Error("Logout failed");
    }
  });
}

export default function HomeScreen(props) {
  const setLoggedIn = props.setLoggedIn;

  return (
    <View style={styles.container}>
      <Button title="Transactions" onPress={() => props.navigation.navigate("Transactions")} />
      <Button title="Connect Bank" onPress={handleBankLink} />
      <Button title="Logout" onPress={() => handleLogOut(setLoggedIn)} />
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
