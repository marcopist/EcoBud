// TransactionsList.js
import {View, Text, TextInput} from "react-native";
import React, {useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import {getSingleTransaction, putSingleTransaction} from "../utils/Api";
import {styles} from "../utils/Style";

function getTransaction(id) {
  return getSingleTransaction(id).then(response => {
    if (response.status == 200) {
      return response.json().then(data => {
        return data.transaction;
      });
    } else {
      throw new Error("Transactions failed");
    }
  });
}

function changeTransaction(id, transaction) {
  return putSingleTransaction(id, transaction).then(response => {
    if (response.status == 200) {
      return response.json().then(data => data.transaction);
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

export default function TransactionSingleScreen({route, navigation}) {
	const transactionId = route.params.id;
	const [transaction, setTransaction] = useState(null);

	{transaction && navigation.setOptions({
		title: transaction.description.user
	});}

	useEffect(() => {
		getTransaction(transactionId).then(transaction => {
			setTransaction(transaction);
		});
	}, [transactionId]);

	useEffect(() => {
		if (transaction) {
			changeTransaction(transactionId, transaction);
		}
	}, [transaction]);

	if (!transaction) {
		return <Text style={styles.loadingText}>Loading...</Text>;
	}

	return (
		<View style={styles.transactionsSingleContainer}>
			{/*Title and horizontal line*/}
			<Text style={styles.title}>Transaction Details</Text>
			<View style={styles.horizontalLine} />

			{/*Transaction ID*/}
			<View style={styles.line}>
				<Text style={styles.text}>Transaction ID:</Text>
				<Text style={styles.value.text}>
					{transaction._id.slice(0, 4)}...{transaction._id.slice(-4)}
				</Text>
			</View>

			{/*Transaction amount & currency*/}
			<View style={styles.line}>
				<Text style={styles.text}>Transaction amount:</Text>
				<Text style={styles.value.text}>
					{transaction.amount} {transaction.currency}
				</Text>
			</View>

			{/*Description of transaction*/}
			<View style={styles.line}>
				<Text style={styles.text}>Summary:</Text>
				<TextInput
					style={styles.value.textInput}
					value={transaction.description.user}
					editable={true}
					onChangeText={text => {
						setTransaction(prevTransaction => ({
							...prevTransaction,
							description: {...prevTransaction.description, user: text}
						}));
					}}
				></TextInput>
			</View>

			{/*Transaction date*/}
			<View style={styles.line}>
				<Text style={styles.text}>Date:</Text>
				<DateTimePicker
					style={styles.value}
					value={new Date(transaction.date)}
					onChange={(event, date) => {
						setTransaction(prevTransaction => ({
							...prevTransaction,
							date: date.toISOString().substring(0, 10)
						}));
					}}
				/>
			</View>

			{/*Transaction status*/}
			<View style={styles.line}>
				<Text style={styles.text}>Status:</Text>
				<Text style={styles.value.text}>{transaction.tinkData.status}</Text>
			</View>

			{/*Horizontal line*/}
			<View style={styles.horizontalLine} />

			{/*One off checkbox*/}
			<View style={styles.line}>
				<Text style={styles.text}>One off:</Text>
				<Checkbox
					disabled={false}
					value={transaction.ecoData.oneOff}
					onValueChange={newValue => {
						setTransaction(prevTransaction => ({
							...prevTransaction,
							ecoData: {
								startDate: transaction.date,
								endDate: transaction.date,
								oneOff: newValue
							}
						}));
					}}
				/>
			</View>

			{/*Eco start date*/}
			{!transaction.ecoData.oneOff && (
				<View style={styles.line}>
					<Text style={styles.text}>Start Date:</Text>
					<DateTimePicker
						style={styles.value}
						value={new Date(transaction.ecoData.startDate)}
						onChange={(event, date) => {
							setTransaction(prevTransaction => ({
								...prevTransaction,
								ecoData: {
									...prevTransaction.ecoData,
									startDate: date.toISOString().substring(0, 10)
								}
							}));
						}}
					/>
				</View>
			)}

			{/*Eco end date*/}
			{!transaction.ecoData.oneOff && (
				<View style={styles.line}>
					<Text style={styles.text}>End Date:</Text>
					<DateTimePicker
						style={styles.value}
						value={new Date(transaction.ecoData.endDate)}
						onChange={(event, date) => {
							setTransaction(prevTransaction => ({
								...prevTransaction,
								ecoData: {
									...prevTransaction.ecoData,
									endDate: date.toISOString().substring(0, 10)
								}
							}));
						}}
					/>
				</View>
			)}

			{/*Daily amount*/}
			{!transaction.ecoData.oneOff && (
				<View style={styles.line}>
					<Text style={styles.text}>Daily amount:</Text>
					<Text style={styles.value.text}>
						{dailyAmount(transaction).toFixed(2)} {transaction.currency}
					</Text>
				</View>
			)}
		</View>
	);
}
