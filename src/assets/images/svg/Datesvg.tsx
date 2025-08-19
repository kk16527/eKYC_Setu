import React from 'react';
import Svg, { G, Rect, Path, ClipPath, Defs } from 'react-native-svg';
import fontStyles from '../../styles/constants';

const Datesvg = ({backgroundColor}) => {
    return (
        <Svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Defs>
                <ClipPath id="clip0">
                    <Rect width="40" height="40" rx="20" fill="white" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#clip0)">
                <Rect width="40" height="40" fill={backgroundColor} fillOpacity="0.12" />
                <Path
                    d="M17 24.5C16.3 24.5 15.7083 24.2583 15.225 23.775C14.7417 23.2917 14.5 22.7 14.5 22C14.5 21.3 14.7417 20.7083 15.225 20.225C15.7083 19.7417 16.3 19.5 17 19.5C17.7 19.5 18.2917 19.7417 18.775 20.225C19.2583 20.7083 19.5 21.3 19.5 22C19.5 22.7 19.2583 23.2917 18.775 23.775C18.2917 24.2583 17.7 24.5 17 24.5ZM13 30C12.45 30 11.9792 29.8042 11.5875 29.4125C11.1958 29.0208 11 28.55 11 28V14C11 13.45 11.1958 12.9792 11.5875 12.5875C11.9792 12.1958 12.45 12 13 12H14V10H16V12H24V10H26V12H27C27.55 12 28.0208 12.1958 28.4125 12.5875C28.8042 12.9792 29 13.45 29 14V28C29 28.55 28.8042 29.0208 28.4125 29.4125C28.0208 29.8042 27.55 30 27 30H13ZM13 28H27V18H13V28Z"
                    fill={fontStyles.colors.black}
                />
            </G>
        </Svg>
    );
};

export default Datesvg;
