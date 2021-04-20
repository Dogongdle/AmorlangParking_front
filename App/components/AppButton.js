import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//custom imports
import {colors, height} from '../config/globalStyles';

export const AppButton = ({disable, style, onPress, children, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={
        disable ? [styles.disableButton, style] : [styles.submitButton, style]
      }
      disabled={disable}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 52,
  },
  disableButton: {
    backgroundColor: colors.secondaryGrey,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 52,
  },
});
