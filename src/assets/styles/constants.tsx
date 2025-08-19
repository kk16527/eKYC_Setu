import {Appearance} from 'react-native';

const currentTheme = Appearance.getColorScheme();
const styles = () => {
  const isDarkTheme = currentTheme === 'dark' ? true : false;

  return {
    sizes: {
      small: 12,
      medium: 16,
      large: 20,
      extraLarge: 24,
      title: 30,
      subtitle: 18,
    },
    colors: {
      primary: '#904B3D', // Button Color
      secondary: '#9CF1F0', //  blue secondary color
      deepBlack: isDarkTheme ? '#ddd' : '#1C1B20', // title color
      greyBlack: isDarkTheme ? '#fff' : '#48454E', // sub title color
      black: isDarkTheme ? '#fff' : '#000000', // Icon color of text input
      GreyRed: '#FCEAE6', // nav bar color
      paleRed: '#FFF0EE', // Card Color
      deepRed: '#980000', // red color(border color etc)
      lightGrey: '#9095A1',
      white: isDarkTheme ? '#1a1919' : '#FFFFFF',
      lightPink: '#FFF8F6', // text color with black background.
      lightBrown: isDarkTheme ? '#fff' : '#534340',
      lightbrown: '#534340',
      darkBrown: isDarkTheme ? '#ddd' : '#231917', // font color
      darkbrown: '#231917', // font color
      darkPink: '#85736F', // secondary text color,border color,
      darkGreen: '#127A3F', // Radio button and check box colors(checked color)
      strongRed: '#BA1A1A', // Radio button and check box colors(unchecked color)
      grey: 'grey',
      ghostwhite: '#F8F2FA', // Button back ground color
      darkslateblue: '#64558F', // Buttonn text (above botton color text)
      silver: '#C2C2C2', // silver color
      blueMagenta: '#1C1B1F',
      cyan: '#002020', // text color
      darkGrey: '#1D1B201F', // back ground of document/ payment signing
      diesel: isDarkTheme ? '#ddd' : '#392E2C',
      darkslategray: '#333333',
      dimgray: '#656565CC',
      pink: '#D8C2BD',
      forestgreen: '#33A949',
      ashGrey: isDarkTheme ? '#fff' : '#242424',
      darkGreyishRed: '#979797',
      palePink: '#FFD9E3',
      strongOrange: '#D8681D',
      limeGreen: '#03B159',
      purple: '#B795FF',
      dimGray: '#D3D3D3',
      lawnGreen: isDarkTheme ? '#904B3D' : '#FDF7FF',
      night: '#CAC4CF',
      darkGreyishVoilet: '#79757F',
      gainsBoro: '#DDD',
      darkYellow: '#FFDF6F',
      lightGreyBlue: '#F1F2F8',
      pastelPink: '#FFDAD4',
      darkRed: '#927F7B',
      dimGrey: '#ccc',
      moderateViolet: '#6938D3',
      lightMaroon: '#7D526014',
      lightBlack: '#6F6F6F',
      darkMaroon: '#410002',
      darkOrange: '#FFDAD3',
      lightBlue: '#F1FFFE',
      lightishGrey: '#49454F14',
      davGrey: '#555',
      shadeGrey: '#E0E0E0',
      greyWhite: '#EAEAEA',
      transparentBlack: '#0000004D',
      cetaBlue: '#00000033',
      lightOrange: '#FF5733',
      green: '#4CAF50',
      pastelWhite: '#FFFBFB',
    },
    weight: {
      light: '300', // Thin or light text
      regular: '400', // Normal text
      medium: '500', // Slightly bolder than regular
      semiBold: '600', // Between medium and bold
      bold: '700', // Bold text
      extraBold: '800',
    },
    spacing: {
      paddingHorizontal: 10,
    },
    lang: 'en',
  };
};

let fontStyles = styles();
export default fontStyles;
