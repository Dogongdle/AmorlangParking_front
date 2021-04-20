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
          <View style={{marginLeft: width * 17}}>{leftTitle && leftTitle}</View>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onPressRight}>
          <View style={{marginRight: width * 17}}>
            {rightTitle && rightTitle}
          </View>
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
    width: '100%',
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
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
