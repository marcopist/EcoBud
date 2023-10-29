// MainAppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import TransactionsListScreen from "../screens/TransactionsList";
import TransactionSingleScreen from "../screens/TransactionSingle";

const MainStack = createStackNavigator();

const MainAppNavigator = ({ setLoggedIn }) => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ setLoggedIn: setLoggedIn }}
    />
    <MainStack.Screen name="Transactions" component={TransactionsListScreen} />
    <MainStack.Screen
      name="TransactionSingle"
      component={TransactionSingleScreen}
    />
  </MainStack.Navigator>
);

export default MainAppNavigator;
