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

//api
import parkingAPI from '../api/auth';

//reducer
import {login} from '../reducer/userSlice';
import {useDispatch} from 'react-redux';

const loginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      handleLogin(userInfo);
    }
  }, [userInfo]);

  // const handleLogin = async data => {
  //   console.log(data);
  // };

  const handleLogin = async data => {
    const userData = await parkingAPI.signUp(data);
    if (userData.status === 200) {
      console.log('성공', userData.data);
      if (userData.data.message == '이미 가입된 회원입니다.') {
        const response = await parkingAPI.signIn(data);
        const token = response.data.token;
        console.log(token);
        const res = await parkingAPI.getUser(token);
        console.log(res.data);
        if (!res.data.apart) {
          console.log('아파트가 존재하지 않습니다.');
          dispatch(login({token: token}));
        } else {
          dispatch(login({token: token}));
        }
      } else {
        console.log('nn');
      }
    } else {
      alert('실패', userData.data);
    }
  };

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
