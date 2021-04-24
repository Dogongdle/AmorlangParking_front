import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {PulseIndicator} from 'react-native-indicators';
import {colors, height} from '../config/globalStyles';
const LoadingScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.SafeContainer}>
      <View style={styles.ScreenContainer}>
        <PulseIndicator color={colors.primary} size={50} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  SafeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: height * 550,
  },
});
