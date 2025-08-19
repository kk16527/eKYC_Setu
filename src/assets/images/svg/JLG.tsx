import * as React from 'react';
import Svg, {Mask, Path, G} from 'react-native-svg';
import fontStyles from '../../styles/constants';

function JLG({color = fontStyles.colors.white, ...props}) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={18}
        height={18}>
        <Path fill="#D9D9D9" d="M0 0H18V18H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M12 6V3.75H6V6H4.5V2.25h9V6H12zm1.5 3.375c.213 0 .39-.072.534-.216a.726.726 0 00.216-.534.726.726 0 00-.216-.534.726.726 0 00-.534-.216.726.726 0 00-.534.216.726.726 0 00-.216.534c0 .213.072.39.216.534a.726.726 0 00.534.216zM12 14.25v-3H6v3h6zm1.5 1.5h-9v-3h-3v-4.5c0-.638.219-1.172.656-1.603A2.186 2.186 0 013.75 6h10.5c.637 0 1.172.216 1.603.647.431.431.647.965.647 1.603v4.5h-3v3zm1.5-4.5v-3a.726.726 0 00-.216-.534.726.726 0 00-.534-.216H3.75a.726.726 0 00-.534.216A.726.726 0 003 8.25v3h1.5v-1.5h9v1.5H15z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default JLG;
