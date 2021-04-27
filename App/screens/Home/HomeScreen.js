import React, {Component, useEffect, useState} from 'react';
import {View} from 'react-native';
import {selectUser, selectToken} from '../../reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader} from '../../components/AppHeader';
import {AppSafeArea} from '../../components/AppSafeArea';
import {colors, width, height} from '../../config/globalStyles';
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
} from '../../reducer/parkingSlice';
import {AreaSelect} from '../../components/AreaSelect';
import AppModal from '../../components/AppModal';
import {ModalButtonView} from '../../components/ModalButtonView';
import LoadingModal from '../../components/LoadingModal';
import {AppStopWatch} from '../../components/AppStopWatch';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const apartName = user.apart.substring(1, user.apart.length - 1);
  let bottomSheet = React.createRef();
  let fall = new Animated.Value(1);
  const token = useSelector(selectToken);
  const Adata = useSelector(selectParkingA);
  const Bdata = useSelector(selectParkingB);
  const Cdata = useSelector(selectParkingC);
  const dataLoading = useSelector(parkingStatus);
  const [visibleModal, setVisibleModal] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [floor, setFloor] = useState(0);

  useEffect(() => {
    dispatch(getParkingData({sector: 'a', token: token}));
    dispatch(getParkingData({sector: 'b', token: token}));
    dispatch(getParkingData({sector: 'c', token: token}));
  }, [refreshCount, floor]);

  if (dataLoading == 'loading') {
    return (
      <AppModal visible={true}>
        <LoadingModal />
      </AppModal>
    );
  }
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
          title={apartName}
        />
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
              onPress={() => setVisibleModal(true)}
            />
          </ReactNativeZoomableView>
          <AreaSelect
            floor={floor}
            setFloor={setFloor}
            onPressRefresh={() => setRefreshCount(prev => prev + 1)}
          />
          <AppStopWatch />
          <StateArea visible={visibleModal} />
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
