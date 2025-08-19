import * as React from 'react';
import Svg, { Mask, Path, G } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function DateField(props) {
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
                    d="M4 22a.967.967 0 01-.712-.288A.968.968 0 013 21v-5c0-.55.196-1.02.587-1.412A1.926 1.926 0 015 14v-4c0-.55.196-1.02.588-1.412A1.926 1.926 0 017 8h4V6.55c-.3-.2-.542-.442-.725-.725C10.092 5.542 10 5.2 10 4.8c0-.25.05-.496.15-.737.1-.242.25-.463.45-.663L12 2l1.4 1.4c.2.2.35.42.45.663.1.241.15.487.15.737 0 .4-.092.742-.275 1.025A2.503 2.503 0 0113 6.55V8h4c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v4c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v5c0 .283-.096.52-.288.712A.968.968 0 0120 22H4zm3-8h10v-4H7v4zm-2 6h14v-4H5v4z"
                    fill={fontStyles.colors.black}
                />
            </G>
        </Svg>
    )
}

export default DateField;
