// AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";

const AuthStack = createStackNavigator();

const AuthNavigator = ({ setLoggedIn }) => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={(props) => (
        <LoginScreen {...props} setLoggedIn={setLoggedIn} />
      )}
    />
  </AuthStack.Navigator>
);

export default AuthNavigator;
