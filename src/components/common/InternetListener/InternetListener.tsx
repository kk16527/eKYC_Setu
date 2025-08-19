// InternetListener.js
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const InternetListener = () => {
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected && !wasOffline) {
        setWasOffline(true);
        Toast.show({
          type: 'error',
          text1: 'No Internet Connection',
          text2: 'Please check your internet connection.',
          position: 'bottom',
        });
      }

      if (state.isConnected && wasOffline) {
        setWasOffline(false);
        Toast.show({
          type: 'success',
          text1: 'Back Online',
          text2: 'You are now connected.',
          position: 'bottom',
        });
      }
    });

    return () => unsubscribe();
  }, [wasOffline]);

  return null; // कोई UI नहीं है
};

export default InternetListener;
