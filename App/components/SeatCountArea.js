// 주차장 자리 수를 알려주는 사각형 컴포넌트
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import {SeatCount} from './SeatCount';

export const SeatCountArea = ({
  totalSeatCount,
  enableSeatCount,
  enableSeatCount2,
  enableSeatCount3,
  style,
  children,
  ...props
}) => {
  return (
    <>
      <View style={[styles.indicator, style]}>
        <Text
          style={{
            fontSize: width * 15,
            color: colors.black,
            marginBottom: height * 10,
            fontWeight: 'bold',
          }}>
          주차 가능 자리
        </Text>
        <SeatCount title="B1" count={enableSeatCount} />
        <SeatCount title="B2" count={enableSeatCount2} />
        <SeatCount title="B3" count={enableSeatCount3} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: height * 130,
    right: width * 20,
    backgroundColor: colors.white,
    paddingHorizontal: width * 15,
    paddingVertical: height * 10,
    width: width * 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
  },
  circle: {
    width: width * 15,
    height: height * 15,
    borderRadius: 50,
  },
});
