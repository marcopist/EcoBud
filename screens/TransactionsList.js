// TransactionsList.js
import {
  View,
  Button,
  StyleSheet,
  Text,
  Linking,
  ScrollView,
  FlatList,
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
        console.log(data.transactions);
        setTransactions(data.transactions);
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}

export default function TransactionsListScreen(props) {
  const [transactions, setTransactions] = useState([]);
  getTransactions(setTransactions);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.description.display}</Text>
      <Text style={styles.cell}>{item.amount} {item.currency}</Text>
    </View>
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
      justifyContent: "space-around", // Changed from "space-between"
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    cell: {
      flex: 1,
      textAlign: 'center', // Added this line
    },
  });
