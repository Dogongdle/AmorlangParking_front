// 알림 리스트 화면에서 각 알림의 컴포넌트. swipeout을 사용하여, UI/UX 적인 발전을 이루었다.
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';

//custom imports
import {colors, width, height} from '../config/globalStyles';

import MyIcon from '../config/Icon-font.js';
import {deletePushList} from '../reducer/pushSlice';
import {useDispatch} from 'react-redux';

const Notification = ({content, title, index, ...props}) => {
  const dispatch = useDispatch();
  const swipeoutBtns = [
    {
      text: '삭제',
      backgroundColor: colors.red,
      onPress: () => dispatch(deletePushList(index)),  //알림 삭제
    },
  ];

  return (
    <Swipeout right={swipeoutBtns}>
      <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.notification}>
          <View style={styles.notificationBody}>
            <MyIcon
              name={'alarm-3'}
              size={width * 25}
              color={colors.borderGrey}
            />
            <Text style={styles.notificationContent}>{content}</Text>
          </View>
          <Text style={styles.notificationTime}>방금 전</Text>
        </TouchableOpacity>
      </View>
    </Swipeout>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notification: {
    width: '100%',
    height: height * 70,
    backgroundColor: colors.bottomTabBarBackgroundColor,
    padding: width * 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContent: {
    marginLeft: width * 10,
    fontSize: width * 13,
  },
  notificationTime: {
    fontSize: width * 11,
    color: colors.grey,
  },
});
