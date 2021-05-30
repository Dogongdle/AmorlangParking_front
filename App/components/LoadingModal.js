// 앱의 전반적인 Loading 시에 사용되는 모달. 현재는 자동 렌더링으로 인해 사용하지 않는 상태이지만 추후에 필요할 경우 도입할 예정
import React from 'react';
import {StyleSheet, View} from 'react-native';

//custom imports
import {colors, width} from '../config/globalStyles';

const LoadingModal = ({...props}) => {
  return (
    <>
      <View style={styles.splashContainer}>
        <UIActivityIndicator color={colors.primary} size={width * 40} />
      </View>
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  splashContainer: {
    width: width * 130,
    height: width * 130,
    borderRadius: 7,
    backgroundColor: colors.white,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
