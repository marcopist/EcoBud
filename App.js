// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigators/AuthNavigator";
import MainAppNavigator from "./navigators/MainAppNavigator";
import AuthContext from "./utils/AuthContext";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={setLoggedIn}>
      <NavigationContainer>
        {isLoggedIn ? <MainAppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
