import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {logout, selectUser} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppSafeArea} from '../../components/AppSafeArea';
import {IllustrArea} from '../../components/IllustArea';
import {colors, images, width, height} from '../../config/globalStyles';
import {regionOptions, apartOptions} from '../../config/globalArray';
import {AppButton} from '../../components/AppButton';
import ModalDropdown from 'react-native-modal-dropdown';
import {AppHeader} from '../../components/AppHeader';
import * as Animatable from 'react-native-animatable';

const ApartSetting = ({navigation}) => {
  const [region, setRegion] = useState(null);
  const [apart, setApart] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppSafeArea>
      <AppHeader
        title="아파트 선택"
        onPressLeft={handleLogout}
        leftTitle="뒤로가기"
      />
      <Animatable.View
        animation="slideInUp"
        delay={0}
        duration={2000}
        useNativeDriver
        style={{flex: 3}}>
        <IllustrArea style={{flex: 1}} imageSource={images.apartSetting} />
      </Animatable.View>
      <View style={styles.menuArea}>
        <Text
          style={{
            fontSize: width * 17,
            fontWeight: '700',
            color: colors.black,
          }}>
          거주하시는 지역을 선택해주세요.
        </Text>
        <ModalDropdown
          onSelect={e => setRegion(regionOptions[e])}
          dropdownStyle={{width: width * 320}}
          options={regionOptions}>
          <View style={styles.dropdownArea}>
            <Text style={{color: colors.grey}}>
              {region ? region : '지역 선택'}
            </Text>
          </View>
        </ModalDropdown>
        {region && (
          <>
            <Text
              style={{
                fontSize: width * 17,
                fontWeight: '700',
                color: colors.black,
                marginTop: height * 20,
              }}>
              아파트를 선택해주세요.
            </Text>
            <ModalDropdown
              onSelect={e => setApart(apartOptions[e])}
              dropdownStyle={{width: width * 320}}
              options={apartOptions}>
              <View style={styles.dropdownArea}>
                <Text style={{color: colors.grey}}>
                  {apart ? apart : '아파트 선택'}
                </Text>
              </View>
            </ModalDropdown>
          </>
        )}
        {/* <TouchableOpacity onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity> */}
      </View>
      <AppButton
        onPress={() =>
          navigation.navigate('CodeVerify', {
            region: region,
            apart: apart,
          })
        }
        disable={apart && region ? false : true}>
        <Text style={styles.buttonText}>다음으로</Text>
      </AppButton>
    </AppSafeArea>
  );
};

export default ApartSetting;

const styles = StyleSheet.create({
  menuArea: {
    flex: 2,
    paddingHorizontal: width * 20,
    marginTop: height * 30,
  },
  buttonText: {
    fontSize: width * 17,
    fontWeight: '600',
    color: '#fff',
  },
  dropdownArea: {
    width: '100%',
    borderWidth: 1,
    padding: width * 6,
    marginTop: height * 10,
    borderRadius: 5,
    borderColor: colors.borderGrey,
  },
});
