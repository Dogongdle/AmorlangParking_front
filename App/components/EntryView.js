import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//custom imports
import {colors, height, width, images} from '../config/globalStyles';

export const EntryView = ({disable, style, onPress, children, ...props}) => {
  return (
    <View style={styles.entryView}>
      <View
        style={[
          styles.boundaryLine,
          {
            width: width * 70,
          },
        ]}
      />
      <View style={styles.entryText}>
        <Image
          source={images.parkingIcon}
          style={styles.parkingIcon}
          resizeMode="contain"
        />
        <Text
          style={{
            marginTop: height * 10,
            color: colors.borderGrey,
            fontWeight: '800',
          }}>
          입/출구
        </Text>
      </View>
      <View
        style={[
          styles.boundaryLine,
          {
            width: width * 230,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  entryView: {
    height: height * 50,
    backgroundColor: colors.parkingBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingIcon: {
    width: width * 25,
    height: width * 25,
    tintColor: colors.borderGrey,
  },
  entryText: {
    width: width * 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 99,
    marginTop: height * 20,
  },
  boundaryLine: {
    borderBottomWidth: 2,
    borderColor: colors.borderGrey,
  },
});
