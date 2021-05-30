//로딩 스크린. 로그인 이후에 유저의 정보를 받아올 때 보여진다.
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UIActivityIndicator} from 'react-native-indicators';
import {colors, height, width} from '../config/globalStyles';
const LoadingScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.SafeContainer}>
      <View style={styles.ScreenContainer}>
        <UIActivityIndicator color={colors.primary} size={width * 50} />
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
