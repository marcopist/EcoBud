// TransactionsList.js
import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import config from "../config";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";

function getTransaction(id) {
  url = config.baseUrl + "/transactions/" + id;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      return response.json().then((data) => data.transaction);
    } else {
      throw new Error("Transactions failed");
    }
  });
}

export default function TransactionSingleScreen({ route, navigation }) {
  const id = route.params.id;
  const [transaction, setTransaction] = useState(null);
  const [date, setDate] = useState(new Date());
  const [oneOff, setOneOff] = useState(false);
  const [ecoStartDate, setEcoStartDate] = useState(new Date());
  const [ecoEndDate, setEcoEndDate] = useState(new Date());

  useEffect(() => {
    getTransaction(id)
      .then((transaction) => {
        setTransaction(transaction);
        if (transaction.date) {
          setDate(new Date(transaction.date));
        }
        if (transaction.ecoData.oneOff) {
          setOneOff(true);
        }
        if (transaction.ecoData.startDate) {
          setEcoStartDate(new Date(transaction.ecoData.startDate));
        }
        if (transaction.ecoData.endDate) {
          setEcoEndDate(new Date(transaction.ecoData.endDate));
        }
      })
      .catch((error) => {
        console.error("Failed to fetch transaction:", error);
      });
  }, [id]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    transaction.date = currentDate.toISOString();
    setTransaction({ ...transaction });
  };

  const onEcoStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEcoStartDate(currentDate);
    transaction.ecoData.startDate = currentDate.toISOString();
    setTransaction({ ...transaction });
  };

  const onEcoEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEcoEndDate(currentDate);
    transaction.ecoData.endDate = currentDate.toISOString();
    setTransaction({ ...transaction });
  };

  if (!transaction) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.horizontalLine} />
      <View style={styles.row}>
        <Text style={styles.text}>Transaction ID:</Text>
        <Text style={styles.value.text}>
          {transaction.id.slice(0, 4)}...{transaction.id.slice(-4)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Transaction amount:</Text>
        <Text style={styles.value.text}>
          {transaction.amount} {transaction.currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Summary:</Text>
        <TextInput
          style={styles.value.textInput}
          value={transaction.description.user}
          editable={true}
          onChangeText={(text) => {
            transaction.description.user = text;
            setTransaction({ ...transaction });
          }}
        ></TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Date:</Text>
        <DateTimePicker
          style={styles.value}
          value={date}
          onChange={onDateChange}
        />
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.row}>
        <Text style={styles.text}>One off:</Text>
        <Checkbox
          disabled={false}
          value={oneOff}
          onValueChange={(newValue) => setOneOff(newValue)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Start Date:</Text>
        <DateTimePicker
          style={styles.value}
          value={ecoStartDate}
          onChange={onEcoStartDateChange}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>End Date:</Text>
        <DateTimePicker
          style={styles.value}
          value={ecoEndDate}
          onChange={onEcoEndDateChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  value: {
    text: {
      flex: 1,
      fontSize: 18,
      marginBottom: 10,
      textAlign: "right",
    },
    textInput: {
      flex: 1,
      fontSize: 18,
      marginBottom: 10,
      textAlign: "right",
      color: "blue",
    },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
