import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function Trade({color}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M7 21l-5-5 5-5 1.425 1.4-2.6 2.6H21v2H5.825l2.6 2.6L7 21zm10-8l-1.425-1.4 2.6-2.6H3V7h15.175l-2.6-2.6L17 3l5 5-5 5z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default Trade;
