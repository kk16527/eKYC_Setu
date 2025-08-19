import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Rupee() {
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
          d="M13.725 21L7 14v-2h3.5c.883 0 1.646-.287 2.287-.863A3.523 3.523 0 0013.95 9H6V7h7.65a3.61 3.61 0 00-1.263-1.438A3.308 3.308 0 0010.5 5H6V3h12v2h-3.25c.233.283.442.592.625.925.183.333.325.692.425 1.075H18v2h-2.025c-.133 1.417-.717 2.604-1.75 3.563C13.192 13.52 11.95 14 10.5 14h-.725l6.725 7h-2.775z"
          fill={fontStyles.colors.black}
        />
      </G>
    </Svg>
  );
}

export default Rupee;
