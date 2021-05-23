import React from 'react';
import {View} from 'react-native';
//custom imports

import {ParkingSeat} from './ParkingSeat';

export const SectorDrawing = React.memo(({data, onPress, style, sector}) => {
  return (
    <View style={style}>
      {data &&
        data.map(item => (
          <ParkingSeat
            reserved={item.reserved}
            reservedUser={item.reservedUser}
            enable={item.enable}
            seatNumber={item.parkingSeat}
            key={item.parkingSeat}
            onPress={onPress}
            sector={sector}
          />
        ))}
    </View>
  );
});
