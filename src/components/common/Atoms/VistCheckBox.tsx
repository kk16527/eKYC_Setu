import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontStyles from '../../../assets/styles/constants';

interface CheckboxProps {
  isChecked: boolean;
  onCheck: () => void;
  checkedColor: string;
}

const VistCheckBox: React.FC<CheckboxProps> = ({
  isChecked,
  onCheck,
  checkedColor,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onCheck}
        style={[
          styles.checkbox,
          {
            backgroundColor: isChecked ? fontStyles.colors.white : fontStyles.colors.silver,
            borderColor: isChecked ? checkedColor : 'transparent',
          },
        ]}
      >
        {isChecked && (
          <MaterialIcons name="check" size={12} color="#28ED28" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: fontStyles.colors.black,
  },
});

export default VistCheckBox;
