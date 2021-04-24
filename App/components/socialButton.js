import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const SocialButton = ({disable, style, onPress, children, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.socialButton, {backgroundColor: props.color}, style]}
      disabled={disable}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    width: height * 50,
    height: height * 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
