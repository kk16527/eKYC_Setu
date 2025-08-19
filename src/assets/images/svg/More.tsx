import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function More(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M3 18v-2h18v2H3zm0-5v-2h18v2H3zm0-5V6h18v2H3z" fill="#231917" />
    </Svg>
  )
}

export default More;

