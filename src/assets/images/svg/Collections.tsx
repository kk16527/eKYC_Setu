import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Collections({color}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M21.32 7.383h-4.16V5.136l-2.08-2.247h-4.16L8.84 5.136v2.247H4.68c-1.144 0-2.08 1.01-2.08 2.246v5.618c0 .842.416 1.55 1.04 1.943v3.674c0 1.247.925 2.247 2.08 2.247h14.56c1.154 0 2.08-1 2.08-2.247v-3.685a2.299 2.299 0 001.04-1.932V9.629c0-1.235-.936-2.246-2.08-2.246zm-10.4-2.247h4.16v2.247h-4.16V5.136zM4.68 9.629h16.64v5.618h-5.2v-3.37H9.88v3.37h-5.2V9.629zm9.36 6.741h-2.08v-2.247h2.08v2.247zm6.24 4.494H5.72v-3.37h4.16v1.123h6.24v-1.123h4.16v3.37z"
        fill={color}
      />
    </Svg>
  );
}

export default Collections;
