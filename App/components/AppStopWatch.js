import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

import MyIcon from '../config/Icon-font.js';

export const AppStopWatch = ({style, time, ...props}) => {
  const [minutes, setMinutes] = useState(Math.floor((time / 1000 / 60) % 60));
  const [seconds, setSeconds] = useState(Math.floor((time / 1000) % 60));
  console.log('time', time);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <View style={styles.stopWatchView}>
      <View style={styles.parkingDot} />
      <Text style={styles.stopWatchText}>5분 예약 자리</Text>
      <MyIcon name={'alarm-1'} size={width * 19} color={colors.primary} />
      <Text style={styles.stopWatchTime}>
        {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parkingDot: {
    width: width * 15,
    height: height * 15,
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
  stopWatchView: {
    position: 'absolute',
    bottom: height * 80,
    right: width * 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    textAlign: 'center',
    fontSize: width * 16,
    color: colors.primary,
    fontWeight: '700',
  },
});
