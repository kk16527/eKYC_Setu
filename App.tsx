import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewCustomerOtpScreen from './src/components/screens/Screens/Sales/newCustomer/NewCustomerOtpScreen';
import NewCustomerKYCScreen from './src/components/screens/Screens/Sales/newCustomer/NewCustomerKYCScreen';

import {navigationRef} from './src/services/navigationRef';

import {ThemeProvider, useTheme} from './ThemeContext';
import {AlertProvider} from './AlertContext';

import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid, Platform, View} from 'react-native';


import AppLoader from './src/components/common/Atoms/AppLoader';

import InternetListener from './src/components/common/InternetListener/InternetListener';
function App() {
  const Stack = createNativeStackNavigator();
  const [load, setLoad] = useState(true);
  const [iscreen, setIscreen] = useState('Starting');

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Hide splash after loading
      loadfun();
    }, 2000);
  }, []);

  const loadfun = async () => {
    let permissions = [];
    if (Number(Platform.Version) < 33) {
      permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];
    } else {
      // Android 13 and above
      permissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        // PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      ];
    }

    const authToken = await AsyncStorage.getItem('token');
    // const encryptedToken = await AsyncStorage.getItem('encryptedToken');
    if (authToken) {
      setIscreen('Mainscreen');
      //  setIscreen('PhoneNo');
      // console.log('encryptedToken', encryptedToken);
      console.log('');
      setLoad(false);
    }

    const results = await Promise.all(
      permissions.map(permission => PermissionsAndroid.check(permission)),
    );

    const allGranted = results.every(status => status === true);
    if (allGranted) {
      setLoad(false);
    } else {
      setLoad(false);
    }
  };

  if (load) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppLoader />
      </View>
    );
  }
  return (
    <AlertProvider>
      <ThemeProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            // initialRouteName={'Mainscreen'}
            initialRouteName={'NewCustomerOtp'}
            screenOptions={{headerShown: false}}>
        
            <Stack.Screen
              name="NewCustomerOtp"
              component={NewCustomerOtpScreen}
            />
            <Stack.Screen
              name="NewCustomerKYC"
              component={NewCustomerKYCScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* ✅ Global Internet Toast Listener */}
        <InternetListener />

      
      </ThemeProvider>
    </AlertProvider>
  );
}

export default App;
