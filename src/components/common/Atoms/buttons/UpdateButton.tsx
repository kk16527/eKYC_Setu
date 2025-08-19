import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import fontStyles from '../../../../assets/styles/constants';

interface AddButtonWithIconProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const UpdateButton: React.FC<AddButtonWithIconProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
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
    backgroundColor: fontStyles.colors.ghostwhite,
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
    color: fontStyles.colors.darkslateblue,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
});

export default UpdateButton;
