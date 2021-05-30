// 이중 주차 세팅에서 시간을 설정할 때 사용하는 컴포넌트. 각자 영향을 주지 않기 위해 useMemo를 사용한 최적화를 진행하였다.
import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//custom imports
import {colors, width} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';
import Moment from 'moment';

export const TimeSetting = React.memo(
  ({title, children, onPress, hour, ...props}) => {
    const CurrentDate = Moment().format();

    const getHour = hour => {
      return hour;
    };

    const formatHour = useMemo(() => getHour(hour), [hour]);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.settingView}>
        <Text style={styles.settingText}>{title && title}</Text>
        <Text style={styles.timeText}>
          {Moment(CurrentDate).format('YYYY.MM.DD')}
          {'      '} {formatHour && <Text>{formatHour}시 00분</Text>}
        </Text>
        <MyIcon
          name={'alarm-4'}
          style={[
            {
              transform: [{rotate: '180deg'}],
            },
          ]}
          size={width * 7}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  settingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.borderGrey,
  },
  settingText: {
    fontSize: width * 15,
    fontWeight: '500',

    flex: 3,
  },
  timeText: {
    fontSize: width * 11,
    fontWeight: '600',
    flex: 3,
    color: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
