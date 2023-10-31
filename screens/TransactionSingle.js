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
      return response.json().then((data) => {
        return data.transaction;
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}
function changeTransaction(id, transaction) {
  url = config.baseUrl + "/transactions/" + id;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transaction: transaction }),
  }).then((response) => {
    if (response.status == 200) {
      return response.json().then((data) => data.transaction);
    } else {
      throw new Error("Transactions failed");
    }
  });
}

function dailyAmount(transaction) {
  const startDate = new Date(transaction.ecoData.startDate);
  const endDate = new Date(transaction.ecoData.endDate);

  const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  return transaction.amount / days;
}

// function validateTransaction(transaction) {
//   if (transaction.amount == null) {
//     return false;
//   }
//   if (transaction.currency == null) {
//     return false;
//   }
//   if (transaction.description.user == null) {
//     return false;
//   }
//   if (transaction.date == null) {
//     return false;
//   }
//   if (transaction.ecoData.oneOff == null) {
//     return false;
//   }
//   if (transaction.ecoData.startDate == null) {
//     return false;
//   }
//   if (transaction.ecoData.endDate == null) {
//     return false;
//   }
//   if (transaction.ecoData.startDate > transaction.ecoData.endDate) {
//     return false;
//   }
//   return true;
// }

export default function TransactionSingleScreen({ route, navigation }) {
  const transactionId = route.params.id;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    getTransaction(transactionId).then((transaction) => {
      setTransaction(transaction);
    });
  }, [transactionId]);

  useEffect(() => {
    if (transaction) {
      changeTransaction(transactionId, transaction);
    }
  }, [transaction]);

  if (!transaction) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/*Title and horizontal line*/}
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.horizontalLine} />

      {/*Transaction ID*/}
      <View style={styles.row}>
        <Text style={styles.text}>Transaction ID:</Text>
        <Text style={styles.value.text}>
          {transaction.id.slice(0, 4)}...{transaction.id.slice(-4)}
        </Text>
      </View>

      {/*Transaction amount & currency*/}
      <View style={styles.row}>
        <Text style={styles.text}>Transaction amount:</Text>
        <Text style={styles.value.text}>
          {transaction.amount} {transaction.currency}
        </Text>
      </View>

      {/*Description of transaction*/}
      <View style={styles.row}>
        <Text style={styles.text}>Summary:</Text>
        <TextInput
          style={styles.value.textInput}
          value={transaction.description.user}
          editable={true}
          onChangeText={(text) => {
            setTransaction((prevTransaction) => ({
              ...prevTransaction,
              description: { ...prevTransaction.description, user: text },
            }));
          }}
        ></TextInput>
      </View>

      {/*Transaction date*/}
      <View style={styles.row}>
        <Text style={styles.text}>Date:</Text>
        <DateTimePicker
          style={styles.value}
          value={new Date(transaction.date)}
          onChange={(event, date) => {
            setTransaction((prevTransaction) => ({
              ...prevTransaction,
              date: date,
            }));
          }}
        />
      </View>

      {/*Transaction status*/}
      <View style={styles.row}>
        <Text style={styles.text}>Status:</Text>
        <Text style={styles.value.text}>{transaction.tinkData.status}</Text>
      </View>

      {/*Horizontal line*/}
      <View style={styles.horizontalLine} />

      {/*One off checkbox*/}
      <View style={styles.row}>
        <Text style={styles.text}>One off:</Text>
        <Checkbox
          disabled={false}
          value={transaction.ecoData.oneOff}
          onValueChange={(newValue) => {
            setTransaction((prevTransaction) => ({
              ...prevTransaction,
              ecoData: {
                startDate: transaction.date,
                endDate: transaction.date,
                oneOff: newValue,
              },
            }));
          }}
        />
      </View>

      {/*Eco start date*/}
      {!transaction.ecoData.oneOff && (
        <View style={styles.row}>
          <Text style={styles.text}>Start Date:</Text>
          <DateTimePicker
            style={styles.value}
            value={new Date(transaction.ecoData.startDate)}
            onChange={(event, date) => {
              setTransaction((prevTransaction) => ({
                ...prevTransaction,
                ecoData: {
                  ...prevTransaction.ecoData,
                  startDate: date.toISOString(),
                },
              }));
            }}
          />
        </View>
      )}

      {/*Eco end date*/}
      {!transaction.ecoData.oneOff && (
        <View style={styles.row}>
          <Text style={styles.text}>End Date:</Text>
          <DateTimePicker
            style={styles.value}
            value={new Date(transaction.ecoData.endDate)}
            onChange={(event, date) => {
              setTransaction((prevTransaction) => ({
                ...prevTransaction,
                ecoData: {
                  ...prevTransaction.ecoData,
                  endDate: date.toISOString(),
                },
              }));
            }}
          />
        </View>
      )}

      {/*Daily amount*/}
      {!transaction.ecoData.oneOff && (
        <View style={styles.row}>
          <Text style={styles.text}>Daily amount:</Text>
          <Text style={styles.value.text}>
            {dailyAmount(transaction).toFixed(2)} {transaction.currency}
          </Text>
        </View>
      )}
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
