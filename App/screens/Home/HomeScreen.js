//홈 스크린. 사실상 서비스의 모든 것들이 이루어지는 스크린으로 코드의 줄을 줄이기 위해 많은 노력을 가했지만, 이정도가 최선이라고 판단되었다.
import React, {useEffect, useState} from 'react';
import {View, BackHandler, Alert, Image} from 'react-native';
import {
  selectUser,
  selectToken,
  selectDuration,
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
  selectParkingD,
  selectParkingE,
  selectParkingF,
  selectParkingG,
  selectParkingH,
  selectParkingI,
  selectDoubleSeat,
  parkingStatus,
  clearSeat,
  clearData,
  selectTotalSeat,
  selectEnableSeat,
  selectEnableSeat2,
  selectEnableSeat3,
  selectEndTime,
} from '../../reducer/parkingSlice';
import {selectPushList} from '../../reducer/pushSlice';
import {AreaSelect} from '../../components/AreaSelect';
import AppModal from '../../components/AppModal';
import {ModalButtonView} from '../../components/ModalButtonView';
import {UIActivityIndicator} from 'react-native-indicators';
import {SeatCountArea} from '../../components/SeatCountArea';
import PushBadge from '../../components/PushBadge';
import Conditional from '../../components/Conditional';

const HomeScreen = ({navigation}) => {
  const [doubleVisible, setDoubleVisible] = useState(false); //이중 주차 장소가 보이도록 하는 state
  const dispatch = useDispatch();
  //이중 주차 bottom sheet를 위한 변수
  let bottomSheet = React.createRef();
  let fall = new Animated.Value(1);

  //redux 변수
  const user = useSelector(selectUser);
  const userReserveLoading = useSelector(userStatus);
  const duration = useSelector(selectDuration);
  const doubleSeatData = useSelector(selectDoubleSeat);
  const pushList = useSelector(selectPushList);
  const token = useSelector(selectToken);
  const Adata = useSelector(selectParkingA);
  const Bdata = useSelector(selectParkingB);
  const Cdata = useSelector(selectParkingC);
  const Ddata = useSelector(selectParkingD);
  const Edata = useSelector(selectParkingE);
  const Fdata = useSelector(selectParkingF);
  const Gdata = useSelector(selectParkingG);
  const Hdata = useSelector(selectParkingH);
  const Idata = useSelector(selectParkingI);
  const dataLoading = useSelector(parkingStatus);
  const endTime = useSelector(selectEndTime);
  const totalSeat = useSelector(selectTotalSeat);
  const enableSeat = useSelector(selectEnableSeat);
  const enableSeat2 = useSelector(selectEnableSeat2);
  const enableSeat3 = useSelector(selectEnableSeat3);
  const [visibleModal, setVisibleModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // 현재 유저가 조회하고고 있는 주차장의 층 state (전역으로 관리하지 않기로 결정)
  const [floor, setFloor] = useState(0);
  let nowTime = new Date(); // 5분 예약 스톱워치를 구현하기 위해 현재시간을 가져와서 빼주는 식의 작업을 처리하였다.

  const remainTime = endTime - nowTime; // 5분예약 남은 시간. 여기서 endTime은 userReducer에서 만들어진 변수
  const backAction = () => {
    //안드로이드 핸드폰에서는 홈버튼 옆에 별도의 backbutton이 있는 경우가 많다. 그 부분을 대비하여 앱을 실수로 끄는 현상을 방지하기 위해 작성하였다.
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
    // 화면이 처음 켜질 때, 새로고침을 할때 실행되는 함수.
    dispatch(getReserveData(token));
    dispatch(getDoubleParkingData({token: token}));
    dispatch(getParkingData({sector: 'a', token: token}));
    dispatch(getParkingData({sector: 'b', token: token}));
    dispatch(getParkingData({sector: 'c', token: token}));
    dispatch(getParkingData({sector: 'd', token: token}));
    dispatch(getParkingData({sector: 'e', token: token}));
    dispatch(getParkingData({sector: 'f', token: token}));
    dispatch(getParkingData({sector: 'g', token: token}));
    dispatch(getParkingData({sector: 'h', token: token}));
    dispatch(getParkingData({sector: 'i', token: token}));
    return () => {
      // 무겁다고 생각할 수 있기에 최적화를 열심히 해주었다.
      dispatch(clearReserve());
      dispatch(clearData());
    };
  }, [refreshCount, floor, user.reserved]);

  useEffect(() => {
    // 자동 refresh , setInterval 사용
    const autoRefresh = setTimeout(async () => {
      setRefreshCount(prev => prev + 1);
    }, duration);

    return () => clearTimeout(autoRefresh);
  });

  const reserveModal = () => {
    // 자리를 클릭시 발생하는 event 함수이다. user가 5분 예약중이라면 5분예약,찜하기 모두를 보여주고 그렇지 않다면 찜하기만 보여준다
    if (user.reserved == true) {
      setVisibleModal(true); // 5.27 변경. 혹시 모를 상황을 대비하여 if-else문은 유지해놓았다. 차후 조건문은 삭제할 예정
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
            <>
              {pushList.length >= 1 && <PushBadge count={pushList.length} />}
              <MyIcon name={'alarm-8'} size={width * 19} color={colors.white} />
            </>
          }
          title={user.apart}
        />
        {(dataLoading == 'loading' || userReserveLoading == 'loading') && ( //데이터 로딩 시에는 다음과 같은 indicator가 보이게 된다.
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
          <ReactNativeZoomableView //구글 맵처럼 zoom이 되게끔 하기 위해 외부 모듈을 사용
            maxZoom={2.0}
            minZoom={0.8}
            zoomStep={0.8}
            initialZoom={1.0}>
            <AreaDrawing
              floor={floor}
              Adata={Adata}
              Bdata={Bdata}
              Cdata={Cdata}
              Ddata={Ddata}
              Edata={Edata}
              Fdata={Fdata}
              Gdata={Gdata}
              Hdata={Hdata}
              Idata={Idata}
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
            enableSeatCount2={enableSeat2.reduce((a, b) => a + b, 0)}
            enableSeatCount3={enableSeat3.reduce((a, b) => a + b, 0)}
          />
          <Conditional
            condition={user.reserved}
            visible={visibleModal}
            time={remainTime}
          />
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
