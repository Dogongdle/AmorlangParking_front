import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';
import {TimeSetting} from './TimeSetting';
import Collapsible from 'react-native-collapsible';
import {TimePicker} from 'react-native-simple-time-picker';
import {UIActivityIndicator} from 'react-native-indicators';
import {CompleteView} from './CompleteView';
export const BottomSheetInner = ({
  disable,
  style,
  onPress,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [startCollapsed, setStartCollapsed] = useState(true);
  const [endCollapsed, setEndCollapsed] = useState(true);
  const [startHours, setStartHours] = React.useState(null);
  const [endHours, setEndHours] = React.useState(null);
  const handleStartChange = (value: {hours: number}) => {
    setStartHours(value.hours);
  };
  const handleEndChange = (value: {hours: number}) => {
    setEndHours(value.hours);
  };

  useEffect(() => {
    if (startHours && endHours) {
      setLoading(true);
      setEndCollapsed(true);
      setTimeout(async () => {
        await setLoading(false);
        setComplete(true);
      }, 5000);
    }
  }, [startHours, endHours]);

  return (
    <View style={styles.bottomSheetView}>
      <View style={styles.renderHeader}>
        <MyIcon name={'alarm'} size={width * 23} color={colors.primary} />
        <View style={styles.headerTextView}>
          <Text style={styles.headerTitle}>자리가 없나요?</Text>
          <Text style={styles.headerText}>이중 주차 가능 장소 물색하기</Text>
        </View>
      </View>
      <View style={styles.renderBody}>
        <TimeSetting
          title="이중주차 시작 시간"
          onPress={() => setStartCollapsed(!startCollapsed)}
          hour={startHours}
        />
        <Collapsible collapsed={startCollapsed}>
          <View>
            <TimePicker
              value={startHours}
              onChange={handleStartChange}
              hoursUnit="시 00분"
              pickerShows="hours"
            />
          </View>
        </Collapsible>
        <TimeSetting
          title="예정 출차 시간"
          onPress={() => {
            setEndCollapsed(!endCollapsed), setStartCollapsed(true);
          }}
          hour={endHours}
        />
        <Collapsible collapsed={endCollapsed}>
          <TimePicker
            value={endHours}
            onChange={handleEndChange}
            hoursUnit="시 00분"
            pickerShows="hours"
          />
        </Collapsible>
        {loading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 130,
            }}>
            <Text style={styles.loadingText}>이중 주차 가능 자리 탐색중</Text>
            <UIActivityIndicator
              style={{marginTop: height * 40}}
              color={colors.primary}
              size={40}
            />
          </View>
        )}
        {complete && <CompleteView />}
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
  loadingText: {
    fontSize: width * 10,
    color: colors.primary,
  },
});
