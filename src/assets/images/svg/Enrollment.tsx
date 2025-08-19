import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Enrollment() {
  return (
    <Svg
      width={24}
      height={22}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_59641_55099)">
        <Path
          d="M19 1.793H5c-1.11 0-2 .806-2 1.79v12.535c0 .985.89 1.79 2 1.79h4l3 2.686 3-2.685h4c1.1 0 2-.806 2-1.791V3.584c0-.985-.9-1.791-2-1.791zm0 14.325h-4.83l-.59.528L12 18.061l-1.59-1.424-.58-.52H5V3.585h14v12.534zM12 9.85c1.65 0 3-1.209 3-2.686 0-1.477-1.35-2.686-3-2.686S9 5.688 9 7.165c0 1.477 1.35 2.686 3 2.686zm0-3.581c.55 0 1 .402 1 .895 0 .492-.45.895-1 .895s-1-.403-1-.895c0-.493.45-.895 1-.895zm6 7.681c0-2.238-3.97-3.205-6-3.205s-6 .967-6 3.205v1.272h12V13.95zm-9.52-.519c.74-.457 2.23-.895 3.52-.895s2.78.438 3.52.895H8.48z"
          fill="#534340"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_59641_55099">
          <Path
            fill={fontStyles.colors.white}
            transform="translate(0 .002)"
            d="M0 0H24V21.4875H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Enrollment;

