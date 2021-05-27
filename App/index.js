import React, {useState, useEffect, useCallback} from 'react';
import {BackHandler, Alert} from 'react-native';
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
        userToken = await AsyncStorage.getItem('userToken');
        const duration = await AsyncStorage.getItem('Duration');
        const endTime = await AsyncStorage.getItem('reserveEndTime');
        if (pushMessage.length >= 1) {
          dispatch(addPushList(JSON.parse(pushMessage)));
        }
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
              {loading ? (
                <StackApp.Screen
                  name="Loading"
                  component={LoadingScreen}
                  options={navOptionHandler}
                />
              ) : (
                <>
                  {!loggedIn ? (
                    <StackApp.Screen
                      name="Login"
                      component={loginScreen}
                      options={navOptionHandler}
                    />
                  ) : (
                    <>
                      {!user.apart ? (
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
