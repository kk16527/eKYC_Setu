import React, { FC, useState } from 'react';
import { View, StyleSheet, TextInputProps, ScrollView, TextInput, Text } from 'react-native';
import fontStyles from '../../../../assets/styles/constants';

interface DynamicInputFieldProps extends TextInputProps {
    label: string;
    placeholder: string;
    value: string;
    isMandatory?: boolean;
    onChangeText: (text: string) => void;
}

const BasicTextInputWithPadding: FC<DynamicInputFieldProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    isMandatory = false,
    ...props
}) => {
    const [isTouched, setIsTouched] = useState(false); // Track if the field was interacted with

    return (

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                {isMandatory && <Text style={styles.mandatory}> *</Text>}
            </View>
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    // defaultValue={value + " "}
                    defaultValue={value}
                    onChangeText={onChangeText}
                    // keyboardType={keyboardType}
                    placeholder={placeholder}
                    // maxLength={maxLength}
                    // editable={!disabled}
                    multiline={true}  // Allows multiple lines of input
                    scrollEnabled={true} // Enables scrolling inside the input
                    textAlignVertical="top" // Aligns text to start from the top
                    style={styles.input}
                    placeholderTextColor="#9E9E9E"
                    onBlur={() => setIsTouched(true)} // Set touched state when focus is lost
                    {...props}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        marginVertical: 10,
    },
    input: {
        flex: 1,
        fontSize: 12,
        padding: 8,
        marginTop: 5,
        minHeight: 100, // Ensures input has enough height
        textAlignVertical: 'top', // Text starts at the top
        color: fontStyles.colors.black,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: -10,
        left: 8,
        backgroundColor: fontStyles.colors.white,
        paddingHorizontal: 4,
        zIndex: 1,
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        letterSpacing: 0.1,
        lineHeight: 20,
        color: fontStyles.colors.lightBrown,
    },
    mandatory: {
        fontSize: 17,
        fontFamily: 'Montserrat-Regular',
        color: '#FF0000', // Red color for the asterisk
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: fontStyles.colors.darkGreyishVoilet,
        borderRadius: 4,
        paddingHorizontal: 4,
        height: 100,
        // backgroundColor: fontStyles.colors.white,
    },
});

export default BasicTextInputWithPadding;
