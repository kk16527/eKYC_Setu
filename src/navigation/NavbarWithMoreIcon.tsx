import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fontStyles from '../assets/styles/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import More from '../assets/images/svg/More';

interface NavbarProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  checkOut?: boolean;
  isCheckedOut?: boolean;
  onCheckOutPress?: () => void;
  isRefresh?: any;
  isRefreshfun?: any;
  isNoBurger?:any;
}

const NavbarWithMoreIcon: React.FC<NavbarProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  checkOut,
  isCheckedOut,
  onCheckOutPress,
  isRefresh,
  isRefreshfun,
  isNoBurger
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.navbar}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              handleBackPress()
            }
          }}
          style={{padding: 6}}>
          <AntDesign name="left" size={16} color={'#000'} />
        </TouchableOpacity>
      )}
      <View
        style={{
          width: !showBackButton?"90%":'80%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center', width: '90%'}}>
          <Text
            style={[
              styles.navTitle,
              {textAlign:'center'},
            ]}>
            {title}
          </Text>
        </View>
        {checkOut && (
          <TouchableOpacity
            onPress={onCheckOutPress}
            style={{
              width: 38,
              height: 38,
              borderRadius: 20,
              backgroundColor: isCheckedOut
                ? fontStyles.colors.primary
                : fontStyles.colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              right: 30,
              // marginLeft: 10,
            }}>
            <Image
              source={require('../assets/images/checkIn.png')}
              style={{width: '70%', height: '70%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {isRefresh && (
          <TouchableOpacity
            onPress={isRefreshfun}
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              backgroundColor: isCheckedOut
                ? fontStyles.colors.primary
                : fontStyles.colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              right: 30,
            }}>
            <AntDesign name="reload1" size={16} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>
     {!isNoBurger&&( <TouchableOpacity
        onPress={
          onBackPress
            ? onBackPress
            : () => {
                navigation.navigate('SideDrawer');
              }
        }>
        <More />
      </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: fontStyles.colors.GreyRed,
    height: 50,
    paddingHorizontal: 16,
    // width: '100%',
  },
  iconButton: {
    // padding: 8,
  },
  navTitle: {
    // flex: 1,
    fontSize: 16, //20 before
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
    lineHeight: 24,
    color: '#000',
    left: 10,
    // right: 0,
  },
});

export default NavbarWithMoreIcon;
