import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Sales2({color}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59687_72615)">
        <Path
          d="M21.667 9.046v11.537H19.5v-8.666h-13v8.666H4.334V9.046L13 5.579l8.667 3.467zm2.167 13.704V7.583L13 3.25 2.167 7.583V22.75h6.5v-8.667h8.667v8.667h6.5zm-11.917-2.167H9.75v2.167h2.167v-2.167zm2.167-3.25h-2.167V19.5h2.167v-2.167zm2.166 3.25h-2.166v2.167h2.166v-2.167z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59687_72615">
          <Path fill={fontStyles.colors.white} d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Sales2;

