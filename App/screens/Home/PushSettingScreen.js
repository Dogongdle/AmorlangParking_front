import React, {useEffect, useState} from 'react';
import {Text, Switch} from 'react-native';

import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors} from '../../config/globalStyles';
import PushSwitch from '../../components/PushSwitch';

const PushSettingScreen = ({navigation}) => {
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
        title="알림 설정"
      />
      <PushSwitch title="출차 알림" subtitle="찜한 자리에 대해 출차 시 알림" />
      <PushSwitch title="입차 알림" subtitle="찜한 자리에 대해 입차 시 알림" />
    </AppSafeArea>
  );
};
export default PushSettingScreen;
