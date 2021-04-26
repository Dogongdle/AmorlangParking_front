import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import {EntryView} from './EntryView';
import {ParkingSeat} from './ParkingSeat';

export const AreaDrawing = React.memo(
  ({Adata, Bdata, Cdata, Ddata, onPress, ...props}) => {
    return (
      <>
        <EntryView />
        <View style={styles.drawingView}>
          <View style={{marginTop: height * 130}}>
            {Adata &&
              Adata.map(item => (
                <ParkingSeat
                  enable={item.enable}
                  seatNumber={item.parkingSeat}
                  key={item.parkingSeat}
                  onPress={onPress}
                />
              ))}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              {Bdata &&
                Bdata.map(item => (
                  <ParkingSeat
                    enable={item.enable}
                    seatNumber={item.parkingSeat}
                    key={item.parkingSeat}
                    onPress={onPress}
                  />
                ))}
            </View>
            <View>
              {Cdata &&
                Cdata.map(item => (
                  <ParkingSeat
                    enable={item.enable}
                    seatNumber={item.parkingSeat}
                    key={item.parkingSeat}
                    onPress={onPress}
                  />
                ))}
            </View>
          </View>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  drawingView: {
    flex: 1,
    height: height * 1200,
    backgroundColor: colors.parkingBackground,
    paddingHorizontal: width * 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
