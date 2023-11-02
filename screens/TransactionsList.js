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
import {styles} from "../utils/Style";
import {formatDate} from "../utils/Formatters";
import {getTransactions} from "../utils/Api";

async function loadTransactions(setTransactions) {
	let transactions = await getTransactions();
	setTransactions(transactions);
}

function handleOnTransactionPressed(navigation, id) {
	console.log("Pressed", id);
	navigation.navigate("TransactionSingle", {id: id});
}

export default function TransactionsListScreen({navigation}) {
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		loadTransactions(setTransactions);
	}, []);

	const renderItem = ({item}) => (
		<TouchableWithoutFeedback onPress={() => handleOnTransactionPressed(navigation, item._id)}>
			<View style={styles.tableTransactions.row}>
				<Text style={styles.tableTransactions.cell.description}>
					{item.description.user}
				</Text>
				<Text style={styles.tableTransactions.cell.date}>{formatDate(item.date)}</Text>
				<Text style={styles.tableTransactions.cell.amount}>
					{item.amount} {item.currency}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);

	return (
			<FlatList
				style={styles.tableTransactions.frame}
				data={transactions}
				renderItem={renderItem}
				keyExtractor={item => item._id.toString()}
				initialNumToRender={transactions.length}
			/>
	);
}
