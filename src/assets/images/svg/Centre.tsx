import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Centre() {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59694_9942)" fill={fontStyles.colors.black}>
        <Path d="M6.5 10h-2v7h2v-7zM21 19H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74zm0-2.26L2 6v2h19V6l-9.5-5zM12.316 12.727V10h-1.79v2.727H7.842v1.819h2.684v2.727h1.79v-2.727H15v-1.819h-2.684z" />
      </G>
      <Defs>
        <ClipPath id="clip0_59694_9942">
          <Path fill={fontStyles.colors.white} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Centre;

