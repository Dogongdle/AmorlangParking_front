//로그인,회원가입,토큰 등등 유저 관련 API 관리
import parkingAPI from './API';

const signUp = async data => {  //회원가입
  try {
    console.log(data);
    return await parkingAPI.post('/signup', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async data => {  //로그인
  try {
    console.log(data);
    return await parkingAPI.post('/signin', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async token => {  //유저정보 열람
  try {
    return await parkingAPI.get('/user', null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const registerApart = async (token, data) => {  //아파트 정보 등록
  try {
    return await parkingAPI.post('/user', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyCheck = async (token, data) => {  //아파트 유효성 체크
  try {
    return await parkingAPI.post('/verify', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  signUp,
  signIn,
  getUser,
  registerApart,
  verifyCheck,
};
