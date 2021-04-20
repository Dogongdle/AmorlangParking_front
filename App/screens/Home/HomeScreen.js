import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logout, selectUser} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView>
      <Text>커뮤니티</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
