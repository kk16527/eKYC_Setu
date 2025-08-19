import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import fontStyles from '../../assets/styles/constants';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Splash = () => {

  return (
    <View style={styles.mainContainer}>
      {/* <SindhujaLogo style={styles.logo} width={width / 2} height={height / 2} /> */}
    <Image
        source={require('../../assets/images/logo.png')}
        style={{borderRadius:12}}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: fontStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
