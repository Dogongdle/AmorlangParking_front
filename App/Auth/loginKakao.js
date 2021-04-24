import KakaoLogins from '@react-native-seoul/kakao-login';

//When the error comes from KakaoTalk for invalid hash key
//Make sure the alias name for keystore files are correct
//androidreleasekey -> android/app/release.keystore
//androiddebugkey -> android/app/debug.keystore

const signInKakaoTalk = setUserInfo => {
  KakaoLogins.login()
    .then(data => {
      //get the user profile
      KakaoLogins.getProfile()
        .then(response => {
          console.log({response}, 'KakaoTalk user profile');

          const {id, email, nickname} = response;
          console.log(id, email);
          setUserInfo({
            username: email,
            provider: 'kakao',
            serviceId: id,
          });
        })
        .catch(err => {
          console.log({err});
          alert(err);
        });

      //log out the user
      KakaoLogins.logout()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    })
    .catch(err => {
      if (err.code === 'E_CANCELLED_OPERATION') {
        console.log('에러메시지', err.message);
        alert('로그인을 취소했습니다.');
      } else {
        console.log(
          {err},
          '카카오톡 로그인 프로세스를 취소하는 동안 오류가 발생했습니다.',
        );
      }
    });
};

export {signInKakaoTalk};
