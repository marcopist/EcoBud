// Home.js
import {
  View,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import config from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AnalyticsHomeScreen({ route, navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <View style={styles.row}>
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
        <View>
          <Text>  </Text>
        </View>
        <View style={styles.row}>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
