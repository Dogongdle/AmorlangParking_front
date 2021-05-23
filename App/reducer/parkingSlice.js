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
    status: 'success',
    selectSeatNumber: null,
    selectSeatSector: null,
  },

  reducers: {
    selectSeat: (state, action) => {
      state.selectSeatNumber = action.payload.number;
      state.selectSeatSector = action.payload.sector;
      // AsyncStorage.multiSet(
      //   ['seatNumber', action.payload.number],
      //   ['seatSector', action.payload.number],
      // );
    },
    clearSeat: state => {
      state.selectSeatNumber = null;
      state.selectSeatSector = null;
    },
    clearData: state => {
      state.AsectorData = [];
      state.BsectorData = [];
      state.CsectorData = [];
      state.DsectorData = [];
    },
  },
  extraReducers: {
    [getParkingData.fulfilled]: (state, action) => {
      switch (action.payload.sector) {
        case 'a':
          state.AsectorData = action.payload.data;
          break;
        case 'b':
          state.BsectorData = action.payload.data;
          break;
        case 'c':
          state.CsectorData = action.payload.data;
          break;
        case 'd':
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
export const {selectSeat, clearSeat, clearData} = parkingSlice.actions;
export const selectSeatNumber = state => state.parking.selectSeatNumber;
export const selectSeatSector = state => state.parking.selectSeatSector;

export default parkingSlice.reducer;
