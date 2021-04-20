import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {width, height, colors} from '../config/globalStyles';

export const AppHeader = ({
  size = width * 9,
  style,
  children,
  title,
  ...props
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}></View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}></View>
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
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
  },
  headerTitle: {
    fontSize: width * 17,
    fontWeight: '700',
    color: colors.white,
  },
});
