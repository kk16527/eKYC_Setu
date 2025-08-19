import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Star(props) {

  return (
    <Svg
      width={20}
      height={20 * (12 / 14)} // Maintain aspect ratio
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.872 9.6l2.602-1.83 2.602 1.83L9.1 6.63l2.602-1.71H8.515L7.474 1.8l-1.04 3.12H3.245l2.602 1.71-.976 2.97zM7.474 12a6.797 6.797 0 0 1-4.602-1.755A6.057 6.057 0 0 11.48 8.34 5.454 5.454 0 0 1.969 6c0-.83.17-1.61.512-2.34a6.057 6.057 0 0 11.39-1.905A6.797 6.797 0 0 17.474 0a6.798 6.798 0 0 14.603 1.755 6.056 6.056 0 0 11.391 1.905c.341.73.512 1.51.512 2.34 0 .83-.17 1.61-.512 2.34a6.056 6.056 0 0 1-1.39 1.905A6.798 6.798 0 0 17.474 12z"
        fill="#33A949"
      />
    </Svg>
  );
}

export default Star;