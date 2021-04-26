import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

//custom imports
import {colors, width, height} from '../config/globalStyles';
import {UIActivityIndicator} from 'react-native-indicators';

const LoadingModal = ({...props}) => {
  return (
    <>
      <View style={styles.splashContainer}>
        <UIActivityIndicator color={colors.primary} size={40} />
      </View>
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  splashContainer: {
    width: width * 130,
    height: width * 130,
    borderRadius: 7,
    backgroundColor: colors.white,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
