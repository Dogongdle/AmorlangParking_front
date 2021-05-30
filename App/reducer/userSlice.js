//가장 어려웠던 부분. 기본적인 유저의 로그인/회원가입 프로세스, 유저 정보부터 토큰 그리고 렌더링 시간까지 깔끔하게 관리하기 위해 선택하였다. 좋은 선택이었다고 생각한다.
//user redux-slice
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
    user: null, //유저 정보가 모두 담기는 변수
    loggedIn: false,
    reserving: null,
    reservingSeat: null,
    duration: 10000,
    time: null,
    status: 'success',
  },

  reducers: {
    login: (state, action) => {
      //로그인
      console.log('token', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token); //로그인을 할 시에는 토큰을 로컬에 저장해준다. 만약 전역변수로만 관리한다? 앱을 껐다켰을 때 상태유지가 되지 않기 때문.
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: state => {
      //로그아웃
      AsyncStorage.removeItem('userToken'); // 로그아웃을 할 시에는 당연히 token을 삭제해준다.
      state.reserving = null;
      state.loggedIn = false;
    },
    setUser: (state, action) => {
      //유저 정보를 세팅한다.
      state.user = action.payload;
      console.log('유저세팅', state.user);
    },
    register: (state, action) => {
      //회원가입
      state.user.apart = action.payload;
    },
    reserve: (state, action) => {
      //5분 예약. 원래는 프론트에서 모든 걸 처리했지만, 5/23일 이후로는 백에서 같이 관리하므로 사용하지 않는다. 만약 모를 상황을 대비하여 삭제하지 않음.
      state.user.reserved = true;
      AsyncStorage.setItem('reserving', 'true');
    },
    setDuration: (state, action) => {
      // 유저가 커스텀하는 자동 렌더링을 담기 위한 함수 , JavaScript의 참 요상한 자료형으로 인해 많은 어려움을 겪었다.
      // console.log('reducer에서 어떻게받지?', action.payload);
      state.duration = action.payload * 1000;
      AsyncStorage.setItem('Duration', action.payload);
    },
    clearReserve: state => {
      //최적화를 위함
      state.user.reserved = null;
    },
  },
  extraReducers: {
    [getReserveData.fulfilled]: (state, action) => {
      state.user.reserved = action.payload;
      state.status = 'success';
      console.log('예약상태', action.payload);
    },
    [getReserveData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getReserveData.rejected]: (state, action) => {
      state.status = 'failed';
      alert('데이터를 받아오던 중 문제가 발생하였습니다.'); //만약 이 메시지를 받는다면 무조건 서버가 꺼져있는 것.
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
