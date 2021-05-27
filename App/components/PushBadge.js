import React from 'react';
import {Badge} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {height, width} from '../config/globalStyles';

// const pushList = useSelector(selectPushList);
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
