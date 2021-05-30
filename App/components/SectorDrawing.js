// 주차장의 각 라인별로 컴포넌트 화를 처리하였다.
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
