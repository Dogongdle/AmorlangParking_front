//일단 보류 redux를 굳이 사용해야하는가? 애매한 상황

import {createSlice} from '@reduxjs/toolkit';

export const pushSlice = createSlice({
  name: 'push',
  initialState: {
    pushList: [],
  },

  reducers: {
    addPushList: (state, payload) => {
      state.pushList.push({
        body: '아몰랑파킹입니다.',
        ios: {badge: 0},
        title: '아몰랑파킹',
      });
    },
  },
});
export const {addPushList} = pushSlice.actions; //액션들을 익스포트

export const selectPushList = state => state.push.pushList;

export default pushSlice.reducer;
