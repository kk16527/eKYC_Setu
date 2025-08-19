import React from 'react';
import { View, StyleSheet } from 'react-native';
import fontStyles from '../../../assets/styles/constants';

interface CheckboxProps {
  label?: string;
  isChecked: boolean;
  onCheck: () => void;
  checkedColor: string;
  uncheckedColor: string;
}

const RadioButton: React.FC<CheckboxProps> = ({
  isChecked,
  onCheck,
  checkedColor,
  uncheckedColor,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor:  fontStyles.colors.grey, 
          },
        ]}
      >
              <View style={{backgroundColor: isChecked ?fontStyles.colors.primary:fontStyles.colors.white,width:'60%',height:'60%',borderRadius:100,}}></View>

      </View>
      {/* <Text style={styles.label}>{label}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent:'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 100,
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

export default RadioButton;
