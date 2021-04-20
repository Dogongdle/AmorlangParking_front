import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {logout, selectUser} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import {colors, images, width} from '../../config/globalStyles';

import {StateArea} from '../../components/StateArea';
import MyIcon from '../../config/Icon-font.js';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <AppSafeArea>
      <AppHeader
        onPressLeft={() => navigation.openDrawer()}
        onPressRight={() => navigation.navigate('Notifications')}
        leftTitle={
          <MyIcon name={'alarm-7'} size={width * 15} color={colors.white} />
        }
        rightTitle={
          <MyIcon name={'alarm-8'} size={width * 19} color={colors.white} />
        }
        title={user.apart}
      />
      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
          }}
          source={images.parking}>
          <StateArea />
        </ImageBackground>
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;
