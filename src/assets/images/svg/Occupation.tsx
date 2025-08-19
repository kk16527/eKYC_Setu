import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Occupation(props) {
  return (
    <Svg
      width={22}
      height={22}
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
          d="M4 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 19V8c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 6h4V4c0-.55.196-1.02.588-1.413A1.926 1.926 0 0110 2h4c.55 0 1.02.196 1.412.587C15.804 2.98 16 3.45 16 4v2h4c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v11c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 21H4zm6-15h4V4h-4v2zm10 9h-5v2H9v-2H4v4h16v-4zm-9 0h2v-2h-2v2zm-7-2h5v-2h6v2h5V8H4v5z"
          fill={fontStyles.colors.black}
        />
      </G>
    </Svg>
  )
}

export default Occupation;
