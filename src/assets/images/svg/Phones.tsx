import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Phones(props) {
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
          d="M8 9V7h8v2H8zM7 23c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 015 21V3c0-.55.196-1.02.588-1.413A1.926 1.926 0 017 1h10c.55 0 1.02.196 1.413.587C18.803 1.98 19 2.45 19 3v18c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0117 23H7zm0-3v1h10v-1H7zm0-2h10V6H7v12zM7 4h10V3H7v1z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default Phones;
