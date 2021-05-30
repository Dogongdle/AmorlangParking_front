// 주차장 정보관련 전역변수를 관리하는 parkingSlice
// 다소 무거운 감이 없지않아 있지만, 주차장 현황 표기 및 자동 렌더링을 위해서는 이 정도가 최선의 선택이였다고 생각한다.
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //redux-middleware로는 thunk를 사용하였다. saga를 사용하고 싶었지만 빠르게 많은 코드를 구현하다보니 redux-toolkit에 내장되어있는 thunk를 사용할 수 밖에 없었다.
import AsyncStorage from '@react-native-community/async-storage';
import parkingAPI from '../api/parking';

export const getParkingData = createAsyncThunk(
  //주차장 정보를 받아오는 함수. await/async를 통한 비동기 처리를 하였다.
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
  //이중주차 정보를 받아오는 함수. await/async를 통한 비동기 처리를 하였다.
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
    AsectorData: [], //주차장 섹터별 데이터
    BsectorData: [],
    CsectorData: [],
    DsectorData: [],
    EsectorData: [],
    FsectorData: [],
    GsectorData: [],
    HsectorData: [],
    IsectorData: [],
    status: 'success', //정보 불러오기 상태
    selectSeatNumber: null,
    selectSeatSector: null,
    enableSeat: [], //각 층별 주차장 자리를 확보하기 위한 배열. 섹터별로 데이터의 개수를 담아두고 reducer를 사용하여 더해주기 위해 배열로 선언하였다.
    enableSeat2: [],
    enableSeat3: [],
    totalSeat: [],
    endTime: null,
    doubleSeat: [],
  },

  reducers: {
    selectSeat: (state, action) => {
      //자리를 클릭하는 이벤트
      state.selectSeatNumber = action.payload.number;
      state.selectSeatSector = action.payload.sector;
    },
    clearSeat: state => {
      //최적화를 위한 이벤트
      state.selectSeatNumber = null;
      state.selectSeatSector = null;
    },
    clearData: state => {
      //최적화를 위한 이벤트
      state.AsectorData = [];
      state.BsectorData = [];
      state.CsectorData = [];
      state.DsectorData = [];
    },
    setTime: (state, action) => {
      //5분 예약을 위한 아주 중요한 함수. 이를 처리하며 로컬에 예약시작시간으로부터 5분 뒤 시간이 책정되고 setInterval를 활용할 수 있게 된다.
      state.endTime = action.payload.time;
      AsyncStorage.setItem('reserveEndTime', action.payload.time);
    },
  },
  extraReducers: {
    //redux-middleware를 사용하기 위한 extra reducer
    [getParkingData.fulfilled]: (state, action) => {
      switch (
        action.payload.sector //switch 문을 사용한 것에 대해 조금 걱정이 되었지만 퍼포먼스 상 아무 문제가 없다고 판가름 났다. 되려 코드가 깔끔해져 보기 좋다.
      ) {
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
      } // 'A'~'C'=> 지하 1층 , 'D'~'F'=> 지하 2층, 'G'~'H'=> 지하 3층
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
