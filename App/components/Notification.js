import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';

//custom imports
import {colors, width, height} from '../config/globalStyles';

import MyIcon from '../config/Icon-font.js';

const Notification = ({...props}) => {
  const swipeoutBtns = [
    {
      text: '삭제',
      backgroundColor: colors.red,
    },
  ];

  return (
    <Swipeout right={swipeoutBtns}>
      <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.notification}>
          <View style={styles.notificationBody}>
            <MyIcon name={'alarm-3'} size={width * 25} color={colors.red} />
            <Text style={styles.notificationContent}>
              회원님이 찜한 주차공간 자리가 비었습니다.
            </Text>
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
