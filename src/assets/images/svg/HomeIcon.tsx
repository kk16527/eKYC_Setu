import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function HomeIcon({color}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59687_72608)">
        <Path
          d="M13 6.164l5.417 4.875V19.5H16.25V13h-6.5v6.5H7.584v-8.46L13 6.163zm0-2.914L2.167 13h3.25v8.667h6.5v-6.5h2.167v6.5h6.5V13h3.25L13 3.25z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59687_72608">
          <Path fill={fontStyles.colors.white} d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default HomeIcon;

