import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const AppMenu = ({
  disable,
  style,
  onPress,
  children,
  leftIcon,
  ...props
}) => {
  return (
    <View style={styles.menuView}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.menuText}>{children && children}</Text>
      </TouchableOpacity>
      <View>{leftIcon && leftIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuView: {
    paddingHorizontal: width * 10,
    paddingVertical: width * 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.borderGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    color: colors.black,
    fontSize: width * 14,
    fontWeight: '600',
  },
});
