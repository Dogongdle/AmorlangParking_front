import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const ParkingSeat = ({style, enable, onPress, children, ...props}) => {
  console.log(props.seatNumber);
  return (
    <TouchableOpacity
      style={[
        styles.parkingSeatView,
        enable == true
          ? {backgroundColor: colors.darkBlue}
          : {
              backgroundColor: colors.lightGrey,
            },
        props.seatNumber == 8 && {marginTop: width * 30},
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  parkingSeatView: {
    width: width * 50,
    height: height * 25,

    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.borderGrey,
  },
});
