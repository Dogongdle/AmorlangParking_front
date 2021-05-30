// 서비스가 현재 로딩 상태인가를 파악하기 위한 redux-slice
import {createSlice} from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: true, //로딩 상태
  },

  reducers: {
    endLoading: state => {
      state.loading = false;
    },
    startLoading: state => {
      state.loading = true;
    },
  },
});
export const {endLoading, startLoading} = loadingSlice.actions;

export const selectLoading = state => state.loading.loading;

export default loadingSlice.reducer;
