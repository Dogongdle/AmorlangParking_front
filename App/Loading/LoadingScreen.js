import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
import {colors, height, width} from '../config/globalStyles';
import {logout, selectUser} from '../reducer/userSlice';
const LoadingScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <SafeAreaView style={styles.SafeContainer}>
      <View style={styles.ScreenContainer}>
        <UIActivityIndicator color={colors.primary} size={width * 50} />
        <TouchableOpacity onPress={handleLogout}>
          <Text>dd</Text>
        </TouchableOpacity>
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
