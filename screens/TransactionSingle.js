// TransactionsList.js
import { View, Text } from "react-native";
import React, { useState } from "react";
import config from "../config";

function getTransaction(id) {
  url = config.baseUrl + "/transactions/" + id;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        return data.transaction;
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}

export default function TransactionSingleScreen({ route, navigation }) {
  const id = route.params.id;
  const transaction = getTransaction(id);
  return (
    <View>
      <Text>Transaction Single Screen, id = {id}</Text>
    </View>
  );
}
