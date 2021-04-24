import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const AppTag = ({disable, style, onPress, children, ...props}) => {
  return (
    <View style={styles.tagView}>
      <Text style={styles.tagText}>{children && children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagView: {
    paddingHorizontal: width * 6,
    paddingVertical: width * 3,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginLeft: width * 13,
    borderRadius: 10,
  },
  tagText: {
    color: colors.primary,
    fontSize: width * 14,
    fontWeight: '700',
  },
});
