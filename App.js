// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigators/AuthNavigator";
import MainAppNavigator from "./navigators/MainAppNavigator";

const App = () => {
  // Destructure the array returned by useState
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainAppNavigator setLoggedIn={setLoggedIn}/>
      ) : (
        <AuthNavigator setLoggedIn={setLoggedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;
