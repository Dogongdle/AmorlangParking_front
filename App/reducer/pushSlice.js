//일단 보류 redux를 굳이 사용해야하는가? 애매한 상황

import {createSlice} from '@reduxjs/toolkit';

export const pushSlice = createSlice({
  name: 'push',
  initialState: {
    pushList: [],
  },

  reducers: {
    addPushList: (state, action) => {
      state.pushList.push(action.payload);
    },
    // deletePushList: (state,action)=>{
    //   state.pushList.
    // }
  },
});
export const {addPushList} = pushSlice.actions; //액션들을 익스포트

export const selectPushList = state => state.push.pushList;

export default pushSlice.reducer;
