import parkingAPI from './API';

const signUp = async data => {
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

const signIn = async data => {
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

const getUser = async token => {
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

const registerApart = async (token, data) => {
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

export default {
  signUp,
  signIn,
  getUser,
  registerApart,
};
