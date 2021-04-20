import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {width} from '../config/globalStyles';

export const AppSafeArea = ({size = width * 9, style, children, ...props}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar backgroundColor="#61dafb" />
      {children && children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
