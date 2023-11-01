// MainAppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import TransactionsListScreen from "../screens/TransactionsList";
import TransactionSingleScreen from "../screens/TransactionSingle";
import AnalyticsHomeScreen from "../screens/AnalyticsHome";

const MainStack = createStackNavigator();

const MainAppNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
    />
    <MainStack.Screen name="Transactions" component={TransactionsListScreen} />
    <MainStack.Screen
      name="TransactionSingle"
      component={TransactionSingleScreen}
    />
    <MainStack.Screen name="Analytics" component={AnalyticsHomeScreen} />
  </MainStack.Navigator>
);

export default MainAppNavigator;
