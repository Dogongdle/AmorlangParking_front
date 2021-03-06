// 푸시 알림 설정 스크린의 스위치 컴포넌트
import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';

//custom imports
import {colors, width, height} from '../config/globalStyles';

const PushSwitch = React.memo(
  ({title, subtitle, status, setStatus, changeStatus}) => {
    const toggleSwitch = async () => {
      setStatus();
      changeStatus();
    };
    return (
      <View style={styles.pushSwitchView}>
        <View style={styles.pushSwitchText}>
          <Text style={styles.switchTitle}>{title}</Text>
          <Text style={styles.switchSubTitle}>{subtitle}</Text>
        </View>
        <Switch
          trackColor={{false: colors.white, true: colors.primary}}
          thumbColor={colors.white}
          ios_backgroundColor={colors.borderGrey}
          onValueChange={toggleSwitch}
          value={status}
        />
      </View>
    );
  },
);

export default PushSwitch;

const styles = StyleSheet.create({
  pushSwitchView: {
    width: '100%',
    padding: width * 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: height * 70,
  },
  pushSwitchText: {
    justifyContent: 'center',
  },
  switchTitle: {
    fontSize: width * 14,
    lineHeight: height * 25,
  },
  switchSubTitle: {
    fontSize: width * 11,
    color: colors.secondaryGrey,
  },
});
