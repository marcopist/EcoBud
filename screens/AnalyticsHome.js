// Home.js
import {
  View,
  Button,
  StyleSheet,
  Linking,
  FlatList,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import config from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getCostPerPeriod } from "../logics/Analysis";

function getTransactionsFromPeriod(setTransactions, startDate, endDate) {
  startDateStr = startDate.toISOString().substring(0, 10);
  endDateStr = endDate.toISOString().substring(0, 10);

  url =
    config.baseUrl +
    "/analytics/transactions/" +
    startDateStr +
    "/" +
    endDateStr;
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

function getCostFromPeriod(setCost, startDate, endDate) {
  startDateStr = startDate.toISOString().substring(0, 10);
  endDateStr = endDate.toISOString().substring(0, 10);

  url = config.baseUrl + "/analytics/cost/" + startDateStr + "/" + endDateStr;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        setCost(data.cost);
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
  const month = dateObj.toLocaleString("en", { month: "short" });
  const day = dateObj.getDate();
  return `${month} ${day}`;
}

function handleOnTransactionPressed(navigation, id) {
  console.log("Pressed", id);
  navigation.navigate("TransactionSingle", { id: id });
}

export default function AnalyticsHomeScreen({ route, navigation }) {
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    getTransactionsFromPeriod(setTransactions, startDate, endDate);
    getCostFromPeriod(setCost, startDate, endDate);
    setLoaded(true);
  }, [startDate, endDate]);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => handleOnTransactionPressed(navigation, item.id)}
    >
      <View style={styles.tableRow}>
        <Text style={styles.cell.description}>{item.description.user}</Text>
        <Text style={styles.cell.date}>{formatDate(item.date)}</Text>
        <Text style={styles.cell.amount}>
          {getCostPerPeriod(item, startDate, endDate)} {item.currency}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={styles.topRow}>
          <Text>Start:</Text>
          <DateTimePicker
            value={startDate}
            mode={"date"}
            display="default"
            onChange={(event, date) => {
              setStartDate(date);
            }}
          />
        </View>
        <View style={styles.topRow}>
          <Text>End:</Text>
          <DateTimePicker
            value={endDate}
            mode={"date"}
            display="default"
            onChange={(event, date) => {
              setEndDate(date);
            }}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.table}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: 20,
  },
  table: {
    flex: 1,
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
});
