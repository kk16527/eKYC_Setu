import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function OtherIncome(props) {
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
          d="M4 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 19v-7h2v7h9v2H4zm4-4c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 016 15V8h2v7h9v2H8zm4-4c-.55 0-1.02-.196-1.412-.588A1.926 1.926 0 0110 11V5c0-.55.196-1.02.588-1.413A1.926 1.926 0 0112 3h8c.55 0 1.02.196 1.413.587C21.803 3.98 22 4.45 22 5v6c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0120 13h-8zm0-2h8V7h-8v4z"
          fill="#904B3D"
        />
      </G>
    </Svg>
  )
}

export default OtherIncome;
