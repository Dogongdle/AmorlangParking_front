import React from 'react';
import {StyleSheet, Modal, StatusBar, Platform} from 'react-native';
import {colors} from '../config/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const AppModal = ({visible, children}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <SafeAreaView  style={styles.container}>
        {Platform.OS === 'android' && (
          <StatusBar
            hidden={false}
            animated={true}
            backgroundColor={colors.modalBackground}
            barStyle="light-content"
          />
        )}
        {children}
      </SafeAreaView>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
  },
});
