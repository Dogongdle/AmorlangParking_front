import React, {Component} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {logout, selectUser} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import MyIcon from '../../config/Icon-font.js';
import {width, colors} from '../../config/globalStyles';

const NotificationsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
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
        title="알림"
      />
    </AppSafeArea>
  );
};

export default NotificationsScreen;
