import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, images, width} from '../config/globalStyles';
import {EntryView} from './EntryView';

import {SectorDrawing} from './SectorDrawing';

export const AreaDrawing = React.memo(
  ({
    Adata,
    Bdata,
    Cdata,
    Ddata,
    Edata,
    Fdata,
    Gdata,
    Hdata,
    Idata,
    onPress,
    floor,
    doubleData,
    doubleVisible,
    ...props
  }) => {
    const getFloor = floor => {
      return `B${floor}`;
    };

    const formatFloor = useMemo(() => getFloor(floor + 1), [floor]);
    console.log('현재층수', formatFloor);
    return (
      <>
        <EntryView />
        <View style={styles.drawingView}>
          <View style={styles.leftArea}>
            <Text style={styles.floorText}>{formatFloor}</Text>
            <SectorDrawing
              data={floor == 0 ? Adata : floor == 1 ? Ddata : Gdata}
              sector={floor == 0 ? 'a' : floor == 1 ? 'd' : 'g'}
              onPress={onPress}
              style={{}}
            />
          </View>
          {doubleVisible && (
            <>
              <View
                style={[
                  styles.doubleSeat,
                  {top: width * 390, left: width * 180},
                ]}></View>
              <View
                style={[
                  styles.doubleSeat,
                  {top: width * 320, left: width * 180},
                ]}></View>
              <View
                style={[
                  styles.doubleSeat,
                  {top: width * 320, left: width * 310},
                ]}></View>
              <View
                style={[
                  styles.doubleSeat,
                  {top: width * 175, left: width * 310},
                ]}></View>
              <View
                style={[
                  styles.doubleSeat,
                  {top: width * 433, left: width * 120},
                ]}></View>
            </>
          )}

          <View style={{flexDirection: 'row'}}>
            <SectorDrawing
              sector={floor == 0 ? 'b' : floor == 1 ? 'e' : 'h'}
              data={floor == 0 ? Bdata : floor == 1 ? Edata : Hdata}
              onPress={onPress}
            />
            <SectorDrawing
              sector={floor == 0 ? 'c' : floor == 1 ? 'f' : 'i'}
              data={floor == 0 ? Cdata : floor == 1 ? Fdata : Idata}
              onPress={onPress}
            />
          </View>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  drawingView: {
    flex: 1,

    backgroundColor: colors.parkingBackground,
    paddingHorizontal: width * 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leftArea: {
    marginTop: height * 55,
  },
  floorText: {
    fontSize: width * 45,
    fontWeight: 'bold',
    color: colors.borderGrey,
  },
  doubleSeat: {
    position: 'absolute',
    backgroundColor: colors.yellow,
    width: height * 20,
    height: width * 40,
  },
});
