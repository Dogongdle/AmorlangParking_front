import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {width, height, colors} from '../config/globalStyles';

export const AppHeader = ({
  size = width * 9,
  style,
  children,
  leftTitle,
  rightTitle,
  onPressLeft,
  onPressRight,
  title,
  ...props
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onPressLeft}>
          <Text style={styles.leftTitle}>{leftTitle && leftTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onPressRight}>
          <Text style={styles.leftTitle}>{rightTitle && rightTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 50,
    backgroundColor: colors.primary,
    marginBottom: height * 10,
    flexDirection: 'row',
    alignItems: 'center',

    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'center',
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: width * 17,
    fontWeight: '700',
    color: colors.white,
  },
  leftTitle: {
    fontSize: width * 14,
    fontWeight: '500',
    color: colors.white,
  },
});
