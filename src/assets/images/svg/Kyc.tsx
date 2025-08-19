import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Kyc(props) {
  return (
    <Svg
      width={20}
      height={20}
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
          d="M14 13h5v-2h-5v2zm0-3h5V8h-5v2zm-9 6h8v-.55c0-.75-.367-1.346-1.1-1.787C11.167 13.22 10.2 13 9 13s-2.167.22-2.9.662C5.367 14.104 5 14.7 5 15.45V16zm4-4c.55 0 1.02-.196 1.412-.588.392-.391.588-.862.588-1.412 0-.55-.196-1.02-.588-1.412A1.926 1.926 0 009 8c-.55 0-1.02.196-1.412.588A1.926 1.926 0 007 10c0 .55.196 1.02.588 1.412.391.392.862.588 1.412.588zm-5 8c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 18V6c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 4h16c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v12c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 20H4zm0-2h16V6H4v12z"
          fill={fontStyles.colors.darkBrown}
        />
      </G>
    </Svg>
  )
}

export default Kyc;
