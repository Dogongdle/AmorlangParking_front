//애플 로그인 프로세스
import {appleAuth} from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const signInApple = async setUserInfo => {
  console.log('Beginning Apple Authentication');
  // start a login request
  const fcmToken = await AsyncStorage.getItem('deviceToken');
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    // const {
    //   user,
    //   fullName,
    //   identityToken,
    //   email,
    //   nonce,
    //   realUserStatus /* etc */,
    // } = appleAuthRequestResponse;

    const decodedToken = jwtDecode(appleAuthRequestResponse.identityToken);
    setUserInfo({
      user: {
        username: decodedToken.email,
        provider: 'apple',
        serviceId: appleAuthRequestResponse.user.slice(0, 5),
        platform: Platform.OS.toUpperCase(),
        deviceToken: fcmToken,
      },
    });

    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      setUserInfo({
        user: {
          id: appleAuthRequestResponse.user,
          email: decodedToken.email,
          type: 'apple',
        },
      });
    } else {
      setUserInfo({
        user: {
          id: appleAuthRequestResponse.user,
          email: decodedToken.email,
          type: 'apple',
        },
      });
    }
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      console.warn('User canceled Apple Sign in.');
    } else {
      console.error(error);
    }
  }
};

export {signInApple};
