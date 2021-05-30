//소셜 로그인를 활용하는 서비스에서는 유저의 프로필 우측 하단에 어떤 소셜 계정인지 명시해주는 것이 요즘의 트랜드이다. 이를 적용시키기 위한 컴포넌트
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
//custom imports
import {width, colors, images} from '../config/globalStyles';

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
