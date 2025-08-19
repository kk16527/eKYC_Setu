import React from 'react';
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg';

const Emailsvg = () => {
    return (
        <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clipPath="url(#clip0_58786_11701)">
                <Rect width="40" height="40" transform="translate(4 4)" fill="#49454F" fillOpacity="0.12" />
                <Path
                    d="M16 32C15.45 32 14.9792 31.8042 14.5875 31.4125C14.1958 31.0208 14 30.55 14 30V18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16H32C32.55 16 33.0208 16.1958 33.4125 16.5875C33.8042 16.9792 34 17.45 34 18V30C34 30.55 33.8042 31.0208 33.4125 31.4125C33.0208 31.8042 32.55 32 32 32H16ZM24 25L16 20V30H32V20L24 25ZM24 23L32 18H16L24 23ZM16 20V18V30V20Z"
                    fill="#48454E"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_58786_11701">
                    <Rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default Emailsvg;
