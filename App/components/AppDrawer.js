import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {colors, height, images, width} from '../config/globalStyles';
import {logout, selectUser} from '../reducer/userSlice';
import {AppMenu} from './AppMenu';
import MyIcon from '../config/Icon-font.js';

const AppDrawer = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 2,
          backgroundColor: colors.primary,
          paddingHorizontal: width * 20,
        }}>
        <View style={{marginTop: height * 50}}>
          <View style={styles.profileView}>
            <Image style={styles.profileImage} source={images.user} />
          </View>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.apartText}>{user.apart}</Text>
        </View>
      </View>
      <View style={{flex: 5}}>
        <AppMenu>성별 인증(여성 전용 주차장)</AppMenu>
        <AppMenu>장애인 인증</AppMenu>
        <AppMenu
          leftIcon={
            <MyIcon
              name={'alarm-5'}
              size={width * 19}
              color={colors.borderGrey}
            />
          }
          onPress={handleLogout}>
          로그아웃
        </AppMenu>
      </View>
    </View>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  userName: {
    color: colors.white,
    fontSize: width * 16,
    fontWeight: '800',
  },
  apartText: {
    color: colors.white,
    fontSize: width * 13,
    fontWeight: '800',
    marginTop: height * 10,
  },
  profileView: {
    borderWidth: 3,
    width: width * 70,
    height: width * 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: colors.doubleButtonGrey,
    marginBottom: height * 20,
  },
  profileImage: {
    width: '70%',
    height: '70%',
    tintColor: colors.doubleButtonGrey,
  },
});
