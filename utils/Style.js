import {StyleSheet} from "react-native";

const blue = "#007BFF";
const lightGray = "#f5f5f5";
const darkGray = "#333";

container = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: lightGray,
	padding: 20
};

transactionsSingleContainer = {
    ...container,
    flex: 0,
    justifyContent: "flex-start",
    padding: 10, // Add some padding
}
input = {
    height: 40,
    width: "100%",
    borderColor: darkGray,
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10, // Increase borderRadius
    padding: 10
};

button = {
	...input,
	backgroundColor: blue
};

text = {
	flex: 1,
	marginTop: 10,
	marginBottom: 10
};

buttonText = {
	...text,
	marginTop: 0,
	marginBottom: 0,
	color: "white",
	textAlign: "center"
};

warningText = {
	...text,
	color: "red",
}

loadingText = {
	...text,
	textAlign: "center"
};

title = {
    ...text,
    fontSize: 24,
    textAlign: "center",
    fontWeight: 'bold',
};

tableTransactions = {
	row: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
		width: "100%"
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
	},
	frame: {
		flex: 1,
	}
};

horizontalLine = {
	borderBottomColor: "gray",
	borderBottomWidth: 1,
	height: 1
};

line = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
	marginBottom: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
};

value = {
    text: {
        flex: 1,
        marginBottom: 10,
        textAlign: "right",
        color: darkGray,
    },
    textInput: {
        flex: 1,
        marginBottom: 10,
        textAlign: "right",
        color: blue,
    }
}

export const styles = StyleSheet.create({
	container: container,
	transactionsSingleContainer: transactionsSingleContainer,
	input: input,
	button: button,
	buttonText: buttonText,
	tableTransactions: tableTransactions,
	warningText: warningText,
	text: text,
	horizontalLine: horizontalLine,
	loading: loadingText,
	textInput: text,
	title: title,
	line: line,
	value: value
});
