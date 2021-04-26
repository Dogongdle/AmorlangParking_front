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
    return response.data;
  },
);

export const parkingSlice = createSlice({
  name: 'user',
  initialState: {
    AsectorData: [],
    BsectorData: [],
    CsectorData: [],
    DsectorData: [],
  },

  reducers: {},
  extraReducers: {
    [getParkingData.fulfilled]: (state, action) => {
      state.AsectorData = action.payload;
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

export default parkingSlice.reducer;
