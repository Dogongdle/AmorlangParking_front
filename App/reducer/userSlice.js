import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import parkingAPI from '../api/parking';

// export const reserveSeat = createAsyncThunk(
//   'parking/getParkingData',
//   async payload => {
//     const response = await parkingAPI.reserveSeat(
//       payload.token,
//       payload.sector,
//       payload.number,
//     );
//     console.log('야된다', response);
//     if (response.status != 200) throw Error(response.data);
//     return;
//   },
// );

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loggedIn: false,
    reserving: null,
    reservingSeat: null,
    duration: 10000,
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
      console.log(state.user);
    },
    register: (state, action) => {
      state.user.apart = action.payload;
    },
    reserve: (state, action) => {
      state.reserving = true;
      AsyncStorage.setItem('reserving', 'true');
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
      AsyncStorage.setItem('Duration', JSON.stringify(action.payload));
    },
    // extraReducers: {
    //   [reserveSeat.fulfilled]: (state, action) => {
    //     state.reserving = true;
    //   },
    //   [reserveSeat.rejected]: (state, action) => {
    //     state.status = false;
    //     alert('데이터를 받아오던 중 문제가 발생하였습니다.');
    //   },
    // },
  },
});
export const {
  login,
  setUser,
  logout,
  register,
  reserve,
  setDuration,
} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
export const selectReserving = state => state.user.reserving;
export const selectDuration = state => state.user.duration;

export default userSlice.reducer;
