// TransactionsList.js
import {
	View,
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList,
	TouchableWithoutFeedback
} from "react-native";
import React, {useState, useEffect} from "react";
import config from "../config";
import {styles} from "../utils/Style";
import {formatDate} from "../utils/Formatters";

function getTransactions(setTransactions) {
	url = config.baseUrl + "/transactions";
	fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => {
		if (response.status == 200) {
			response.json().then(data => {
				setTransactions(data.transactions);
			});
		} else {
			throw new Error("Transactions failed");
		}
	});
}

function handleOnTransactionPressed(navigation, id) {
	console.log("Pressed", id);
	navigation.navigate("TransactionSingle", {id: id});
}

export default function TransactionsListScreen({navigation}) {
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		getTransactions(setTransactions);
	}, []);

	const renderItem = ({item}) => (
		<TouchableWithoutFeedback onPress={() => handleOnTransactionPressed(navigation, item.id)}>
			<View style={styles.row}>
				<Text style={styles.cell.description}>{item.description.user}</Text>
				<Text style={styles.cell.date}>{formatDate(item.date)}</Text>
				<Text style={styles.cell.amount}>
					{item.amount} {item.currency}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				contentContainerStyle={styles.table}
				data={transactions}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()}
			/>
		</SafeAreaView>
	);
}
