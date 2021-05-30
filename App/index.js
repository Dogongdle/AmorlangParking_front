//foreground 상태의 앱을 총괄하는 index 파일
import React, {useState, useEffect, useCallback} from 'react';
import loginScreen from './screens/LoginScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {
  login,
  selectLogin,
  selectUser,
  setUser,
  setDuration,
} from './reducer/userSlice';
import {addPushList} from './reducer/pushSlice';
import {setTime} from './reducer/parkingSlice';
import {selectLoading, endLoading} from './reducer/loadingSlice';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import parkingAPI from './api/auth';
import RegisterStack from './navigation/RegisterStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoadingScreen from './Loading/LoadingScreen';
import AppDrawer from './components/AppDrawer';
import HomeStack from './navigation/HomeStack';
import {Root} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import Toast, {BaseToast} from 'react-native-toast-message';
import {colors} from './config/globalStyles';

const StackApp = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const App = ({pushMessage}) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLogin);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const toastConfig = {
    //알림이 도착할 시에 toastmessage를 호출하여 유저가 알림을 받았다고 인지할 수 있게끔 한다.
    success: ({text1, ...rest}) => (
      <BaseToast
        {...rest}
        style={{borderLeftColor: colors.primary}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold',
        }}
        text1="아몰랑 파킹"
        text2="새로운 알림이 도착하였습니다."
      />
    ),
  };

  useEffect(() => {
    //알림이 도착할 시에 toastmessage를 호출하여 유저가 알림을 받았다고 인지할 수 있게끔 한다.
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
      dispatch(addPushList(remoteMessage.notification));
      Toast.show({
        props: {
          onPress: () => {
            navigation.navigate('Notification');
          },
          guid: 'guid-id',
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        //Async 스토리지에서 필요한 정보들을 받아온다.
        userToken = await AsyncStorage.getItem('userToken'); //유저 토큰
        const duration = await AsyncStorage.getItem('Duration'); // 유저가 커스텀한 자동 렌더링 주기 시간
        const endTime = await AsyncStorage.getItem('reserveEndTime'); //5분 예약 마감 시간
        if (pushMessage.length >= 1) {
          dispatch(addPushList(JSON.parse(pushMessage))); //background에서 저장되어 있는 push 알림들을 리스트에 추가
        }
        //앱을 사용하는데에 필요한 정보들을 담아주는 프로세스
        if (userToken) {
          const userInfo = await parkingAPI.getUser(userToken);
          console.log('유저정보', userInfo.data);
          if (userInfo.status !== 200) {
            alert('연결상태가 고르지 못합니다.');
            throw Error(userInfo.data);
          }
          await dispatch(setUser(userInfo.data));
          dispatch(login({token: userToken}));

          if (duration) {
            dispatch(setDuration(duration));
          }
          if (endTime) {
            dispatch(setTime({time: endTime}));
          }
        }
        dispatch(endLoading());
      } catch (e) {
        console.log(e);
      }
    };
    bootstrapAsync();
  }, []);

  const Drawer = createDrawerNavigator();

  function DrawerNavigator({navigation}) {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={() => <AppDrawer navigation={navigation} />}>
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={navOptionHandler}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <SafeAreaProvider>
          <NavigationContainer>
            <StackApp.Navigator mode="modal">
              {loading ? ( //기본적으로 로딩 상태일 때에는 loading스크린이 보인다.
                <StackApp.Screen
                  name="Loading"
                  component={LoadingScreen}
                  options={navOptionHandler}
                />
              ) : (
                <>
                  {!loggedIn ? ( //유저의 상태가 로그인 상태일 때
                    <StackApp.Screen
                      name="Login"
                      component={loginScreen}
                      options={navOptionHandler}
                    />
                  ) : (
                    <>
                      {!user.apart ? ( //유저가 아파트를 설정해놓은 상태일 때 => 이러한 처리를 하지 않는다면 회원가입 후 아파트 설정을 하지 않은 채 앱을 꺼버린 유저가 다음에 앱을 켰을 때 오류 메시지를 받을 수 있다.
                        <StackApp.Screen
                          name="Register"
                          component={RegisterStack}
                          options={navOptionHandler}
                        />
                      ) : (
                        <StackApp.Screen
                          name="Home"
                          component={DrawerNavigator}
                          options={navOptionHandler}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </StackApp.Navigator>
          </NavigationContainer>
          <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
        </SafeAreaProvider>
      </Root>
    </Provider>
  );
};

export default App;
