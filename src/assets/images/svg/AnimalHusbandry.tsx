import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';

function AnimalHusbandry(props) {
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
          d="M4.85 22v-9.875h2V20h7v-4.825l2.625-2.625a5.37 5.37 0 001.125-1.625c.267-.6.4-1.242.4-1.925 0-.667-.137-1.3-.413-1.9a5.81 5.81 0 00-1.112-1.625l-.625-.65L12.675 8h-4L7.6 9.075l-1.425-1.4L7.85 6h4l4-4 2.05 2.05a7.302 7.302 0 011.55 2.263C19.817 7.154 20 8.05 20 9c0 .95-.183 1.846-.55 2.688a7.302 7.302 0 01-1.55 2.262L15.85 16v6h-11zm4.925-4.675l-5.2-5.2a1.912 1.912 0 01-.425-.65c-.1-.25-.15-.508-.15-.775a1.975 1.975 0 01.575-1.4l2.1-2.125 3.1 3.075c.467.467.83 1.004 1.088 1.613.258.608.387 1.245.387 1.912a4.974 4.974 0 01-1.475 3.55z"
          fill="#904B3D"
        />
      </G>
    </Svg>
  )
}

export default AnimalHusbandry;
