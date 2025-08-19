import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TextInputProps, TextInput} from 'react-native';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';

interface OutlinedTextFieldProps extends TextInputProps {
  label: string; // Label text
  value: string; // Input value
  onChangeText: (text: string) => void; // Callback for input changes
  rightIcon?: React.ReactNode; // Optional prop for the right icon
  leftIcon?: React.ReactNode; // Optional prop for the left icon
  maxLength?: number; // Maximum length for input
  keyboardType?: TextInputProps['keyboardType'];
  backColor?: string; // Background color for the input
  isMandatory?: boolean; // Whether the field is mandatory
  errorMessage?: string; // Error message to display if the field is invalid
  disabled?: any;
  showError?: any;
  ref?: any;
  disabled_op?: Boolean;
  style?: any;
  autoHeight?: Boolean;
  // height?:any
}

const InputWithValidation: FC<OutlinedTextFieldProps> = ({
  label,
  value,
  onChangeText,
  rightIcon,
  leftIcon,
  maxLength,
  keyboardType,
  disabled,
  backColor,
  isMandatory = true,
  errorMessage = 'This field is required',
  showError = false,
  ref,
  disabled_op,
  autoHeight = false, // Default false
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false); // Track if the field was interacted with
  const [inputHeight, setInputHeight] = useState(40); // Default height
  const [bankref, setBankRef] = useState(null);
  // Validation logic
  // const showError = isMandatory && isTouched && value.trim() === '';
  const value2 = value + '';

  return (
    <View style={[styles.container, {opacity: disabled_op ? 0.4 : 1}]}>
      {/* Static label with optional mandatory indicator */}
      <View
        style={[
          styles.labelContainer,
          backColor
            ? {backgroundColor: backColor}
            : {backgroundColor: fontStyles.colors.white},
          isMandatory && {top: -12},
        ]}>
        <Text style={styles.label}>{label}</Text>
        {isMandatory && <Text style={styles.mandatory}> *</Text>}
      </View>

      {/* Input field */}
      <View
        style={[
          styles.inputContainer,
          backColor
            ? {backgroundColor: backColor}
            : {backgroundColor: fontStyles.colors.white},
          // showError && { borderColor: fontStyles.colors.strongRed }, // Highlight border on error
        ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          value={value2}
          onChangeText={onChangeText}
          //  autoCapitalize="characters" // IFSC codes are always uppercase
          //   autoCorrect={false}         // Turn off auto-correct
          // onChangeText={(text) => onChangeText(text.toUpperCase())}
          autoCorrect={false}
          // autoCapitalize="characters" // IFSC codes are always uppercase
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={!disabled}
          // onContentSizeChange={(e) =>
          //  setInputHeight(e.nativeEvent.contentSize.height + 10)
          // }
          // style={[styles.input, { height: inputHeight,color: disabled ? fontStyles.colors.grey : fontStyles.colors.black }]}

          multiline={autoHeight} // Allow multiline only if autoHeight true
          onContentSizeChange={e => {
            if (autoHeight) {
              setInputHeight(e.nativeEvent.contentSize.height + 10);
            }
          }}
          style={[
            styles.input,
            {
              height: autoHeight ? inputHeight : 40,
              color: disabled
                ? fontStyles.colors.grey
                : fontStyles.colors.black,
            },
          ]}
          placeholderTextColor="#9E9E9E"
          onBlur={() => setIsTouched(true)} // Set touched state when focus is lost
          placeholder={`${languages.Enter[fontStyles.lang]} ${label}`}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {/* Error message */}
      {showError && (
        <Text style={[styles.errorText, {fontSize: 10}]}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    left: 8,
    // backgroundColor: fontStyles.colors.white,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    letterSpacing: 0.1,
    lineHeight: 20,
    color: fontStyles.colors.lightBrown,
  },
  mandatory: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    color: '#FF0000', // Red color for the asterisk
    alignItems: 'flex-end',
    top: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    borderRadius: 4,
    paddingHorizontal: 4,
    // height: 40,
    // backgroundColor: fontStyles.colors.white,
  },
  input: {
    flex: 1,
    fontSize: 12,
    padding: 8,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.black,
  },
  iconContainer: {
    marginHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    color: fontStyles.colors.strongRed,
    marginTop: 4,
    marginLeft: 8,
  },
});

export default InputWithValidation;
