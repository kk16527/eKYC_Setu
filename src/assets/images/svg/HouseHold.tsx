import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function HouseHold(props) {
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
          d="M4 21v-9.375L2.2 13 1 11.4l3-2.3V6h2v1.575L12 3l11 8.4-1.2 1.575-1.8-1.35V21H4zm2-2h5v-4h2v4h5v-8.9l-6-4.575L6 10.1V19zM4 5c0-.833.292-1.542.875-2.125A2.893 2.893 0 017 2c.283 0 .52-.096.713-.288A.968.968 0 008 1h2c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 017 4a.968.968 0 00-.713.287A.968.968 0 006 5H4z"
          fill="#904B3D"
        />
      </G>
    </Svg>
  )
}

export default HouseHold;
