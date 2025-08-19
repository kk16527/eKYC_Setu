import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Cash(props) {
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
          d="M14 13a2.893 2.893 0 01-2.125-.875A2.893 2.893 0 0111 10c0-.833.292-1.542.875-2.125A2.893 2.893 0 0114 7c.833 0 1.542.292 2.125.875S17 9.167 17 10s-.292 1.542-.875 2.125A2.893 2.893 0 0114 13zm-7 3c-.55 0-1.02-.196-1.412-.588A1.926 1.926 0 015 14V6c0-.55.196-1.02.588-1.412A1.926 1.926 0 017 4h14c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v8c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0121 16H7zm2-2h10c0-.55.196-1.02.587-1.412A1.926 1.926 0 0121 12V8c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 0119 6H9c0 .55-.196 1.02-.588 1.412A1.926 1.926 0 017 8v4c.55 0 1.02.196 1.412.588.392.391.588.862.588 1.412zm11 6H3c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 011 18V7h2v11h17v2z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default Cash;
