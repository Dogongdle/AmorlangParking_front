import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Switch} from 'react-native';
import {ActionSheet} from 'native-base';
import {durationOptions} from '../config/globalArray';
import MyIcon from '../config/Icon-font.js';
import {useSelector, useDispatch} from 'react-redux';
import {setDuration, selectDuration} from '../reducer/userSlice';

//custom imports
import {colors, width, height} from '../config/globalStyles';

const DurationSelect = ({...props}) => {
  const initialDuration = useSelector(selectDuration);

  const [duration, setClientDuration] = useState(initialDuration / 1000 + '초');
  // console.log('잘넘어오나?', duration);
  const dispatch = useDispatch();
  const options = durationOptions;
  const cancelIndex = 3;
  const viewActionSheet = () => {
    ActionSheet.show(
      {
        options: options,
        cancelButtonIndex: cancelIndex,
        title: '주차장 새로고침 주기 설정',
      },
      async buttonIndex => {
        const parseDuration = options[buttonIndex].substring(
          0,
          options[buttonIndex].length - 1,
        );

        if (buttonIndex < 3) {
          dispatch(setDuration(parseDuration));
          setClientDuration(options[buttonIndex]);
        }
      },
    );
  };

  return (
    <View style={styles.durationSelectView}>
      <Text style={styles.durationTitle}>주차장 정보 업데이트 주기</Text>
      <TouchableOpacity onPress={viewActionSheet} style={styles.durationMenu}>
        <Text style={styles.durationText}>{duration}</Text>
        <MyIcon
          name={'alarm-4'}
          size={width * 9}
          style={[
            {
              transform: [{rotate: '180deg'}],
            },
          ]}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DurationSelect;

const styles = StyleSheet.create({
  durationSelectView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 10,
    height: height * 70,
  },
  durationTitle: {
    fontSize: width * 14,
  },
  durationMenu: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    width: width * 138,
    padding: width * 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  durationText: {
    fontSize: width * 13,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
