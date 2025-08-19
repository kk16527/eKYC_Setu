import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import fontStyles from "../../styles/constants";

function Logout({color}) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59733_14429)">
        <Path
          d="M12.75 6l-1.057 1.058 1.184 1.192H6.75v1.5h6.127l-1.184 1.185L12.75 12l3-3-3-3zm-9-2.25H9v-1.5H3.75c-.825 0-1.5.675-1.5 1.5v10.5c0 .825.675 1.5 1.5 1.5H9v-1.5H3.75V3.75z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59733_14429">
          <Path fill={fontStyles.colors.white} d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Logout;

