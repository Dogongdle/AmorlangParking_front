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
import {addPushList} from './App/reducer/pushSlice';
import messaging from '@react-native-firebase/messaging';
import {add} from 'react-native-reanimated';

const ReduxProvider = () => {
  const [pushMessage, setPushMessage] = useState([]);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('deviceToken', fcmToken);
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

      setPushMessage(previous => previous.push(remoteMessage.notification));
    });
  }, []);

  return (
    <Provider store={store}>
      <App pushMessage={pushMessage} />
    </Provider>
  );
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => ReduxProvider);
