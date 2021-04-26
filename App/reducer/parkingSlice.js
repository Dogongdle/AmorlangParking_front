import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import parkingAPI from '../api/parking';

export const getParkingData = createAsyncThunk(
  'parking/getParkingData',
  async payload => {
    const response = await parkingAPI.getParkingData(
      payload.token,
      payload.sector,
    );
    if (response.status != 200) throw Error(response.data);
    return {sector: payload.sector, data: response.data};
  },
);

export const parkingSlice = createSlice({
  name: 'user',
  initialState: {
    AsectorData: [],
    BsectorData: [],
    CsectorData: [],
    DsectorData: [],
    status: null,
  },

  reducers: {},
  extraReducers: {
    [getParkingData.fulfilled]: (state, action) => {
      switch (action.payload.sector) {
        case 'a_sector':
          state.AsectorData = action.payload.data;
          break;
        case 'b_sector':
          state.BsectorData = action.payload.data;
          break;
        case 'c_sector':
          state.CsectorData = action.payload.data;
          break;
        case 'd_sector':
          state.DsectorData = action.payload.data;
          break;
      }
      state.status = 'success';
    },
    [getParkingData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getParkingData.rejected]: (state, action) => {
      state.status = 'failed';
      alert('데이터를 받아오던 중 문제가 발생하였습니다.');
    },
  },
});

export const selectParkingA = state => state.parking.AsectorData;
export const selectParkingB = state => state.parking.BsectorData;
export const selectParkingC = state => state.parking.CsectorData;
export const selectParkingD = state => state.parking.DsectorData;
export const parkingStatus = state => state.parking.status;

export default parkingSlice.reducer;
