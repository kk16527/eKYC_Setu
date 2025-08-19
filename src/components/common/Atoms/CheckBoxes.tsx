import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontStyles from '../../../assets/styles/constants';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onCheck: () => void;
  checkedColor: string;
  uncheckedColor: string;
}

const CheckBoxes: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  onCheck,
  checkedColor,
  uncheckedColor,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCheck}
        style={[
          styles.checkbox,
          {
            backgroundColor: isChecked ? checkedColor : uncheckedColor, // Dynamic background
            borderColor: isChecked ? checkedColor : uncheckedColor, // Dynamic border
          },
        ]}
      >
        {isChecked ? (
          <MaterialIcons name="check" size={14} color={fontStyles.colors.white} /> // Tick mark when checked
        ) : (
          <MaterialIcons name="close" size={14} color={fontStyles.colors.white} /> // X mark when unchecked
        )}
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
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: fontStyles.colors.black,
  },
});

export default CheckBoxes;
