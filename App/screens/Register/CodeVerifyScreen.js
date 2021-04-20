import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
import parkingAPI from '../../api/auth';


const CodeVerifyScreen = ({navigation, route}) => {
  const [code, setCode] = useState(null);
  const dispatch = useDispatch();
  const {apart, region} = route.params;
  const token = useSelector(selectToken);

  const handleUpdate = () => {
    parkingAPI
      .registerApart(token, {Apart: JSON.stringify(apart)})
      .then(res => {
        console.log(res);
        if ((res.status = 200)) {
          dispatch(register(apart));
        }
      });
  };

  return (
    <AppSafeArea>
      <AppHeader
        rightTitle="skip"
        onPressRight={() => console.log('skip')}
        title="거주민 인증"
      />
      <Animatable.View
        animation="slideInDown"
        delay={0}
        duration={2000}
        useNativeDriver
        style={{flex: 3}}>
        <IllustrArea style={{flex: 1}} imageSource={images.verify} />
      </Animatable.View>
      <View style={styles.tagArea}>
        <AppTag>{region}</AppTag>
        <AppTag>{apart}</AppTag>
      </View>
      <View style={styles.dropdownArea}>
        <Text
          style={{
            fontSize: width * 17,
            fontWeight: '700',
            color: colors.black,
          }}>
          인증 코드를 입력해주세요
        </Text>
        <TextInput
          label="인증코드"
          value={code}
          style={styles.codeInput}
          theme={{
            colors: {primary: colors.primary, underlineColor: 'transparent'},
          }}
          onChangeText={text => setCode(text)}
          maxLength={15}
          keyboardType={'email-address'}
          secureTextEntry={true}
        />
      </View>
      <AppButton
        onPress={handleUpdate}
        disable={code && code.length > 10 ? false : true}>
        <Text style={styles.buttonText}>인증 완료</Text>
      </AppButton>
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
