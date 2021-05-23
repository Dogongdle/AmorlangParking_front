import React, {Component, useState} from 'react';
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
import AppModal from './AppModal';
import ModalSplash from './ModalSplash';
import {SocialTag} from './SocialTag';

const AppDrawer = ({navigation}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalSplash, setModalSplash] = useState('none');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  const openModal = () => {
    setVisibleModal(true);
    setModalSplash('flex');
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
            <SocialTag
              provider="kakao"
              style={{position: 'absolute', bottom: 0, right: 0}}
            />
          </View>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.apartText}>{user.apart}</Text>
        </View>
      </View>
      <View style={{flex: 5}}>
        <AppMenu>성별 인증(여성 전용 주차장)</AppMenu>
        <AppMenu>장애인 인증</AppMenu>
        <AppMenu onPress={() => navigation.navigate('PushSetting')}>
          알림 설정
        </AppMenu>
        <AppMenu
          leftIcon={
            <MyIcon name={'alarm-5'} size={width * 19} color={colors.primary} />
          }
          onPress={openModal}>
          로그아웃
        </AppMenu>
        <AppModal visible={visibleModal}>
          <ModalSplash
            buttonText="로그아웃"
            footer={'로그아웃 하시겠습니까?'}
            image={
              <Image
                source={images.mainLogo}
                style={{height: height * 225, width: width * 225}}
                resizeMode="contain"
              />
            }
            icon={
              <MyIcon name="alarm-6" size={width * 14} color={colors.primary} />
            }
            style={{display: modalSplash}}
            onPressExit={() => {
              setVisibleModal(!visibleModal);
              setModalSplash('none');
            }}
            onPressConfirm={() => {
              setVisibleModal(!visibleModal);
              setModalSplash('none');
              handleLogout();
            }}
          />
          {/* modal splash end */}
        </AppModal>
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
    width: width * 70,
    height: width * 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: colors.doubleButtonGrey,
    marginBottom: height * 20,
    backgroundColor: colors.white,
  },
  profileImage: {
    width: '70%',
    height: '70%',
    tintColor: colors.doubleButtonGrey,
  },
});
