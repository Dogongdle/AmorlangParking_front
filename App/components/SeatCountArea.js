import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const SeatCountArea = ({
  totalSeatCount,
  enableSeatCount,
  style,
  children,
  ...props
}) => {
  return (
    <>
      <View style={[styles.indicator, style]}>
        <View style={styles.stateItem}>
          <Text style={styles.title}>주차 공간</Text>
          <Text style={styles.count}>
            {totalSeatCount}
            <Text> 대</Text>
          </Text>
        </View>
        <View style={styles.stateItem}>
          <Text style={styles.title}>사용 가능</Text>
          <Text style={styles.count}>
            {enableSeatCount}
            <Text> 대</Text>
          </Text>
        </View>
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
    width: width * 120,
    height: height * 90,

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
  stateItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: width * 15,
    height: height * 15,
    borderRadius: 50,
  },
  title: {
    fontWeight: '600',
    fontSize: width * 12,
  },
  count: {
    color: colors.primary,
    fontWeight: '600',
  },
});
