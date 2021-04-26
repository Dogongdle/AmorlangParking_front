import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//custom imports
import {colors, height, width, images} from '../config/globalStyles';
import {floorOptions} from '../config/globalArray';
import ModalDropdown from 'react-native-modal-dropdown';
import MyIcon from '../config/Icon-font.js';

export const AreaSelect = ({
  disable,
  style,
  onPress,
  onPressRefresh,
  children,
  floor,
  setFloor,
  ...props
}) => {
  return (
    <>
      <View style={[styles.indicator, style]}>
        <ModalDropdown
          onSelect={e => setFloor(prev => e)}
          dropdownStyle={{width: width * 115, marginLeft: width * 60}}
          options={floorOptions}>
          <View style={styles.dropdownArea}>
            <Text style={{color: colors.black, fontWeight: '600'}}>
              {floorOptions[floor]}
            </Text>
            <MyIcon
              name={'alarm-4'}
              size={width * 9}
              style={[
                {
                  transform: [{rotate: '180deg'}],
                },
              ]}
              color={colors.primary}
            />
          </View>
        </ModalDropdown>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressRefresh}
        style={styles.refreshButton}>
        <Image
          source={images.refresh}
          style={styles.refreshIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: height * 20,
    right: width * 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: width * 15,
    paddingVertical: height * 10,
    width: width * 138,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
  },
  dropdownArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: width * 110,
  },
  refreshButton: {
    position: 'absolute',
    top: height * 20,
    left: width * 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: width * 10,
    paddingVertical: height * 10,
    width: width * 40,
    height: width * 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 50,
    elevation: 5,
  },
  refreshIcon: {
    width: '100%',
    height: '100%',
    tintColor: colors.primary,
  },
});
