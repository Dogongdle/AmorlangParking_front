// 푸시알림 badge 컴포넌트 , react-native-paper 모듈을 활용함.
import React from 'react';
import {Badge} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const PushBadge = ({count}) => <Badge style={styles.badge}>{count}</Badge>;

export default PushBadge;
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    zIndex: 999,
    top: -10,
    left: 5,
  },
});
