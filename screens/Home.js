import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen(props) {
  const setLoggedIn = props.setLoggedIn;
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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
