import { TextInput } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export const TextBox = ({ label, style, rightIcon }) => {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={[styles.txtBoxInput, style]}
      theme={{
        colors: { primary: '#000000', background: '#FFFFFF' },
        roundness: 5,
        fonts: {
          regular: { fontSize: 16 },
        },
        placeholderStyle: {
          fontSize: 12, // Decrease placeholder font size
        },
        labelStyle: {
          fontSize: 12,  // Decrease the label font size
        }
      }}
      right={rightIcon && <TextInput.Icon name={rightIcon} />} // Render icon at the end if provided
    />
  );
};

export const SmallTextBox = ({ label }) => {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={styles.smallTxtBox}
      theme={{
        colors: { primary: '#000000', background: '#FFFFFF' },
        placeholderStyle: {
          fontSize: 10, // Decrease placeholder font size
        },
        labelStyle: {
          fontSize: 12,  // Decrease the label font size
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  txtBoxInput: {
    height: height / 18,
    marginTop: height / 150,
  },
  smallTxtBox: {
    height: height / 18,
    width: width / 1.2,
  },
});
