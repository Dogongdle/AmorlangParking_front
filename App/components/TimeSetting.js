import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';
import Moment from 'moment';

export const TimeSetting = ({title, children, ...props}) => {
  const CurrentDate = Moment().format();
  var now = new Date().getTime();

  return (
    <View style={styles.settingView}>
      <Text style={styles.settingText}>{title && title}</Text>
      <Text style={styles.timeText}>
        {Moment(CurrentDate).format('YYYY.MM.DD HH:MM')}
      </Text>
      <MyIcon
        name={'alarm-4'}
        style={[
          {
            transform: [{rotate: '180deg'}],
          },
        ]}
        size={width * 7}
        color={colors.black}
      />
    </View>
  );
};

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
    fontSize: width * 13,
    fontWeight: '300',

    flex: 3,
  },
  timeText: {
    fontSize: width * 11,
    fontWeight: '600',
    flex: 3,
  },
});
