// Home.js
import {View, StyleSheet, FlatList, TouchableWithoutFeedback, Text} from "react-native";
import React, {useState} from "react";
import config from "../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useFocusEffect} from "@react-navigation/native";
import {formatDate, formatNumber} from "../utils/Formatters";
import {styles} from "../utils/Style";

function getAnalytics(startDate, endDate, setAnalytics) {
	const startDateStr = startDate.toISOString().substring(0, 10);
	const endDateStr = endDate.toISOString().substring(0, 10);
	const url = `${config.baseUrl}/analytics/${startDateStr}/${endDateStr}`;

	fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => {
		if (response.status === 200) {
			response.json().then(data => {
				setAnalytics(data.analytics);
			});
		} else {
			throw new Error("Analytics failed");
		}
	});
}

function handleOnTransactionPressed(navigation, id) {
	console.log("Pressed", id);
	navigation.navigate("TransactionSingle", {id});
}

export default function AnalyticsHomeScreen({route, navigation}) {
	const [loaded, setLoaded] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [analytics, setAnalytics] = useState({});

	useFocusEffect(
		React.useCallback(() => {
			getAnalytics(startDate, endDate, setAnalytics);
			setLoaded(true);
		}, [startDate, endDate])
	);

	const renderItem = ({item}) => (
		<TouchableWithoutFeedback
			onPress={() => handleOnTransactionPressed(navigation, item.transaction.id)}
		>
			<View style={styles.tableTransactions.row}>
				<Text style={styles.tableTransactions.cell.description}>
					{item.transaction.description.user}
				</Text>
				<Text style={styles.tableTransactions.cell.date}>
					{formatDate(item.transaction.date)}
				</Text>
				<Text style={styles.tableTransactions.cell.amount}>
					{formatNumber(item.outputData.periodCost)} {item.transaction.currency}
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
			<View style={styles.settingsContainer}>
				<View style={styles.datePickerContainer}>
					<Text style={stylesLocal.datePickerLabel}>Start:</Text>
					<DateTimePicker
						style={stylesLocal.datePicker}
						value={startDate}
						mode="date"
						display="default"
						onChange={(event, date) => {
							setStartDate(date);
						}}
					/>
				</View>
				<View style={styles.datePickerContainer}>
					<Text style={stylesLocal.datePickerLabel}>End:</Text>
					<DateTimePicker
						style={stylesLocal.datePicker}
						value={endDate}
						mode="date"
						display="default"
						onChange={(event, date) => {
							setEndDate(date);
						}}
					/>
				</View>
			</View>
			<View style={stylesLocal.mainRow}>
				<Text>Income:</Text>
				<Text style={stylesLocal.periodCost}>{formatNumber(analytics.periodCost)}</Text>
			</View>
			<FlatList
				contentContainerStyle={stylesLocal.table}
				data={analytics.transactions}
				renderItem={renderItem}
				keyExtractor={item => item.transaction._id.toString()}
			/>
		</View>
	);
}

const stylesLocal = StyleSheet.create({
	mainRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		width: "100%"
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20
	},
	tableRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc"
	},
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		width: "100%",
		padding: 20
	},
	table: {
		flex: 1,
		width: "100%"
	},
	periodCost: {
		textAlign: "right",
		color: "#007BFF"
	},
	cell: {
		description: {
			flex: 1,
			textAlign: "left"
		},
		date: {
			width: "12.5%",
			textAlign: "center"
		},
		amount: {
			width: "22.5%",
			textAlign: "right"
		}
	}
});
