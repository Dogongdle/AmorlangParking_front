import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//custom imports
import {colors, height, width, images} from '../config/globalStyles';
import MyIcon from '../config/Icon-font.js';

export const BorderView = ({disable, style, onPress, children, ...props}) => {
  return (
    <View style={styles.boundaryLine}>
      <View>
        <Image
          source={images.apartEntryIcon}
          style={styles.parkingIcon}
          resizeMode="contain"
        />
        <Text style={styles.entryText}>124동</Text>
      </View>
      <View>
        <Image
          source={images.apartEntryIcon}
          style={styles.parkingIcon}
          resizeMode="contain"
        />
        <Text style={styles.entryText}>125동</Text>
      </View>
      <View>
        <Image
          source={images.apartEntryIcon}
          style={styles.parkingIcon}
          resizeMode="contain"
        />
        <Text style={styles.entryText}>126동</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parkingIcon: {
    width: width * 25,
    height: width * 25,
    tintColor: colors.borderGrey,
    transform: [{rotate: '180deg'}],
    marginLeft: width * 3,
  },
  entryText: {
    width: width * 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 99,
    marginTop: height * 6,
    color: colors.borderGrey,
    fontWeight: 'bold',
    fontSize: width * 15,
  },
  boundaryLine: {
    justifyContent: 'space-around',
    borderLeftWidth: 3,
    borderColor: colors.borderGrey,
    position: 'absolute',
    top: height * 50,
    width: width * 30,
    zIndex: 999,
    height: '100%',
  },
});
