import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

const Sales = ({ color }) => {
  return (
    <View style={styles.container}>
      <Svg width={65} height={32} viewBox="0 0 65 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_59121_4806)">
          <Path
            d="M36.5 10L38.79 12.29L33.91 17.17L29.91 13.17L22.5 20.59L23.91 22L29.91 16L33.91 20L40.21 13.71L42.5 16V10H36.5Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0_59121_4806">
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

export default Sales;