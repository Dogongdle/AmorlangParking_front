import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//sign in
const signInGoogle = async setUserInfo => {
  const fcmToken = await AsyncStorage.getItem('deviceToken');
  //google sign in configuration with our credentials
  await GoogleSignin.configure({
    webClientId:
      '379989609546-s3baje7dj0fe2ua805ucntght0t2ubph.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  try {
    console.log('소셜로그인 시작');
    await GoogleSignin.hasPlayServices();

    GoogleSignin.signIn()
      .then(response => {
        console.log({response});
        setUserInfo({
          username: response.user.email,
          provider: 'google',
          serviceId: response.user.id.slice(0, 7),
          platform: Platform.OS.toUpperCase(),
          deviceToken: fcmToken,
        });
      })
      .catch(error => {
        console.log({error});
      });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

export {signInGoogle};
