import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loggedIn: false,
    reserving: null,
  },

  reducers: {
    login: (state, action) => {
      console.log('token', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token);
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: state => {
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('deviceToken');
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
      state.user.reserving = true;
    },
  },
});
export const {login, setUser, logout, register, reserve} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
export const selectReserving = state => state.user.reserving;

export default userSlice.reducer;
