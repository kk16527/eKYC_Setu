import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Roof(props) {
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
          d="M9 20v-6h6v6H9zm2-2h2v-2h-2v2zm-8.8-5L1 11.4 12 3l4 3.05V4h3v4.35l4 3.05-1.2 1.6L12 5.525 2.2 13z"
          fill={fontStyles.colors.black}
        />
      </G>
    </Svg>
  )
}

export default Roof;
