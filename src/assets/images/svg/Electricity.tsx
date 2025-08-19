import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Electricity(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M7 22l4-7.5-8-1L15 2h2l-4 7.5 8 1L9 22H7zm5.55-6.175l4.025-3.85-6.725-.85L11.425 8.2l-4 3.85 6.7.825-1.575 2.95z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default Electricity;
