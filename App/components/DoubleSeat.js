import React from 'react';
import {StyleSheet, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const DoubleSeat = ({style, positionLeft, positionTop, ...props}) => {
  return (
    <View style={[styles.doubleSeat, {top: positionTop, left: positionLeft}]} />
  );
};

const styles = StyleSheet.create({
  doubleSeat: {
    position: 'absolute',
    backgroundColor: colors.yellow,
    width: height * 20,
    height: width * 40,
  },
});
