import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const InternetCheck: React.FC = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'No Internet Connection',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 60,  // Adjust the bottomOffset value to control the distance from the bottom
        });
      } else {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Internet Connected',
          visibilityTime: 3000,
          autoHide: true,
          bottomOffset: 60,  // Adjust the bottomOffset value to control the distance from the bottom
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {/* You can keep this line if you want to see any content */}
      {/* <Text>Checking Internet Connectivity...</Text> */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default InternetCheck;
