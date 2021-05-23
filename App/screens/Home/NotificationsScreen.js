import React, {useEffect, useState} from 'react';

import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors} from '../../config/globalStyles';
import Notification from '../../components/Notification';
import parkingAPI from '../../api/push';
import {selectToken} from '../../reducer/userSlice';
import {useSelector} from 'react-redux';

const NotificationsScreen = ({navigation}) => {
  const token = useSelector(selectToken);

  useEffect(async () => {
    const pushList = await parkingAPI.getPushList(token);
    console.log(pushList);
  }, []);

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

      <Notification />
    </AppSafeArea>
  );
};

export default NotificationsScreen;
