import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {register, selectToken} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeArea} from '../../components/AppSafeArea';
import {IllustrArea} from '../../components/IllustArea';
import {colors, images, width, height} from '../../config/globalStyles';
import {AppButton} from '../../components/AppButton';
import {AppHeader} from '../../components/AppHeader';
import * as Animatable from 'react-native-animatable';
import {AppTag} from '../../components/AppTag';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import parkingAPI from '../../api/auth';
import AppModal from '../../components/AppModal';
import ModalSplash from '../../components/ModalSplash';
import MyIcon from '../../config/Icon-font.js';

const CodeVerifyScreen = ({navigation, route}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalSplash, setModalSplash] = useState('none');
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const {apart, region} = route.params;
  const token = useSelector(selectToken);

  const handleUpdate = () => {
    parkingAPI
      .registerApart(token, {apart: JSON.stringify(apart)})
      .then(res => {
        console.log(res);
        if ((res.status = 200)) {
          dispatch(register(apart));
        }
      });
  };

  // const verifyCheck = () => {
  //   parkingAPI
  //     .verifyCheck(token, {
  //       name: JSON.stringify(apart),
  //       code: JSON.stringify(code),
  //     })
  //     .then(res => {
  //       console.log(res);
  //       if (res.data.response) {
  //         handleUpdate;
  //       } else console.log('fail');
  //     });
  // };

  const openModal = () => {
    setVisibleModal(true);
    setModalSplash('flex');
  };

  return (
    <AppSafeArea>
      <AppHeader
        rightTitle={
          <Text
            style={{
              fontSize: width * 14,
              fontWeight: '500',
              color: colors.white,
            }}>
            skip
          </Text>
        }
        onPressRight={() => console.log('skip')}
        title="거주민 인증"
      />
      <KeyboardAwareScrollView>
        <Animatable.View
          animation="slideInDown"
          delay={0}
          duration={2000}
          useNativeDriver
          style={{flex: 3}}>
          <IllustrArea
            style={{flex: 1, height: height * 380}}
            imageSource={images.verify}
          />
        </Animatable.View>

        <View style={styles.tagArea}>
          <AppTag>{region}</AppTag>
          <AppTag>{apart}</AppTag>
        </View>
        <View style={styles.dropdownArea}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: width * 17,
                fontWeight: '700',
                color: colors.black,
              }}>
              인증 코드를 입력해주세요
            </Text>
            <TouchableOpacity onPress={openModal}>
              <MyIcon name="alarm-3" size={width * 16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <TextInput
            label="인증코드"
            value={code}
            style={styles.codeInput}
            theme={{
              colors: {primary: colors.primary, underlineColor: 'transparent'},
            }}
            onChangeText={text => setCode(text)}
            maxLength={15}
            secureTextEntry={true}
          />
          <AppModal visible={visibleModal}>
            <ModalSplash
              buttonText="확인"
              footer={
                '아파트 관리실에 가서 인증코드를 발급받은 뒤 해당 인증번호를 입력하면 됩니다:)'
              }
              image={
                <Image
                  source={images.mainLogo}
                  style={{height: height * 225, width: width * 225}}
                  resizeMode="contain"
                />
              }
              icon={
                <MyIcon
                  name="alarm-6"
                  size={width * 14}
                  color={colors.primary}
                />
              }
              style={{display: modalSplash}}
              onPressExit={() => {
                setVisibleModal(!visibleModal);
                setModalSplash('none');
              }}
              onPressConfirm={() => {
                setVisibleModal(!visibleModal);
                setModalSplash('none');
              }}
            />
            {/* modal splash end */}
          </AppModal>
        </View>
        <AppButton
          style={{marginTop: height * 30}}
          onPress={handleUpdate}
          disable={code && code.length > 10 ? false : true}>
          <Text style={styles.buttonText}>인증 완료</Text>
        </AppButton>
      </KeyboardAwareScrollView>
    </AppSafeArea>
  );
};

export default CodeVerifyScreen;

const styles = StyleSheet.create({
  dropdownArea: {
    flex: 2,
    paddingHorizontal: width * 20,
    marginTop: height * 30,
  },
  buttonText: {
    fontSize: width * 17,
    fontWeight: '600',
    color: '#fff',
  },
  tagArea: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 5,
  },
  codeInput: {
    marginTop: height * 10,
    backgroundColor: '#fff',
    fontSize: 14,
  },
});
