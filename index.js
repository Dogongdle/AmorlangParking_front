/**
 * @format
 */

import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './App/store';
import AsyncStorage from '@react-native-community/async-storage';

import messaging from '@react-native-firebase/messaging';

const ReduxProvider = () => {
  const [pushToken, setPushToken] = useState(null);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setPushToken(fcmToken);
        console.log(fcmToken);
        AsyncStorage.setItem('deviceToken', fcmToken);
      }
    } else {
      console.log('알림설정안되어있음');
    }
  }

  useEffect(() => {
    requestUserPermission();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => ReduxProvider);
