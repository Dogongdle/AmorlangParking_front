// 자리를 클릭시 나타나는 5분예약, 찜하기 버튼의 컴포넌트, 둘의 형태가 유사하여 같은 컴포넌트로 처리하였다.
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MyIcon from '../config/Icon-font.js';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const ModalButton = ({title, style, onPress, icon, size, ...props}) => {
  return (
    <View style={styles.modalButtonArea}>
      <Text style={styles.modalButtonText}>{title && title}</Text>
      <TouchableOpacity style={[styles.modalButton, style]} onPress={onPress}>
        <MyIcon name={icon} size={width * size} color={props.color} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 13,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  modalButton: {
    width: width * 40,
    height: width * 40,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    marginRight: width * 10,
    fontWeight: '700',
    color: colors.white,
    fontSize: width * 14,
  },
});
