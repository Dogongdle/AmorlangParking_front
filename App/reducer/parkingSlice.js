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

export const getDoubleParkingData = createAsyncThunk(
  'parking/getDoubleParkingData',
  async payload => {
    const response = await parkingAPI.getDoubleParkingData(payload.token, 'A');
    if (response.status != 200) throw Error(response.data);
    return {sector: payload.sector, data: response.data};
  },
);

export const parkingSlice = createSlice({
  name: 'parking',
  initialState: {
    AsectorData: [],
    BsectorData: [],
    CsectorData: [],
    DsectorData: [],
    EsectorData: [],
    FsectorData: [],
    GsectorData: [],
    HsectorData: [],
    IsectorData: [],
    status: 'success',
    selectSeatNumber: null,
    selectSeatSector: null,
    enableSeat: [],
    enableSeat2: [],
    enableSeat3: [],
    totalSeat: [],
    endTime: null,
    doubleSeat: [],
  },

  reducers: {
    selectSeat: (state, action) => {
      state.selectSeatNumber = action.payload.number;
      state.selectSeatSector = action.payload.sector;
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
      // state.selectTotalSeat = 0;
    },
    setTime: (state, action) => {
      state.endTime = action.payload.time;
      AsyncStorage.setItem('reserveEndTime', action.payload.time);
    },
  },
  extraReducers: {
    [getParkingData.fulfilled]: (state, action) => {
      switch (action.payload.sector) {
        case 'a':
          state.AsectorData = action.payload.data;
          state.totalSeat[0] = action.payload.data.length;
          state.enableSeat[0] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'b':
          state.BsectorData = action.payload.data;
          state.totalSeat[1] = action.payload.data.length;
          state.enableSeat[1] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'c':
          state.CsectorData = action.payload.data;
          state.totalSeat[2] = action.payload.data.length;
          state.enableSeat[2] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'd':
          state.DsectorData = action.payload.data;
          state.totalSeat[3] = action.payload.data.length;
          state.enableSeat2[0] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'e':
          state.EsectorData = action.payload.data;
          state.totalSeat[4] = action.payload.data.length;
          state.enableSeat2[1] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'f':
          state.FsectorData = action.payload.data;
          state.totalSeat[5] = action.payload.data.length;
          state.enableSeat2[2] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'g':
          state.GsectorData = action.payload.data;
          state.totalSeat[6] = action.payload.data.length;
          state.enableSeat3[0] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'h':
          state.HsectorData = action.payload.data;
          state.totalSeat[7] = action.payload.data.length;
          state.enableSeat3[1] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
          break;
        case 'i':
          state.IsectorData = action.payload.data;
          state.totalSeat[8] = action.payload.data.length;
          state.enableSeat3[2] = action.payload.data.filter(
            item => item.enable == true,
          ).length;
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
    [getDoubleParkingData.fulfilled]: (state, action) => {
      state.doubleSeat = action.payload.data.filter(
        item => item.enable == true,
      );
    },
    // [getDoubleParkingData.fulfilled]: (state, action) => {
    //   console.log(action.payload.data);
    // },
    // [getDoubleParkingData.fulfilled]: (state, action) => {
    //   console.log(action.payload.data);
    // },
  },
});

export const selectParkingA = state => state.parking.AsectorData;
export const selectParkingB = state => state.parking.BsectorData;
export const selectParkingC = state => state.parking.CsectorData;
export const selectParkingD = state => state.parking.DsectorData;
export const selectParkingE = state => state.parking.EsectorData;
export const selectParkingF = state => state.parking.FsectorData;
export const selectParkingG = state => state.parking.GsectorData;
export const selectParkingH = state => state.parking.HsectorData;
export const selectParkingI = state => state.parking.IsectorData;
export const selectTotalSeat = state => state.parking.totalSeat;
export const selectEnableSeat = state => state.parking.enableSeat;
export const selectEnableSeat2 = state => state.parking.enableSeat2;
export const selectEnableSeat3 = state => state.parking.enableSeat3;
export const parkingStatus = state => state.parking.status;
export const {selectSeat, clearSeat, clearData, setTime} = parkingSlice.actions;
export const selectSeatNumber = state => state.parking.selectSeatNumber;
export const selectSeatSector = state => state.parking.selectSeatSector;
// export const selectEndHour = state => state.parking.endHour;
// export const selectEndMinute = state => state.parking.endMinute;
export const selectEndTime = state => state.parking.endTime;
export const selectDoubleSeat = state => state.parking.doubleSeat;

export default parkingSlice.reducer;
