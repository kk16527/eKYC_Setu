import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontStyles from '../../../../assets/styles/constants';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onCheck: () => void;
  checkedColor: string;
  uncheckedColor: string;
  unchecked?: boolean;
  borderColorWhenUnchecked?: string;
}

const SquareCheckBoxes: React.FC<CheckboxProps> = ({
  isChecked,
  onCheck,
  checkedColor,
  uncheckedColor,
  unchecked = false,
  borderColorWhenUnchecked = fontStyles.colors.black, 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCheck}
        style={[
          styles.checkbox,
          {
            backgroundColor: isChecked ? checkedColor : uncheckedColor, // Dynamic background
            borderColor: isChecked ? checkedColor : fontStyles.colors.black, // Dynamic border
          },
        ]}
      >
        {isChecked ? (
          <MaterialIcons name="check" size={14} color={"#fff"} />
        ) : unchecked ? (
          <MaterialIcons name="close" size={14} color={"#fff"} />
        ) : null}
      </TouchableOpacity>
      {/* <Text style={styles.label}>{label}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderColor: fontStyles.colors.darkBrown,
  },
  label: {
    fontSize: 16,
    color: fontStyles.colors.black,
  },
});

export default SquareCheckBoxes;
