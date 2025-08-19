import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Alert, AppState } from 'react-native';
import { navigate } from './navigationRef'; // Adjust the path if needed
import languages from '../common/language';
import fontStyles from '../assets/styles/constants';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://los-dev.krytrim.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes in ms
const REFRESH_TOKEN_TIME = 1 * 60 * 1000; // Refresh 1 min before expiry

let lastActiveTime = Date.now();
let isIdle = false;

// Function to refresh token
const refreshAccessToken = async () => {
  try {
    // console.log("####--REFRESHING TOKEN---####");
    const currentToken = await AsyncStorage.getItem("token");
    const currentUserid = await AsyncStorage.getItem('userid')
    if (!currentToken) return;

    const response = await axios.post(`${BASE_URL}/api/v1/login`, {
      _func: "refresh-token",
      "userid": currentUserid,
      access_token: currentToken,
    });

    const newAccessToken = response.data?.newAccessToken;

    if (newAccessToken) {
      await AsyncStorage.setItem('token', newAccessToken);

      // Decode JWT to extract expiration time
      const decodedToken = jwtDecode(newAccessToken);
      const expirationTime = decodedToken.exp * 1000; // Convert to ms

      await AsyncStorage.setItem('exp', expirationTime.toString());

      console.log('NEW TOKEN:', newAccessToken);
    } else {
      console.error('Token refresh response did not contain a new token.');
      throw new Error('Invalid token refresh response');
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
  }
};

// Function to check JWT expiration
const checkJwtExpiration = async () => {
  try {
    const token = (await AsyncStorage.getItem('token'))?.trim();
    if (!token) return;
    // console.log(token)
    const decodedToken = jwtDecode(token);
    // console.log("decodedToken------", decodedToken);
    const expirationTime = decodedToken.exp * 1000; // Convert to ms

    const currentTime = Date.now();
    const timeRemaining = expirationTime - currentTime;

    if (timeRemaining < 0) {
      await handleSessionEnd();
    }

    // else if (timeRemaining < REFRESH_TOKEN_TIME && !isIdle) {
    //   await refreshAccessToken();
    // }
    else if (timeRemaining < REFRESH_TOKEN_TIME) {
      await refreshAccessToken(); 
    }

  } catch (error) {
    console.error('Error checking JWT expiration:', error);
  }
};

// Function to detect idle state
const checkIdleState = () => {
  const currentTime = Date.now();
  const idleTime = currentTime - lastActiveTime;
  isIdle = idleTime >= IDLE_TIMEOUT;
};

// Function to handle session end (logout)
const handleSessionEnd = async () => {
  alert(languages['Session Timeout'][fontStyles.lang]);
  await AsyncStorage.clear();
  navigate('PhoneNo');
};

// Attach access token to requests
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await AsyncStorage.getItem('token');

//       if (token) {
//         config.headers.Authorization = token;
//       }
//       return config;
//     } catch (error) {
//       console.error('Failed to attach token to request:', error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const netState = await NetInfo.fetch();

      if (!netState.isConnected) {
        // Show alert or throw an error
        console.warn('No internet connection');
        Alert.alert('No internet connection')
        throw new Error('No internet connection');
      }

      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    } catch (error) {
      // console.error('Request blocked due to no connectivity or token error:', error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);


// Setup intervals for token check and idle detection
setInterval(checkJwtExpiration, 30000); // Check every 30 sec
setInterval(checkIdleState, 2000); // Check idle state every 2 sec

const handleAppStateChange = (nextAppState) => {
  if (nextAppState === 'active') {
    lastActiveTime = Date.now();
  }
};

AppState.addEventListener('change', handleAppStateChange);

export default axiosInstance;
