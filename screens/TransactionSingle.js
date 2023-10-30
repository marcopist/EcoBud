import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import config from "../config";

function getTransaction(id) {
  const url = config.baseUrl + "/transactions/" + id;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => {
        return data.transaction;
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}

function changeTransaction(id, transaction) {
  const url = config.baseUrl + "/transactions/" + id;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transaction: transaction }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => data.transaction);
    } else {
      throw new Error("Transactions failed");
    }
  });
}

// ... (your imports remain unchanged)

export default function TransactionSingle({ route, navigation }) {
  const transactionId = route.params.id;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    getTransaction(transactionId).then((transaction) => {
      setTransaction(transaction);
    });
  }, [transactionId]);

  const handleFieldChange = (field, value) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: value,
    }));
  };

  const renderField = (
    label,
    value,
    editable = false,
    keyboardType = "default"
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}:</Text>
        {editable ? (
          <TextInput
            style={styles.editableField}
            value={value ? value.toString() : ""}
            onChangeText={(text) =>
              handleFieldChange(label.toLowerCase(), text)
            }
            keyboardType={keyboardType}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    );
  };

  if (!transaction) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Transaction Details</Text>

      {renderField("Username", transaction.username)}
      {renderField("ID", transaction.id)}
      {renderField("Amount", transaction.amount, true, "numeric")}
      {renderField("Currency", transaction.currency, true)}

      {/* Handle the 'ecoData' section explicitly */}
      <Text style={styles.subHeading}>Eco Data:</Text>
      {renderField("Start Date", transaction.ecoData.startDate, true)}
      {renderField("End Date", transaction.ecoData.endDate, true)}
      {renderField(
        "Daily Amount",
        transaction.ecoData.dailyAmount,
        true,
        "numeric"
      )}

      {/* Add similar renderField calls for other fields */}

      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={() => {
            // Implement logic to save changes to the server
            console.log("Saving changes:", transaction);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: "black", // You can customize the color
  },
  editableField: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
