import React from 'react';
import {View} from 'react-native';
//custom imports

import {ParkingSeat} from './ParkingSeat';

export const SectorDrawing = React.memo(({data, onPress, style}) => {
  return (
    <View style={style}>
      {data &&
        data.map(item => (
          <ParkingSeat
            enable={item.enable}
            seatNumber={item.parkingSeat}
            key={item.parkingSeat}
            onPress={onPress}
          />
        ))}
    </View>
  );
});
