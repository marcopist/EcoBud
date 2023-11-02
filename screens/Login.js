// Login.js
import {View, Button, StyleSheet, TextInput, TouchableOpacity, Text} from "react-native";
import React, {useState, useContext} from "react";

import AuthContext from "../utils/AuthContext";
import {styles} from "../utils/Style";
import {login} from "../utils/Api";

function handleLogin(username, password, setWrongPassword, setLoggedIn) {
	login(username, password).then(response => {
		if (response.status == 200) {
			setLoggedIn(true);
		} else {
			setWrongPassword(true);
		}
	});
}

export default function LoginScreen({route, navigation}) {
	const setLoggedIn = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [wrongPassword, setWrongPassword] = useState(false);

	return (
		<View style={styles.container}>
			{wrongPassword && <Text style={styles.warning}>Wrong username or password</Text>}
			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={setUsername}
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={setPassword}
				secureTextEntry={true}
				autoComplete="off"
				autoCorrect={false}
				autoCapitalize="none"
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => handleLogin(username, password, setWrongPassword, setLoggedIn)}
			>
				<Text style={styles.buttonText}>Go</Text>
			</TouchableOpacity>
		</View>
	);
}
