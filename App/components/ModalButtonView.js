import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from 'react-native-reanimated';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';
import {ModalButton} from './ModalButton';

export const ModalButtonView = ({onPress, children, ...props}) => {
  return (
    <View style={styles.modalButtonView}>
      <ModalButton
        icon="alarm-1"
        size={18}
        color={colors.primary}
        title="5분 예약하기"
        style={{marginRight: width * 5}}
      />
      <ModalButton
        icon="alarm-2"
        size={14}
        color={colors.red}
        style={{marginRight: width * 5}}
        title="찜하기"
      />
      <ModalButton
        icon="alarm-6"
        size={20}
        color={colors.primary}
        style={{width: width * 50, height: width * 50}}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonView: {
    position: 'absolute',
    bottom: height * 140,
    right: width * 20,
    alignItems: 'center',
  },
});
