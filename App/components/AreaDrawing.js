import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, images, width} from '../config/globalStyles';
import {EntryView} from './EntryView';
import {ParkingSeat} from './ParkingSeat';
import {SectorDrawing} from './SectorDrawing';

export const AreaDrawing = React.memo(
  ({Adata, Bdata, Cdata, Ddata, onPress, ...props}) => {
    return (
      <>
        <EntryView />
        <View style={styles.drawingView}>
          <View style={styles.leftArea}>
            <SectorDrawing data={Adata} onPress={onPress} style={{}} />
          </View>

          <View style={{flexDirection: 'row'}}>
            <SectorDrawing data={Bdata} onPress={onPress} />
            <SectorDrawing data={Cdata} onPress={onPress} />
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
    marginTop: height * 130,
  },
});
