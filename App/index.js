import React, {useState, useEffect} from 'react';
import loginScreen from './screens/LoginScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {login, selectLogin, selectUser, setUser} from './reducer/userSlice';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import parkingAPI from './api/auth';
import HomeScreen from './screens/Home/HomeScreen';
import ApartSetting from './screens/Home/ApartSetting';

const StackApp = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLogin);
  const user = useSelector(selectUser);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const userInfo = await parkingAPI.getUser(userToken);
          if (userInfo.status !== 200) {
            alert('연결상태가 고르지 못합니다.');
            throw Error(userInfo.data);
          }
          await dispatch(setUser(userInfo.data));
          dispatch(login({token: userToken}));
        }
      } catch (e) {
        console.log(e);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackApp.Navigator mode="modal">
          {!loggedIn ? (
            <StackApp.Screen
              name="LoginStack"
              component={loginScreen}
              options={navOptionHandler}
            />
          ) : (
            <>
              {!user.apart ? (
                <StackApp.Screen
                  name="HomeStack"
                  component={ApartSetting}
                  options={navOptionHandler}
                />
              ) : (
                <StackApp.Screen
                  name="HomeStack"
                  component={HomeScreen}
                  options={navOptionHandler}
                />
              )}
            </>
          )}
        </StackApp.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
