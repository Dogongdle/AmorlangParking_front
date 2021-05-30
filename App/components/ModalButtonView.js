// 주차장 자리를 클릭할 시 나오는 화면의 컴포넌트. 이를 모달로 처리하였기에 이러한 네이밍을 함.
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from 'react-native-reanimated';
//custom imports
import {colors, height, width} from '../config/globalStyles';

import {ModalButton} from './ModalButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectToken,
  getReserveData,
  reserve,
  selectUser,
} from '../reducer/userSlice';
import {startLoading, endLoading} from '../reducer/loadingSlice';
import parkingAPI from '../api/parking';

import {
  selectSeatSector,
  selectSeatNumber,
  setTime,
} from '../reducer/parkingSlice';

export const ModalButtonView = ({
  onPress,
  setRefreshCount,
  setVisibleModal,
}) => {
  const token = useSelector(selectToken);
  const sector = useSelector(selectSeatSector);
  const number = useSelector(selectSeatNumber);
  const user = useSelector(selectUser);

  // const reserveSeat = useSelector(reserveSeat);
  const dispatch = useDispatch();
  let reserveEndTime = new Date().getTime() + 300000;

  const fiveReserve = async () => {
    const response = await parkingAPI.reserveSeat(token, sector, number);
    if (response.status === 200) {
      dispatch(setTime({time: JSON.stringify(reserveEndTime)}));

      setRefreshCount(prev => prev + 1);

      setVisibleModal(false);

      // dispatch(startLoading());
      // setTimeout(async () => {
      //   dispatch(endLoading());
      // }, 3000);
      // dispatch(startLoading);
    }
  };

  const zzimSeat = async () => {
    const response = await parkingAPI.registerPush(token, sector, number);
    console.log(response);
    if (response.status === 200) {
      setRefreshCount(prev => prev + 1);
      setVisibleModal(false);
    }
  };

  return (
    <View style={styles.modalButtonView}>
      {user.reserved == true ? null : (
        <ModalButton
          icon="alarm-1"
          size={18}
          onPress={fiveReserve}
          color={colors.primary}
          title="5분 예약하기"
          style={{marginRight: width * 5}}
        />
      )}
      <ModalButton
        icon="alarm-2"
        size={14}
        onPress={zzimSeat}
        color={colors.red}
        style={{marginRight: width * 5}}
        title="찜하기"
      />
      <ModalButton
        icon="alarm-6"
        size={20}
        color={colors.primary}
        style={{width: width * 50, height: width * 50}}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonView: {
    position: 'absolute',
    bottom: height * 140,
    right: width * 20,
    alignItems: 'center',
  },
});
