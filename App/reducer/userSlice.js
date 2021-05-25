import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import parkingAPI from '../api/auth';

export const getReserveData = createAsyncThunk(
  'user/getReserveData',
  async payload => {
    const response = await parkingAPI.getUser(payload);
    if (response.status != 200) throw Error(response.data);
    return response.data.reserved;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loggedIn: false,
    reserving: null,
    reservingSeat: null,
    duration: 10000,
    time: null,
    status: 'success',
  },

  reducers: {
    login: (state, action) => {
      console.log('token', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token);
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: state => {
      AsyncStorage.removeItem('userToken'); // AsyncStorage.removeItem('deviceToken');
      state.reserving = null;
      state.loggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log('유저세팅', state.user);
    },
    register: (state, action) => {
      state.user.apart = action.payload;
    },
    reserve: (state, action) => {
      state.user.reserved = true;
      AsyncStorage.setItem('reserving', 'true');
    },
    setDuration: (state, action) => {
      console.log('reducer에서 어떻게받지?', action.payload);
      state.duration = action.payload * 1000;
      AsyncStorage.setItem('Duration', action.payload);
    },
    clearReserve: state => {
      state.user.reserved = '';
    },
  },
  extraReducers: {
    [getReserveData.fulfilled]: (state, action) => {
      state.user.reserved = action.payload;
      state.status = 'success';
    },
    [getReserveData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getReserveData.rejected]: (state, action) => {
      state.status = 'failed';
      alert('데이터를 받아오던 중 문제가 발생하였습니다.');
    },
  },
});
export const {
  login,
  setUser,
  logout,
  register,
  reserve,
  setDuration,
  clearReserve,
} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
export const selectReserving = state => state.user.reserving;
export const selectDuration = state => state.user.duration;
export const userStatus = state => state.user.status;

export default userSlice.reducer;
