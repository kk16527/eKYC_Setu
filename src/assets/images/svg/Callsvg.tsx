import React from 'react';
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg';
import fontStyles from '../../styles/constants';

const Callsvg = () => {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <Defs>
        <ClipPath id="clip0_58758_14964">
          <Rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_58758_14964)">
        <Rect width="40" height="40" transform="translate(4 4)" fill="#49454F" fillOpacity="0.12" />
        <Path
          d="M18.62 22.79C20.06 25.62 22.38 27.94 25.21 29.38L27.41 27.18C27.69 26.9 28.08 26.82 28.43 26.93C29.55 27.3 30.75 27.5 32 27.5C32.2652 27.5 32.5196 27.6054 32.7071 27.7929C32.8946 27.9804 33 28.2348 33 28.5V32C33 32.2652 32.8946 32.5196 32.7071 32.7071C32.5196 32.8946 32.2652 33 32 33C27.4913 33 23.1673 31.2089 19.9792 28.0208C16.7911 24.8327 15 20.5087 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15H19.5C19.7652 15 20.0196 15.1054 20.2071 15.2929C20.3946 15.4804 20.5 15.7348 20.5 16C20.5 17.25 20.7 18.45 21.07 19.57C21.18 19.92 21.1 20.31 20.82 20.59L18.62 22.79Z"
          fill={fontStyles.colors.black}
        />
      </G>
    </Svg>
  );
};

export default Callsvg;
