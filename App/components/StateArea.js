import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const StateArea = ({disable, style, onPress, children, ...props}) => {
  return (
    <>
      <View style={[styles.indicator, style]}>
        <View style={styles.stateItem}>
          <View
            style={[styles.circle, {backgroundColor: colors.darkBlue}]}></View>
          <Text>주차가능</Text>
        </View>
        <View style={styles.stateItem}>
          <View style={[styles.circle, {backgroundColor: '#f5f5f5'}]}></View>
          <Text>이용불가</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: height * 80,
    right: width * 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: width * 15,
    paddingVertical: height * 10,
    width: width * 188,
    alignItems: 'center',
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circle: {
    width: width * 15,
    height: height * 15,
    borderRadius: 50,
  },
});
