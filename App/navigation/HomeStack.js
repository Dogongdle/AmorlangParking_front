import React, {useState, useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import NotificationsScreen from '../screens/Home/NotificationsScreen';
import PushSettingScreen from '../screens/Home/PushSettingScreen';

const StackHome = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});
//메인 화면 스택
const HomeStack = ({navigation, route}) => {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="PushSetting"
        component={PushSettingScreen}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
