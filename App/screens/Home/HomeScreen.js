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
import {images, width, height, colors} from '../../config/globalStyles';
import {color} from 'react-native-reanimated';
import {StateArea} from '../../components/StateArea';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <AppSafeArea>
      <AppHeader
        onPressLeft={() => navigation.openDrawer()}
        leftTitle="ㅡ"
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
