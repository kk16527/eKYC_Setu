import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function Bank({color}) {
  return (
    <Svg
      width={15}
      height={15}
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
          d="M5 17v-7h2v7H5zm6 0v-7h2v7h-2zm-9 4v-2h20v2H2zm15-4v-7h2v7h-2zM2 8V6l10-5 10 5v2H2zm4.45-2h11.1L12 3.25 6.45 6z"
          fill={color}
        />
      </G>
    </Svg>
  )
}

export default Bank;
