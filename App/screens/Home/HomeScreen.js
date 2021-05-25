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
  selectParkingA,
  selectParkingB,
  selectParkingC,
  parkingStatus,
  clearSeat,
  clearData,
  selectTotalSeat,
  selectEnableSeat,
  selectEndHour,
  selectEndMinute,
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const reserveStatus = useSelector(selectReserving);
  const duration = useSelector(selectDuration);

  // const apartName = user.apart.substring(1, user.apart.length - 1);
  let bottomSheet = React.createRef();
  let fall = new Animated.Value(1);
  const token = useSelector(selectToken);
  const Adata = useSelector(selectParkingA);
  const Bdata = useSelector(selectParkingB);
  const Cdata = useSelector(selectParkingC);
  const dataLoading = useSelector(parkingStatus);
  const endHour = useSelector(selectEndHour);
  const endMinute = useSelector(selectEndMinute);
  const totalSeat = useSelector(selectTotalSeat);
  const enableSeat = useSelector(selectEnableSeat);
  const [visibleModal, setVisibleModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [floor, setFloor] = useState(0);
  let reserveEndTime = new Date();
  reserveEndTime.setMinutes(reserveEndTime.getMinutes() + 5);
  let hours = reserveEndTime.getHours(); // 시
  let minutes = reserveEndTime.getMinutes(); // 분
  let seconds = reserveEndTime.getSeconds(); // 분
  console.log('예약종료시간은', seconds);

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
    await dispatch(getReserveData(token));
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

  console.log(enableSeat);

  // if (dataLoading == 'loading') {
  //   return (
  //     <AppModal visible={dataLoading == 'loading'}>
  //       <LoadingModal />
  //     </AppModal>
  //   );
  // }
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
        {dataLoading == 'loading' && (
          <UIActivityIndicator
            style={{
              position: 'absolute',
              zIndex: 999,
              left: '43%',
              top: '50%',
            }}
            color={colors.primary}
            size={width * 40}
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
              onPress={reserveModal}
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
            <AppStopWatch hour={endHour} minute={endMinute} />
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
        renderContent={() => <BottomSheetInner />}
      />
    </>
  );
};

export default HomeScreen;
