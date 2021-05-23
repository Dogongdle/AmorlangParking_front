import React, {useEffect, useState} from 'react';
import {Text, Switch} from 'react-native';

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

  useEffect(async () => {
    const pushStatus = await parkingApi.getSettingPush(token);
    console.log('너어떻게오니', pushStatus.data);
    if (pushStatus.data.pushStatus == 'BOTH') {
      setInStatus(true);
      setOutStatus(true);
    } else if (pushStatus.data == 'ENABLE_ONLY') {
      setOutStatus(true);
      setInStatus(false);
    } else if (pushStatus.data == 'DISABLE_ONLY') {
      setOutStatus(false);
      setInStatus(true);
    }
  }, [inStatus, outStatus]);

  const changeStatus = async () => {
    if (inStatus == true && outStatus == true) {
      setSettingStatus('BOTH');
    } else if (inStatus == true && outStatus == false) {
      setSettingStatus('ENABLE_ONLY');
    } else if (inStatus == false && outStatus == true) {
      setSettingStatus('DISABLE_ONLY');
    }
    const response = await parkingApi.settingPush(token, {
      pushStatus: settingStatus,
    });
    console.log('가나연?', response);
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
        setStatus={setOutStatus}
        changeStatus={changeStatus}
        subtitle="찜한 자리에 대해 출차 시 알림"
      />
      <PushSwitch
        title="입차 알림"
        status={inStatus}
        setStatus={setInStatus}
        changeStatus={changeStatus}
        subtitle="찜한 자리에 대해 입차 시 알림"
      />
      <DurationSelect />
    </AppSafeArea>
  );
};
export default PushSettingScreen;
