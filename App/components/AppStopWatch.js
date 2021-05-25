import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import CountDown from 'react-native-countdown-component';
import MyIcon from '../config/Icon-font.js';
export const AppStopWatch = React.memo(({style, hour, minute, ...props}) => {
  return (
    <View style={styles.stopWatchView}>
      <View
        style={{
          width: width * 15,
          height: height * 15,
          borderRadius: 50,
          backgroundColor: colors.primary,
        }}
      />
      <Text style={styles.stopWatchText}>5분 예약 자리</Text>

      <MyIcon name={'alarm-1'} size={width * 19} color={colors.primary} />
      <Text style={styles.stopWatchTime}>
        ~ {hour}:{minute}
      </Text>
      {/* <CountDown
        size={width * 15}
        until={300}
        onFinish={() => alert('Finished')}
        digitStyle={{}}
        digitTxtStyle={{color: colors.primary}}
        separatorStyle={{color: colors.primary}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  stopWatchView: {
    position: 'absolute',
    bottom: height * 80,
    right: width * 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 10,
    paddingVertical: height * 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
    width: width * 250,
  },
  stopWatchText: {
    fontSize: width * 13,
    fontWeight: '600',
  },
  stopWatchTime: {
    fontSize: width * 16,
    color: colors.primary,
    fontWeight: '700',
  },
});
