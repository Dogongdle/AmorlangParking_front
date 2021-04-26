import React, {Component, useEffect} from 'react';
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
import {colors, images, width, height} from '../../config/globalStyles';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {StateArea} from '../../components/StateArea';
import MyIcon from '../../config/Icon-font.js';
import {BottomSheetInner} from '../../components/BottomSheetInner';
import {AreaDrawing} from '../../components/AreaDrawing';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import parkingAPI from '../../api/parking';
import {register, selectToken} from '../../reducer/userSlice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const apartName = user.apart.substring(1, user.apart.length - 1);
  let bottomSheet = React.createRef();
  let fall = new Animated.Value(1);
  const token = useSelector(selectToken);

  useEffect(async () => {
    const userData = await parkingAPI.getParkingData(token, 'a_sector');
    console.log(userData);
  }, []);

  return (
    <>
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
          title={apartName}
        />
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1.0}
            bindToBorders={true}>
            <AreaDrawing />
          </ReactNativeZoomableView>
          <StateArea />
        </View>
      </AppSafeArea>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[height * 500, height * 80]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderContent={() => <BottomSheetInner />}
      />
    </>
  );
};

export default HomeScreen;
