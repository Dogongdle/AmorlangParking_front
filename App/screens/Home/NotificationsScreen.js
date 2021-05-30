// 알림 리스트 페이지
import React, {useEffect, useState} from 'react';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors, height} from '../../config/globalStyles';
import Notification from '../../components/Notification';
import parkingAPI from '../../api/push';
import {selectToken} from '../../reducer/userSlice';
import {selectPushList} from '../../reducer/pushSlice';
import {useSelector} from 'react-redux';
import PushListHeader from '../../components/PushListHeader';
import {ScrollView, RefreshControl} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const NotificationsScreen = ({navigation}) => {
  const token = useSelector(selectToken);
  const pushList = useSelector(selectPushList);
  const [zzimSeat, setZzimSeat] = useState([]);
  const [zzimNumber, setZzimNumber] = useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    //새로고침. 리스트에는 새로고침 기능이 있는 것이 당연하다고 생각하여 작성하였다.
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  console.log(pushList);

  useEffect(async () => {
    const response = await parkingAPI.getZzimSeat(token); //본인이 예약한 자리를 받아온다.
    // console.log(response.data);
    if (response.data.length > 0) {
      setZzimNumber(response.data[response.data.length - 1].seat);
      if (response.data[0].sector == 'a' || 'b' || 'c') setZzimSeat('지하 1층'); //sector별로 층을 표기하기 위해 조건문을 사용
      else if (response.data[0].sector == 'd' || 'e' || 'f')
        setZzimSeat('지하 2층');
      else if (response.data[0].sector == 'g' || 'h' || 'i')
        setZzimSeat('지하 3층');
    }
  }, [pushList]); //전역 변수인 pushlist에 변동 요소가 생길 경우 자동으로 컴포넌트가 업데이트 된다. 실시간으로 동작하게끔 구연하였다.

  return (
    <AppSafeArea>
      <AppHeader
        leftTitle={
          <MyIcon
            name={'alarm-4'}
            size={width * 10}
            color={colors.white}
            style={{
              transform: [{rotate: '270deg'}],
            }}
          />
        }
        onPressLeft={() => navigation.goBack()}
        title="알림"
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {zzimSeat.length > 0 ? (
          <PushListHeader zzimNumber={zzimNumber} zzimSeat={zzimSeat} />
        ) : (
          <PushListHeader empty={true} />
        )}

        {pushList &&
          pushList.map((item, index) => (
            <Notification content={item.body} key={index} index={index} />
          ))}
      </ScrollView>
    </AppSafeArea>
  );
};

export default NotificationsScreen;
