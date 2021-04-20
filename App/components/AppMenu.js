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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuView}>
        <Text style={styles.menuText}>{children && children}</Text>
        <View>{leftIcon && leftIcon}</View>
      </View>
    </TouchableOpacity>
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
    color: colors.grey,
    fontSize: width * 14,
    fontWeight: '600',
  },
});
