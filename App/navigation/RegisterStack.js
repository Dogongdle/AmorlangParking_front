//Register Stack Navigator.
//아파트 세팅, 아파트 코드 유효성 체크 페이지 이렇게 총 2개로 이루어진다.
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ApartSetting from '../screens/Register/ApartSetting';
import CodeVerifyScreen from '../screens/Register/CodeVerifyScreen';

const StackRegister = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false, //react-navigation 자체적으로 제공해주는 header의 디자인은 별로이기 때문에 별도의 커스텀화를 위해 이 부분은 보이지 않게 처리함.
  gestureEnabled: false, //아파트 설정 등의 스크린에서 손가락을 통한 뒤로가기 이벤트 발생 시 유저의 불편함이 생길 것이라 생각해 gesture가 불가능하도록 처리함.
});
//메인 화면 스택
const RegisterStack = ({navigation, route}) => {
  return (
    <StackRegister.Navigator initialRouteName="ApartSetting">
      <StackRegister.Screen
        name="ApartSetting"
        component={ApartSetting}
        options={navOptionHandler}
      />
      <StackRegister.Screen
        name="CodeVerify"
        component={CodeVerifyScreen}
        options={navOptionHandler}
      />
    </StackRegister.Navigator>
  );
};

export default RegisterStack;
