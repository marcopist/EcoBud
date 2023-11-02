import { StyleSheet } from "react-native";

const blue = "#007BFF";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: blue,
    width: "90%",
    padding: 10,
    borderRadius: 5,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  cell: {
    description: {
      flex: 1,
      textAlign: "left",
    },
    date: {
      width: "12.5%",
      textAlign: "center",
    },
    amount: {
      width: "22.5%",
      textAlign: "right",
    },
  },
  table: {
    flex: 1,
    width: "90%",
  },
  warning: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
