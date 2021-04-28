import {Dimensions} from 'react-native';

export const colors = {
  primary: '#EC8B57',
  black: '#191919',
  red: '#FF3636',
  lightBlue: '#36D2FF',
  green: '#8FEF73',
  grey: '#767676',
  borderGrey: '#C9C9C9',
  statusGrey: '#666666',
  textGrey: '#A2A2A2',
  darkBlue: '#83abeb',
  dark: '#0A1321',
  buttonGrey: '#EFF0F1',
  white: '#ffffff',
  secondaryGrey: '#B2B2B2',
  notRead: 'rgba(54, 210, 255, 0.06)',
  doubleButtonGrey: '#EDEDED',
  darkBlueLowOpacity: 'rgba(29,53,91,0.08)',
  darkLowOpacity: 'rgba(10, 19, 33, 0.08)',
  darkHalfOpacity: 'rgba(10, 19, 33, 0.5)',
  darkLowerOpacity: 'rgba(10, 19, 33, 0.2)',
  bottomTabBarBackgroundColor: '#F8F9F9',
  warning: '#ff9966',
  checkboxGrey: '#C7C7C7',
  text: '#595F68',
  //social button colors
  apple: '#040708',
  naver: '#1EC800',
  kakaoTalk: '#FFDE00',
  facebook: '#3B5998',
  google: '#4a83ff',
  email: '#36A6FF',
  lightGrey: '#f5f5f5',
  //modal colors
  modalBackground: 'rgba(10, 19, 33, 0.56)',
  modalLineColor: 'rgba(112, 112, 112, 0.5)',
  mediumGrey: '#84888F',
  darkMediumGrey: '#0A1321',
  postcardGrey: '#F2F2F2',
  parkingBackground: '#EFEFF1',
};

export const fonts = {
  SpoqaHanSansNeo: 'SpoqaHanSansNeo',
  SpoqaHanSansNeo_Thin: 'SpoqaHanSansNeo-Thin',
  SpoqaHanSansNeo_Light: 'SpoqaHanSansNeo-Light',
  SpoqaHanSansNeo_Medium: 'SpoqaHanSansNeo-Medium',
  SpoqaHanSansNeo_Regular: 'SpoqaHanSansNeo-Regular',
  SpoqaHanSansNeo_Bold: 'SpoqaHanSansNeo-Bold',
};

export const images = {
  apple: require('../images/appleLogin.png'),
  google: require('../images/googleLogin.jpg'),
  kakaoTalk: require('../images/kakaoTalkLogin.png'),
  loginBackground: require('../images/backgroundScreen.jpg'),
  mainLogo: require('../images/MainLogo.png'),
  apartSetting: require('../images/ApartSetting.png'),
  verify: require('../images/Verify.png'),
  parking: require('../images/parking.png'),
  user: require('../images/user.png'),
  refresh: require('../images/refresh-button.png'),
  parkingIcon: require('../images/parkingIcon.png'),
  curveIcon: require('../images/curve.png'),
};

export const storyBoardDimensions = {
  height: 740,
  width: 360,
};

export const fontSizes = {
  title: 18,
  subtitle: 12,
  minititle: 10,
  textInput: Dimensions.get('screen').height <= 650 ? 16 : 20,
};

export const height = (
  Dimensions.get('screen').height *
  (1 / storyBoardDimensions.height)
).toFixed(2);

export const width = (
  Dimensions.get('screen').width *
  (1 / storyBoardDimensions.width)
).toFixed(2);
