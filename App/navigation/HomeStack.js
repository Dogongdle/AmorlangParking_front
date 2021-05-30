//HomeStack Navigator 컴포넌트.
//홈스크린, 알림설정 페이지, 알림리스트 페이지 등 총 3개의 스크린으로 이뤄진다.

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import NotificationsScreen from '../screens/Home/NotificationsScreen';
import PushSettingScreen from '../screens/Home/PushSettingScreen';

const StackHome = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false, //react-navigation 자체적으로 제공해주는 header의 디자인은 별로이기 때문에 별도의 커스텀화를 위해 이 부분은 보이지 않게 처리함.
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
