import React from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import parkingAPI from '../api/parking';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, selectToken} from '../reducer/userSlice';
import {
  selectSeat,
  selectSeatNumber,
  selectSeatSector,
} from '../reducer/parkingSlice';

export const ParkingSeat = ({
  style,
  enable,
  sector,
  onPress,
  children,
  seatNumber,
  reserved,
  reservedUser,
  ...props
}) => {
  const dispatch = useDispatch();
  const reserveSeatNumber = useSelector(selectSeatNumber);
  const reserveSeatSector = useSelector(selectSeatSector);

  const onSelect = () => {
    dispatch(selectSeat({sector: sector, number: seatNumber}));
  };

  return (
    <TouchableOpacity
      disabled={enable == true ? false : true}
      style={[
        styles.parkingSeatView,
        {
          backgroundColor:
            reservedUser == true
              ? colors.primary
              : enable == true || (enable == true && reserved == false)
              ? colors.darkBlue
              : colors.lightGrey,
        },
        seatNumber % 2 == !0 && {marginTop: width * 30},
      ]}
      onPress={(onPress, onSelect)}
      onPress={() => {
        onPress();
        onSelect();
      }}
    />
  );
};

const styles = StyleSheet.create({
  parkingSeatView: {
    width: width * 40,
    height: height * 20,

    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderGrey,
  },
});
