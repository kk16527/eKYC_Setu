import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import fontStyles from '../../../assets/styles/constants';

interface OtpBlockProps {
    value: string;
    onChangeText: (text: string) => void;
    onBackspace: () => void;
    isFocused: boolean;
    onFocus: () => void;
    onBlur: () => void;
    width?: any
    height?: any
}

const OtpBlock = forwardRef<TextInput, OtpBlockProps>(({ value, onChangeText, onBackspace, isFocused, onFocus, onBlur, height, width }, ref) => {

    return (
        <View style={styles.blockContainer}>
            <TextInput
                ref={ref as React.LegacyRef<TextInput>}
                style={[styles.block, isFocused && styles.focused, { height: height || 50, width: width || 45 }]}
                value={value}
                onChangeText={onChangeText}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && value === '') {
                        onBackspace();
                    }
                }}
                keyboardType="number-pad"
                maxLength={1}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    blockContainer: {
        marginHorizontal: 4,
    },
    block: {
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        borderColor: fontStyles.colors.lightGrey,
    },
    focused: {
        borderColor: fontStyles.colors.deepRed,  // Focused border color
    },
});

export default OtpBlock;