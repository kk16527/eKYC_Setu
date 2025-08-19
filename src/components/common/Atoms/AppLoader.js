// import {View, StyleSheet, Dimensions} from 'react-native';
// import LottieView from 'lottie-react-native';
// const height = Dimensions.get('screen').height;
// const width = Dimensions.get('screen').width;


// const AppLoader = () => {


//   return (
//     <View style={[StyleSheet.absoluteFillObject, styles.container]}>
//       <LottieView
//         source={require('../../../assets/json/loader.json')}
//         style={{width: width / 1, height: height}}
//         autoPlay
//         loop
//       />
//     </View>
//   );
// };

// export default AppLoader;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     zIndex: 1,
//   },
// });


import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import fontStyles from '../../../assets/styles/constants';
import languages from '../../../common/language';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AppLoader = ({ title = null}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let rotationAnimation;



  useEffect(() => {
    const fadeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    fadeAnimation.start();

    return () => fadeAnim.setValue(0); // Reset fade animation on unmount
  }, []);

  useEffect(() => {
    rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotationAnimation.start();

    return () => {
      rotateAnim.stopAnimation();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });


  return (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.loadingCircle,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        {title ? (<><Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Downloading
        </Animated.Text>
          <Animated.Text style={[styles.loadingTexts, { opacity: fadeAnim }]}>
            CCrReport
          </Animated.Text>
        </>)
          : (<><Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
            {languages.Krytrim[fontStyles.lang]}
          </Animated.Text>
            <Animated.Text style={[styles.loadingTexts, { opacity: fadeAnim }]}>
              {languages.by[fontStyles.lang]}
            </Animated.Text>
            <Animated.Text style={[styles.loadingTexts2, { opacity: fadeAnim }]}>
              {languages.Sindhuja[fontStyles.lang]}
            </Animated.Text></>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    // height: 50 * (height/50),
    height: '100%',
    zIndex: 3,
  },
  loadingContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCircle: {
    height: 90,
    width: 90,
    borderRadius: 100,
    padding: 50,
    borderWidth: 5,
    // backgroundColor:"rgba(0, 0, 0, 0.1)",
    // borderColor: "transparent",
    borderTopColor: 'rgba(0, 0, 0, 0.01)',
    borderBottomColor: 'rgba(0, 0, 0, 0.01)',
    borderLeftColor: 'rgba(152, 0, 0, 0.8)',
    borderRightColor: 'rgba(152, 0, 0, 0.8)',
    // position: "absolute",
  },
  loadingText: {
    color: fontStyles.colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    position: 'absolute',
    top: 30,
  },
  loadingTexts: {
    color: fontStyles.colors.black,
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    top: 47,
  },
  loadingTexts2: {
    color: fontStyles.colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    position: 'absolute',
    top: 60,
  },
});

export default AppLoader;
