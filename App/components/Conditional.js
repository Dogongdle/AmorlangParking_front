import React from 'react';
import {Badge} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {height, width} from '../config/globalStyles';
import {AppStopWatch} from './AppStopWatch';
import {StateArea} from './StateArea';

// const pushList = useSelector(selectPushList);
const Conditional = ({condition, time, visible}) => (
  <>
    {condition == true ? (
      <AppStopWatch time={time} />
    ) : (
      <StateArea visible={visible} />
    )}
  </>
);

export default Conditional;
