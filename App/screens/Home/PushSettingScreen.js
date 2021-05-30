//알림 설정 페이지
import React, {useEffect, useState} from 'react';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors} from '../../config/globalStyles';
import PushSwitch from '../../components/PushSwitch';
import parkingApi from '../../api/push';
import {selectToken} from '../../reducer/userSlice';
import {useSelector} from 'react-redux';
import DurationSelect from '../../components/DurationSelect';

const PushSettingScreen = ({navigation}) => {
  const token = useSelector(selectToken);
  const [settingStatus, setSettingStatus] = useState('');
  const [inStatus, setInStatus] = useState(false);
  const [outStatus, setOutStatus] = useState(false);

  useEffect(() => {
    setCurrentSetting();
  }, []);

  const setCurrentSetting = async () => {
    // 유저가 알림을 어떻게 설정해놓았는지 정보를 받아온다. 프론트에서 이것까지는 관리할 필요가 없다고 생각하였기에 그때그때 설정해주는 식으로 동작한다.
    const pushStatus = await parkingApi.getSettingPush(token);
    if (pushStatus.data.pushStatus == 'BOTH') {
      setOutStatus(prevState => true);
      setInStatus(prevState => true);
    } else if (pushStatus.data.pushStatus == 'ENABLE_ONLY') {
      setOutStatus(prevState => true);
      setInStatus(prevState => false);
    } else if (pushStatus.data.pushStatus == 'DISABLE_ONLY') {
      setOutStatus(prevState => false);
      setInStatus(prevState => true);
    } else if (pushStatus.data.pushStatus == 'NEITHER') {
      setOutStatus(prevState => false);
      setInStatus(prevState => false);
    }
  };

  const changeStatus = async () => {
    // 알림 설정 스위치를 변경할 시에 변경 내역이 backend로 보내지게끔 구현하였다.
    console.log('입차알림설정', inStatus, '출차알림설정', outStatus);
    if (inStatus == true && outStatus == true) {
      setSettingStatus('BOTH');
    } else if (inStatus == false && outStatus == true) {
      setSettingStatus('ENABLE_ONLY');
    } else if (inStatus == true && outStatus == false) {
      setSettingStatus('DISABLE_ONLY');
    } else {
      setSettingStatus('NEITHER');
    }
    console.log('보내기 직전 상태', settingStatus);
    const response = await parkingApi.settingPush(token, {
      pushStatus: settingStatus,
    });
    if (response.status == 200) {
      setCurrentSetting();
    }
  };

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
        title="설정"
      />
      <PushSwitch
        title="출차 알림"
        status={outStatus}
        setStatus={() => setOutStatus(prevStatus => !prevStatus)}
        changeStatus={() => changeStatus()}
        subtitle="찜한 자리에 대해 출차 시 알림"
      />
      <PushSwitch
        title="입차 알림"
        status={inStatus}
        setStatus={() => setInStatus(prevStatus => !prevStatus)}
        changeStatus={() => changeStatus()}
        subtitle="찜한 자리에 대해 입차 시 알림"
      />
      <DurationSelect />
    </AppSafeArea>
  );
};
export default PushSettingScreen;
