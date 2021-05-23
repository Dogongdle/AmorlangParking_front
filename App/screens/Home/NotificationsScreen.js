import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

import {logout, selectUser} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors} from '../../config/globalStyles';
import Notification from '../../components/Notification';
import Swipeout from 'react-native-swipeout';

const NotificationsScreen = ({navigation}) => {
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
