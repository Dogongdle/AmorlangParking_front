// 회원가입 프로세스에서 보여지는 일러스트들의 컴포넌트, 스크린의 무게를 좀 줄여주기 위해 사용함
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
