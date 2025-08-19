import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import fontStyles from "../../styles/constants";

function RoutesIcon({color}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59687_72636)">
        <Path
          d="M4.333 17.334v6.5h17.333v-6.5a2.173 2.173 0 00-2.166-2.167h-13a2.173 2.173 0 00-2.167 2.167zM19.5 19.5h-13v-2.166h13V19.5zM13 2.167a5.419 5.419 0 00-5.417 5.417L13 15.167l5.416-7.583A5.419 5.419 0 0013 2.167zm0 9.75L9.75 7.584A3.246 3.246 0 0113 4.334a3.246 3.246 0 013.25 3.25L13 11.917z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59687_72636">
          <Path fill={fontStyles.colors.white} d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default RoutesIcon;

