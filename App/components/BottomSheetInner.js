import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';
import {TimeSetting} from './TimeSetting';

export const BottomSheetInner = ({
  disable,
  style,
  onPress,
  children,
  ...props
}) => {
  return (
    <View style={styles.bottomSheetView}>
      <View style={styles.renderHeader}>
        <MyIcon name={'alarm'} size={width * 15} color={colors.primary} />
        <View style={styles.headerTextView}>
          <Text style={styles.headerTitle}>자리가 없나요?</Text>
          <Text style={styles.headerText}>이중 주차 가능 장소 물색하기</Text>
        </View>
      </View>
      <View style={styles.renderBody}>
        <TimeSetting title="이중주차 시작 시간" />
        <TimeSetting title="예정 출차 시간" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: width * 16,
    height: height * 500,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    elevation: 5,
  },
  renderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextView: {
    marginLeft: width * 20,
  },
  headerTitle: {
    fontSize: width * 18,
    fontWeight: '600',
  },
  headerText: {
    fontSize: width * 12,
    color: colors.grey,
  },
  renderBody: {
    marginTop: height * 30,
  },
});
