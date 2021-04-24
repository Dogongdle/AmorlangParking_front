import React, {useState, useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ApartSetting from '../screens/Register/ApartSetting';
import CodeVerifyScreen from '../screens/Register/CodeVerifyScreen';

const StackRegister = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
  gestureEnabled: false,
});
//메인 화면 스택
const RegisterStack = ({navigation, route}) => {
  return (
    <StackRegister.Navigator initialRouteName="ApartSetting">
      <StackRegister.Screen
        name="ApartSetting"
        component={ApartSetting}
        options={navOptionHandler}
      />
      <StackRegister.Screen
        name="CodeVerify"
        component={CodeVerifyScreen}
        options={navOptionHandler}
      />
    </StackRegister.Navigator>
  );
};

export default RegisterStack;
