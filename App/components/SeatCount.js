import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const SeatCount = ({style, count, title, ...props}) => {
  return (
    <View style={styles.stateItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>
        {count}
        <Text> 대</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stateItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontWeight: '600',
    fontSize: width * 13,
    lineHeight: width * 20,
    color: colors.grey,
  },
  count: {
    color: colors.darkBlue,
    fontWeight: '600',
  },
});
