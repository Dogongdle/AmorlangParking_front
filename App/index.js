import React, {useState, useEffect} from 'react';
import loginScreen from './screens/LoginScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const StackApp = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const App = () => {
  return (
    <NavigationContainer>
      <StackApp.Navigator>
        <StackApp.Screen
          name="LoginStack"
          component={loginScreen}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
};

export default App;
