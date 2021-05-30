// 앱의 상하 좌우 호환성을 위한 safearea 컴포넌트
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {width} from '../config/globalStyles';

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
    // paddingTop: Platform.OS === 'android' ? 25 : 0, //노치디자인을 고려한 처리. 그러나 safearea의 속성이 업그레이드 된 것인지 오히려 부작용을 일으켜서 일단 주석처리
  },
});
