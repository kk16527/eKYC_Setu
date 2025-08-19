import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Camera() {
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
          d="M3 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 011 19V7c0-.55.196-1.02.587-1.412A1.926 1.926 0 013 5h3.15L8 3h6v2H8.875L7.05 7H3v12h16v-9h2v9c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0119 21H3zM19 7V5h-2V3h2V1h2v2h2v2h-2v2h-2zm-8 10.5c1.25 0 2.313-.438 3.188-1.313.874-.875 1.312-1.937 1.312-3.187 0-1.25-.438-2.313-1.313-3.188C13.313 8.938 12.25 8.5 11 8.5c-1.25 0-2.313.438-3.188 1.313C6.938 10.687 6.5 11.75 6.5 13c0 1.25.438 2.313 1.313 3.188S9.75 17.5 11 17.5zm0-2c-.7 0-1.292-.242-1.775-.725C8.742 14.292 8.5 13.7 8.5 13s.242-1.292.725-1.775C9.708 10.742 10.3 10.5 11 10.5s1.292.242 1.775.725c.483.483.725 1.075.725 1.775s-.242 1.292-.725 1.775c-.483.483-1.075.725-1.775.725z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default Camera;
