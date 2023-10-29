// TransactionsList.js
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import config from "../config";

function getTransactions(setTransactions) {
  url = config.baseUrl + "/transactions";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        setTransactions(data.transactions);
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}

function formatDate(date) {
  // Takes a date string in ISO format and returns
  // a string in the format "Month, Day"
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  return `${month} ${day}`;
}

function handleOnTransactionPressed(navigation, id) {
  console.log("Pressed", id);
  navigation.navigate("TransactionSingle", { id: id });
}

export default function TransactionsListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  getTransactions(setTransactions);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => handleOnTransactionPressed(navigation, item.id)}
    >
      <View style={styles.row}>
        <Text style={styles.cell.description}>{item.description.display}</Text>
        <Text style={styles.cell.date}>{formatDate(item.date)}</Text>
        <Text style={styles.cell.amount}>
          {item.amount} {item.currency}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
});
