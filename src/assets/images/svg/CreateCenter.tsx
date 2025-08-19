import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function CreateCenter() {
  return (
    <Svg
      width={24}
      height={23}
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59641_55107)">
        <Path
          d="M17 11.673c0-2.471-2.24-4.477-5-4.477s-5 2.006-5 4.477c0 2.471 2.24 4.477 5 4.477s5-2.006 5-4.477zm-5 2.686c-1.65 0-3-1.209-3-2.686 0-1.477 1.35-2.686 3-2.686s3 1.209 3 2.686c0 1.477-1.35 2.686-3 2.686zm-7 0H3v3.581c0 .985.9 1.79 2 1.79h4v-1.79H5V14.36zm0-8.953h4v-1.79H5c-1.1 0-2 .805-2 1.79v3.581h2V5.406zm14-1.79h-4v1.79h4v3.581h2V5.406c0-.985-.9-1.79-2-1.79zm0 14.324h-4v1.79h4c1.1 0 2-.805 2-1.79V14.36h-2v3.581z"
          fill="#534340"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59641_55107">
          <Path
            fill={fontStyles.colors.white}
            transform="translate(0 .93)"
            d="M0 0H24V21.4875H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CreateCenter;

