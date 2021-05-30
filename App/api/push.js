// 푸시알림 관련 API 관리
import parkingAPI from './API';

const getZzimSeat = async token => {
  // 현재 유저가 찜한 자리 정보
  try {
    return await parkingAPI.get('/push', null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getSettingPush = async token => {
  // 푸시 알림 출차/입차 설정 정보 받아오기
  try {
    return await parkingAPI.get('/push/status', null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const settingPush = async (token, data) => {
  // 푸시 알림 출차/입차 설정 정보 변경
  try {
    console.log(data);
    return await parkingAPI.post('/push/status', data, {
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
  getZzimSeat,
  getSettingPush,
  settingPush,
};
