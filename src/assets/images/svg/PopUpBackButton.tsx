import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function PopUpBackButton(props) {
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.25 18.56L0 13.173V5.474L5.25.086h7.5L18 5.474v7.698l-5.25 5.389h-7.5zm.9-4.874L9 10.76l2.85 2.925 1.4-1.436-2.85-2.926 2.85-2.925-1.4-1.437L9 7.886 6.15 4.961l-1.4 1.437L7.6 9.323 4.75 12.25l1.4 1.436zm-.05 2.822h5.8L16 12.3V6.347l-4.1-4.208H6.1L2 6.347V12.3l4.1 4.208z"
        fill={fontStyles.colors.black}
        // fill={'000#'}
      />
    </Svg>
  );
}

export default PopUpBackButton;
