import {createSlice} from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: true,
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
export const {endLoading, startLoading} = loadingSlice.actions; //액션들을 익스포트

export const selectLoading = state => state.loading.loading;

export default loadingSlice.reducer;
