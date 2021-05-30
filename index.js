/**
 * @format
 */
//앱의 background 부분 담당 index
import React, {useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './App/store';
import AsyncStorage from '@react-native-community/async-storage';
import {addPushList} from './App/reducer/pushSlice';
import messaging from '@react-native-firebase/messaging';

const ReduxProvider = () => {
  const [pushMessage, setPushMessage] = useState([]);

  async function requestUserPermission() {
    // 유저가 앱을 다운로드 받았을 때 푸시알림 수신을 허용하시겠습니까? 라는 메시지가 뜨도록 한다.
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

  useEffect(() => { // background에서 알림이 왔을 시에 그를 처리해주기 위한 함수
    requestUserPermission();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Message handled in the background!',
        JSON.stringify(remoteMessage),
      );
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
