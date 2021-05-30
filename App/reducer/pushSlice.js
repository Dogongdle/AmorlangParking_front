//일단 보류 redux를 굳이 사용해야하는가? 애매한 상황
//redux를 사용함으로써 보다 더 부드러운 알림 컨트롤이 가능해짐.
//push alarm 관련 redux-slice
import {createSlice} from '@reduxjs/toolkit';

export const pushSlice = createSlice({
  name: 'push',
  initialState: {
    pushList: [],
  },

  reducers: {
    addPushList: (state, action) => {
      // 알림 리스트에 추가. background와 foreground에서 알림을 받아오는 부분에 이를 사용하였다.
      state.pushList.push(action.payload);
    },
    deletePushList: (state, action) => {
      //알림 요소 삭제
      if (action.payload > -1) {
        state.pushList.splice(action.payload, 1);
      }
    },
  },
});
export const {addPushList, deletePushList} = pushSlice.actions; //액션들을 익스포트

export const selectPushList = state => state.push.pushList;

export default pushSlice.reducer;
