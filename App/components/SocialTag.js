import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//custom imports
import {height, width, colors, images} from '../config/globalStyles';

export const SocialTag = ({provider, style, ...props}) => {
  return (
    <View
      style={[
        styles.tagView,
        {
          backgroundColor:
            provider == 'google'
              ? colors.white
              : provider == 'kakao'
              ? colors.kakaoTalk
              : colors.apple,
        },
        style,
      ]}>
      <Image
        style={styles.tagImage}
        source={
          provider == 'google'
            ? images.google
            : provider == 'kakao'
            ? images.kakaoTalk
            : images.apple
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tagView: {
    borderRadius: 50,
    width: width * 25,
    height: width * 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagImage: {
    width: '70%',
    height: '70%',
  },
});
