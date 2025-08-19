import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function Status({color}) {
  return (
    <Svg
      width={20}
      height={20}
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
          d="M3 20v-2h18v2H3zM3 6V4h18v2H3zm2 10c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 013 14v-4c0-.55.196-1.02.587-1.412A1.926 1.926 0 015 8h14c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v4c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0119 16H5zm0-2h14v-4H5v4z"
          fill={color}
        />
      </G>
    </Svg>
  )
}

export default Status;
