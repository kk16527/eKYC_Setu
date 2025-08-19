import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontStyles from '../../../../assets/styles/constants';

interface AddButtonWithIconProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  hideIcon: any;
  notMandatory: any;
}

const AddButtonWithIcon: React.FC<AddButtonWithIconProps> = ({ title, onPress, hideIcon, notMandatory }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {!hideIcon && (<AntDesign name="plus" size={18} color={fontStyles.colors.primary} />)}
        <Text style={styles.text}>{title}{notMandatory ? '' : ' *'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    // padding: 5,
    height: 40,
    backgroundColor: fontStyles.colors.paleRed,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    shadowColor: fontStyles.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,


  },
  text: {
    color: fontStyles.colors.deepRed,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
});

export default AddButtonWithIcon;
