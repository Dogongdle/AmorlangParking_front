import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, images, width} from '../config/globalStyles';
import {EntryView} from './EntryView';

import {SectorDrawing} from './SectorDrawing';

export const AreaDrawing = React.memo(
  ({Adata, Bdata, Cdata, Ddata, onPress, floor, ...props}) => {
    const getFloor = floor => {
      return `B${floor}`;
    };

    const formatFloor = useMemo(() => getFloor(floor + 1), [floor]);
    return (
      <>
        <EntryView />
        <View style={styles.drawingView}>
          <View style={styles.leftArea}>
            <Text style={styles.floorText}>{formatFloor}</Text>
            <SectorDrawing
              data={floor == 0 ? Adata : floor == 1 ? Bdata : Cdata}
              sector="a"
              onPress={onPress}
              style={{}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <SectorDrawing
              sector="b"
              data={floor == 0 ? Bdata : floor == 1 ? Cdata : Adata}
              onPress={onPress}
            />
            <SectorDrawing
              sector="c"
              data={floor == 0 ? Cdata : floor == 1 ? Adata : Bdata}
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
});
