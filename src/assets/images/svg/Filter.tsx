import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Filter(props) {
  return (
    <Svg
      width={34}
      height={35}
      viewBox="0 0 34 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path transform="translate(0 .08)" fill={fontStyles.colors.white} d="M0 0H34V34H0z" />
      <Path
        d="M15.938 16.018h12.75a1.062 1.062 0 110 2.125h-12.75a1.063 1.063 0 010-2.125zm9.562-8.5a1.062 1.062 0 001.063 1.062h2.125a1.063 1.063 0 000-2.125h-2.125A1.063 1.063 0 0025.5 7.518zM21.25 4.33v2.125H5.312a1.062 1.062 0 000 2.125H21.25v2.125a1.062 1.062 0 102.125 0V4.33a1.062 1.062 0 10-2.125 0zm0 22.313a1.062 1.062 0 001.063 1.062h6.375a1.063 1.063 0 000-2.125h-6.375a1.062 1.062 0 00-1.063 1.063zM17 23.455v2.125H5.312a1.062 1.062 0 100 2.125H17v2.125a1.062 1.062 0 102.125 0v-6.375a1.062 1.062 0 10-2.125 0zm-6.375-9.562v2.125H5.312a1.062 1.062 0 100 2.125h5.313v2.125a1.062 1.062 0 102.125 0v-6.375a1.062 1.062 0 10-2.125 0z"
        fill="#904B3D"
        stroke="#904B3D"
        strokeWidth={0.500682}
      />
    </Svg>
  )
}

export default Filter;

