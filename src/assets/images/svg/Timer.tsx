import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Timer() {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
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
        width={14}
        height={14}
      >
        <Path fill="#D9D9D9" d="M0 0H14V14H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M7 12.25c-.73 0-1.412-.139-2.049-.416a5.337 5.337 0 01-1.662-1.123A5.337 5.337 0 012.166 9.05 5.08 5.08 0 011.75 7c0-.73.139-1.412.416-2.049a5.336 5.336 0 011.123-1.662A5.336 5.336 0 014.95 2.166 5.08 5.08 0 017 1.75a5.21 5.21 0 014.083 1.954v-1.37h1.167v3.5h-3.5V4.666h1.604a4.335 4.335 0 00-1.473-1.284A3.937 3.937 0 007 2.917c-1.138 0-2.102.396-2.895 1.188C3.313 4.898 2.917 5.862 2.917 7c0 1.137.396 2.102 1.188 2.895.793.792 1.757 1.188 2.895 1.188a3.96 3.96 0 002.676-.991 3.9 3.9 0 001.349-2.509h1.196c-.146 1.332-.717 2.443-1.714 3.333-.996.89-2.165 1.334-3.507 1.334zm1.633-2.8L6.417 7.233v-3.15h1.166v2.684L9.45 8.633l-.817.817z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default Timer;

