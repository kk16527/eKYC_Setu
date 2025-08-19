import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function ENach(props) {
  return (
    <Svg
      width={24}
      height={24}
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
          d="M7 20.025V11h1.6c.117 0 .233.013.35.038.117.025.233.054.35.087l6.925 2.575c.233.084.42.234.563.45.141.217.212.442.212.675 0 .35-.12.634-.363.85-.241.217-.52.325-.837.325h-2.625a1.04 1.04 0 01-.188-.012.693.693 0 01-.162-.063l-1.6-.625-.325.975 1.925.675c.033.017.083.03.15.038.067.008.125.012.175.012H20c.533 0 1 .192 1.4.575.4.384.6.858.6 1.425l-7.975 3L7 20.025zM1 22V11h4v11H1zm11.925-10.95L8.675 6.8 10.1 5.4l2.825 2.825 5.675-5.65 1.4 1.4-7.075 7.075z"
          fill={fontStyles.colors.blueMagenta}
        />
      </G>
    </Svg>
  )
}

export default ENach;
