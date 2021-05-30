//로그인 스크린. 소셜로그인은 애플, 구글, 카카오로 이루어지며 안드로이드의 경우 애플로그인은 보이지 않는다.
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import {signInGoogle} from '../Auth/loginGoogle';
import {signInKakaoTalk} from '../Auth/loginKakao';
import {signInApple} from '../Auth/loginApple';

//api
import parkingAPI from '../api/auth';

//reducer
import {login, setUser} from '../reducer/userSlice';
import {useDispatch} from 'react-redux';
import {colors, images, width, height} from '../config/globalStyles';
import {SocialButton} from '../components/socialButton';
import LoadingScreen from '../Loading/LoadingScreen';

const loginScreen = () => {
  const [userInfo, setUserInfo] = useState(null); //로그인 시 필요한 유저 정보
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      //유저정보의 변화가 있을 때 해당 정보를 통한 로그인이 진행된다.
      handleLogin(userInfo);
    }
  }, [userInfo]);

  // const handleLogin = async data => {
  //   console.log(data);
  // };

  const handleLogin = async data => {
    //로그인 함수
    setLoading(true);
    const userData = await parkingAPI.signUp(data);
    if (userData.status === 200) {
      const response = await parkingAPI.signIn(data);
      const token = response.data.token;
      const userInfo = await parkingAPI.getUser(token);
      await dispatch(setUser(userInfo.data));
      dispatch(login({token: token}));
    } else {
      alert('실패', userData.data); // 만약 이 메시지를 본다면 500 에러일 확률이 매우 높다. backend 측에 문의
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
        }}
        source={images.loginBackground}>
        <View style={{flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)'}}>
          <View
            style={{flex: 7, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.mainLogo}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 3}}>
            <View style={styles.socialButtonView}>
              <SocialButton
                onPress={() => signInGoogle(setUserInfo)}
                color={colors.white}>
                <Image
                  source={images.google}
                  style={styles.socialLogo}
                  resizeMode="contain"
                />
              </SocialButton>
              <SocialButton
                onPress={() => signInKakaoTalk(setUserInfo)}
                color={colors.kakaoTalk}>
                <Image
                  source={images.kakaoTalk}
                  style={[styles.socialLogo, {width: width * 50}]}
                  resizeMode="contain"
                />
              </SocialButton>
              {Platform.OS === 'ios' && (
                <SocialButton
                  onPress={() => signInApple(setUserInfo)}
                  color={colors.apple}>
                  <Image
                    source={images.apple}
                    style={[styles.socialLogo]}
                    resizeMode="contain"
                  />
                </SocialButton>
              )}
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: width * 16,
                  color: colors.white,
                  fontWeight: '700',
                }}>
                SNS 간편 로그인
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default loginScreen;

const styles = StyleSheet.create({
  mainLogo: {
    width: width * 330,
    height: height * 330,
    marginTop: height * 70,
  },
  socialButton: {
    width: width * 343,
    height: height * 40,
    borderRadius: 10,
  },
  socialButtonView: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: width * 20,
  },
  socialLogo: {
    width: width * 30,
    height: '100%',
    borderRadius: 10,
  },
});
