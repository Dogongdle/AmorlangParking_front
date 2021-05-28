import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//custom imports
import {colors, height, width, images} from '../config/globalStyles';
import {AppButton} from './AppButton';
import * as Animatable from 'react-native-animatable';

export const CompleteView = ({style, number, onPress, ...props}) => {
  return (
    <View style={styles.completeView}>
      <Text style={styles.completeViewTitle}>자리가 탐색되었습니다!!</Text>
      <Text style={styles.completeViewText}>
        지하 1층 주차장에 이중주차 가능 한 장소{' '}
        <Text style={styles.pointText}>{number} 곳</Text> 발견되었습니다.
      </Text>
      <Animatable.View
        animation="fadeInUp"
        delay={0}
        duration={2000}
        useNativeDriver>
        <AppButton
          disable={false}
          style={{marginTop: height * 60, borderRadius: 10}}
          onPress={onPress}>
          <Text style={styles.buttonText}>위치 확인하기</Text>
        </AppButton>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  completeView: {
    paddingVertical: height * 20,
    paddingHorizontal: width * 10,
  },
  completeViewTitle: {
    fontSize: width * 17,
    fontWeight: '700',
    color: colors.black,
  },
  completeViewText: {
    marginTop: height * 10,
    fontSize: width * 11,
    color: colors.grey,
  },
  pointText: {
    color: colors.primary,
    fontWeight: '700',
  },
  buttonText: {
    fontSize: width * 17,
    fontWeight: '600',
    color: '#fff',
  },
});
