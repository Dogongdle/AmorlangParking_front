import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

//custom imports
import {colors, width, height} from '../config/globalStyles';
import {AppButton} from './AppButton';
import MyIcon from '../config/Icon-font';

const ModalSplash = ({
  image,
  icon,
  footer,
  footerStyle,
  buttonText,
  style,
  onPressExit,
  onPressConfirm,
  doubleButton,
}) => {
  return (
    <>
      <View style={[styles.splashContainer, style]}>
        {icon && (
          <View style={styles.header}>
            <TouchableOpacity onPress={onPressExit}>{icon}</TouchableOpacity>
          </View>
        )}
        {image && <View style={styles.imageContainer}>{image}</View>}
        {footer && (
          <View style={[styles.textContainer, footerStyle]}>
            <Text size={13} weight="300" style={styles.text}>
              {footer}
            </Text>
          </View>
        )}
        {buttonText && (
          <>
            <AppButton
              style={{
                height: height * 34,
                backgroundColor: colors.primary,
                marginTop: width * 20,
              }}
              onPress={onPressConfirm ? onPressConfirm : onPressExit}>
              <Text
                size={13}
                weight="bold"
                color={colors.white}
                style={styles.buttonText}>
                {buttonText}
              </Text>
            </AppButton>
          </>
        )}
        {doubleButton && (
          <View style={styles.doubleContainer}>
            <AppButton style={styles.doubleCancel} onPress={onPressExit}>
              <Text size={13} weight="bold" style={styles.doubleCancelText}>
                취소
              </Text>
            </AppButton>
            <AppButton
              style={styles.doubleConfirm}
              onPress={onPressConfirm ? onPressConfirm : onPressExit}>
              <Text size={13} weight="bold" style={styles.buttonText}>
                확인
              </Text>
            </AppButton>
          </View>
        )}
      </View>
    </>
  );
};

export default ModalSplash;

const styles = StyleSheet.create({
  splashContainer: {
    width: width * 259,
    height: height * 300,
    borderRadius: 7,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: height * 12,
    paddingHorizontal: width * 20,
    zIndex: 100,
  },
  imageContainer: {
    height: height * 172,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: height * 23,
    fontSize: width * 13,
    color: colors.grey,
  },
  textContainer: {
    height: height * 50,
    alignItems: 'center',
    paddingHorizontal: width * 15,
    marginBottom: height * 1,
  },
  buttonText: {
    lineHeight: 23,
    color: colors.white,
  },
  doubleCancel: {
    height: height * 34,
    width: '50%',
    backgroundColor: '#EDEDED',
  },
  doubleConfirm: {
    height: height * 34,
    width: '50%',
  },
  doubleContainer: {
    flexDirection: 'row',
  },
  doubleCancelText: {
    lineHeight: 23,
    color: 'black',
  },
});
