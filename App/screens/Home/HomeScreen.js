import React, {Component, useEffect, useState} from 'react';
import {View, BackHandler, Alert, Image} from 'react-native';
import {
  selectUser,
  selectToken,
  selectReserving,
  selectDuration,
  setUser,
  getReserveData,
  clearReserve,
  userStatus,
} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import {colors, width, height, images} from '../../config/globalStyles';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {StateArea} from '../../components/StateArea';
import MyIcon from '../../config/Icon-font.js';
import {BottomSheetInner} from '../../components/BottomSheetInner';
import {AreaDrawing} from '../../components/AreaDrawing';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {
  getParkingData,
  getDoubleParkingData,
  selectParkingA,
  selectParkingB,
  selectParkingC,
  selectDoubleSeat,
  parkingStatus,
  clearSeat,
  clearData,
  selectTotalSeat,
  selectEnableSeat,
  selectEndTime,
} from '../../reducer/parkingSlice';
import {AreaSelect} from '../../components/AreaSelect';
import AppModal from '../../components/AppModal';
import ModalSplash from '../../components/ModalSplash';
import {ModalButtonView} from '../../components/ModalButtonView';
import LoadingModal from '../../components/LoadingModal';
import {AppStopWatch} from '../../components/AppStopWatch';
import {UIActivityIndicator} from 'react-native-indicators';
import {SeatCountArea} from '../../components/SeatCountArea';

const HomeScreen = ({navigation}) => {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [modalSplash, setModalSplash] = useState('none');
  const [doubleVisible, setDoubleVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userReserveLoading = useSelector(userStatus);
  const duration = useSelector(selectDuration);
  const doubleSeatData = useSelector(selectDoubleSeat);
  // const apartName = user.apart.substring(1, user.apart.length - 1);
  let bottomSheet = React.createRef();
  let fall = new Animated.Value(1);
  const token = useSelector(selectToken);
  const Adata = useSelector(selectParkingA);
  const Bdata = useSelector(selectParkingB);
  const Cdata = useSelector(selectParkingC);
  const dataLoading = useSelector(parkingStatus);
  const endTime = useSelector(selectEndTime);
  const totalSeat = useSelector(selectTotalSeat);
  const enableSeat = useSelector(selectEnableSeat);
  const [visibleModal, setVisibleModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [floor, setFloor] = useState(0);
  let nowTime = new Date();

  // console.log(parseInt(endTime.substring(1, endTime.length - 1)));
  const remainTime = endTime - nowTime;
  const backAction = () => {
    Alert.alert('앱 종료하기', '앱을 종료하시겠습니까', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(async () => {
    dispatch(getReserveData(token));
    dispatch(getDoubleParkingData({token: token}));
    dispatch(getParkingData({sector: 'a', token: token}));
    dispatch(getParkingData({sector: 'b', token: token}));
    dispatch(getParkingData({sector: 'c', token: token}));
    // dispatch(getParkingData({sector: 'd', token: token}));
    return () => {
      dispatch(clearReserve());
      dispatch(clearData());
    };
  }, [refreshCount, floor]);

  useEffect(() => {
    const autoRefresh = setTimeout(async () => {
      setRefreshCount(prev => prev + 1);
    }, duration);

    return () => clearTimeout(autoRefresh);
  });

  const reserveModal = () => {
    if (user.reserved == true) {
      setVisibleAlert(true);
    } else {
      setVisibleModal(true);
    }
  };

  return (
    <>
      <AppSafeArea>
        <AppModal visible={visibleModal}>
          <ModalButtonView
            setRefreshCount={setRefreshCount}
            setVisibleModal={setVisibleModal}
            onPress={() => {
              setVisibleModal(false);
              dispatch(clearSeat());
            }}
          />
        </AppModal>
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
        {(dataLoading == 'loading' || userReserveLoading == 'loading') && (
          <UIActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
            color={colors.primary}
            size={width * 50}
          />
        )}
        <View style={{flex: 1, backgroundColor: colors.parkingBackground}}>
          <ReactNativeZoomableView
            maxZoom={2.0}
            minZoom={0.8}
            zoomStep={0.8}
            initialZoom={1.0}>
            <AreaDrawing
              floor={floor}
              Adata={Adata}
              Bdata={Bdata}
              Cdata={Cdata}
              doubleData={doubleSeatData}
              onPress={reserveModal}
              doubleVisible={doubleVisible}
            />
          </ReactNativeZoomableView>
          <AreaSelect
            floor={floor}
            setFloor={setFloor}
            onPressRefresh={() => setRefreshCount(prev => prev + 1)}
          />
          <SeatCountArea
            totalSeatCount={totalSeat.reduce((a, b) => a + b, 0)}
            enableSeatCount={enableSeat.reduce((a, b) => a + b, 0)}
          />
          {user.reserved == true ? (
            <AppStopWatch time={remainTime} />
          ) : (
            <StateArea visible={visibleModal} />
          )}
        </View>
      </AppSafeArea>

      <BottomSheet
        ref={bottomSheet}
        snapPoints={[height * 500, height * 80]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderContent={() => (
          <BottomSheetInner
            number={doubleSeatData.length}
            onPress={() => {
              setDoubleVisible(true), bottomSheet.current.snapTo(1);
            }}
          />
        )}
      />
    </>
  );
};

export default HomeScreen;
