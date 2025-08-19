import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Rooms(props) {
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
          d="M6 17h1.5v-1.5h9V17H18v-4.15c0-.5-.137-.946-.413-1.338a2.412 2.412 0 00-1.087-.862V9c0-.55-.196-1.02-.588-1.412A1.926 1.926 0 0014.5 7h-5c-.55 0-1.02.196-1.412.588A1.926 1.926 0 007.5 9v1.65c-.45.183-.813.47-1.088.862A2.27 2.27 0 006 12.85V17zm1.5-3v-1.15c0-.233.083-.433.25-.6a.818.818 0 01.6-.25h7.3c.233 0 .433.083.6.25.167.167.25.367.25.6V14h-9zM9 10.5v-2h6v2H9zM4 22c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 20V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 014 2h16c.55 0 1.02.196 1.413.587C21.803 2.98 22 3.45 22 4v16c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 22H4zm0-2h16V4H4v16z"
          fill={fontStyles.colors.black}
        />
      </G>
    </Svg>
  )
}

export default Rooms;
