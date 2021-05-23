import parkingAPI from './API';

const checkPush = async token => {
  // 현재 유저에게 할당된 alarm을 받아오는 api
  try {
    console.log(data);
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

const registerPush = async (token, data) => {
  // 현재 유저에게 할당된 alarm api
  try {
    console.log(data);
    return await parkingAPI.post('/push', data, {
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
  try {
    console.log(data);
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
  checkPush,
  registerPush,
  getSettingPush,
  settingPush,
};
