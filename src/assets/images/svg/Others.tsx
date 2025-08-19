import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

const Others = ({ color }) => {
  return (
    <View style={styles.container}>
      <Svg width={65} height={32} viewBox="0 0 65 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_59121_4819)">
          <Path
            d="M32.5 6C26.98 6 22.5 10.48 22.5 16C22.5 21.52 26.98 26 32.5 26C38.02 26 42.5 21.52 42.5 16C42.5 10.48 38.02 6 32.5 6ZM32.5 24C28.09 24 24.5 20.41 24.5 16C24.5 11.59 28.09 8 32.5 8C36.91 8 40.5 11.59 40.5 16C40.5 20.41 36.91 24 32.5 24Z"
            fill={color}
          />
          <Path
            d="M28.5 20C29.6046 20 30.5 19.1046 30.5 18C30.5 16.8954 29.6046 16 28.5 16C27.3954 16 26.5 16.8954 26.5 18C26.5 19.1046 27.3954 20 28.5 20Z"
            fill={color}
          />
          <Path
            d="M32.5 14C33.6046 14 34.5 13.1046 34.5 12C34.5 10.8954 33.6046 10 32.5 10C31.3954 10 30.5 10.8954 30.5 12C30.5 13.1046 31.3954 14 32.5 14Z"
            fill={color}
          />
          <Path
            d="M36.5 20C37.6046 20 38.5 19.1046 38.5 18C38.5 16.8954 37.6046 16 36.5 16C35.3954 16 34.5 16.8954 34.5 18C34.5 19.1046 35.3954 20 36.5 20Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_59121_4819">
            <Rect width={24} height={24} fill="white" transform="translate(20.5 4)" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add styles for the container if needed (e.g., margin, padding)
  },
});

export default Others;
