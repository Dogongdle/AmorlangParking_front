import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';

export const AreaDrawing = ({children, ...props}) => {
  return (
    <View style={styles.drawingView}>
      <Text style={styles.tagText}>dddd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawingView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.parkingBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
