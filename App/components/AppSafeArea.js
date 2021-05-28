import React from 'react';
import {StyleSheet, Text, StatusBar, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {fonts, height, width} from '../config/globalStyles';

export const AppSafeArea = ({size = width * 9, style, children, ...props}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children && children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 25 : 0, 
  },
});
