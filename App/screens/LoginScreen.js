import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';

import {signInGoogle} from '../Auth/loginGoogle';
import {signInKakaoTalk} from '../Auth/loginKakao';
import {signInApple} from '../Auth/loginApple';

const loginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [userInfo]);

  // const handleLogin = async data => {
  //   console.log(data);
  // };

  return (
    <>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => signInGoogle(setUserInfo)}>
            <Text>구글로 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signInKakaoTalk(setUserInfo)}>
            <Text>카카오로 로그인</Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => signInApple(setUserInfo)}>
              <Text>애플로 로그인</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default loginScreen;
