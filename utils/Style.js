import { StyleSheet } from 'react-native';

const blue = "#007BFF";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      },
      input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 0.5,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      button: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 5,
        width: "100%",
      },
      buttonText: {
        color: "white",
        textAlign: "center",
      },
    
});