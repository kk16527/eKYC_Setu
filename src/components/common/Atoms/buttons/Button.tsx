// Button.tsx
import React, { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import fontStyles from '../../../../assets/styles/constants';

interface ButtonProps {
  title: string;
  variant: 'outlined' | 'contained';
  color: string;
  onPress: () => void;
  disabled?: boolean;
  isLoad?: boolean;
  style?: StyleProp<ViewStyle>; // ✅ Correct type
}

const Button: FC<ButtonProps> = ({ title, variant, color, onPress, disabled, isLoad, style }) => {
  const isContained = variant === 'contained';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          disabled
            ? { backgroundColor: '#b6b6b6', borderColor: '#ddd' }
            : isContained
            ? { backgroundColor: color, borderColor: color }
            : { backgroundColor: fontStyles.colors.white, borderColor: color },
          style, // ✅ Apply passed-in styles
        ]}
        onPress={() => { if (!disabled) onPress(); }}
      >
        {!isLoad ? (
          <Text
            style={[
              styles.buttonText,
              { color: isContained ? '#fff' : color },
            ]}
          >
            {title}
          </Text>
        ) : (
          <ActivityIndicator size={23} color={'#fff'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  button: {
    borderRadius: 30,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});

export default Button;
