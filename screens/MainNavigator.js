import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Home";
import createNativeStackNavigator from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MainApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}