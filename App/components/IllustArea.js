import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {width, height} from '../config/globalStyles';

export const IllustrArea = ({style, imageSource, ...props}) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={imageSource} style={styles.illust} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  illust: {
    width: width * 400,
  },
});
