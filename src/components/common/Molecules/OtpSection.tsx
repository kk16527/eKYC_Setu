import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import OtpBlock from '../Atoms/OtpBlock';

interface OtpSectionProps {
  otps: string[]; // Array of OTP strings
  handleOtp: (eotp: string[]) => void; // Function to handle OTP updates
  width?: any;
  height?: any;
}

const OtpSection: React.FC<OtpSectionProps> = ({
  otps,
  handleOtp,
  width,
  height,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const otpRefs = useRef<(TextInput | null)[]>([]);
  // const [newOtp,setNewOtp] = useState<any>(['', '', '', '', '', ''])

  useEffect(() => {
    if (otps.every((char:any) => char === '')) {
      otpRefs.current[0]?.focus();
    }
  }, [otps]);
  

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otps];
    newOtp[index] = value;

    if ((!value || value === '') && index > 0) {
      // If backspace and block is empty, focus the previous block
      otpRefs.current[index - 1]?.focus();
    } else if (value && index < otps.length - 1) {
      // Focus next input if available
      otpRefs.current[index + 1]?.focus();
    }

    handleOtp(newOtp);
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, [])
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const heightsize = (windowWidth + windowHeight) * (height / 540);
  const widthsize = (windowWidth + windowHeight) * (width / 510);

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otps.map((value: any, index: any) => (
          <View key={index} style={styles.block}>
            <OtpBlock
              ref={ref => (otpRefs.current[index] = ref)}
              value={value || ''}
              onChangeText={text => handleChange(text, index)}
              onBackspace={() => {
                if (index > 0) {
                  otpRefs.current[index - 1]?.focus();
                }
              }}
              isFocused={focusedIndex === index}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              width={widthsize}
              height={heightsize}
            />
            {index === 2 && <Text style={styles.separator}>-</Text>}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // alignItems: 'flex-start',
    // marginLeft:-5  
    // padding: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 30,
    marginBottom: 10,
    // paddingHorizontal: fontStyles.spacing.paddingHorizontal,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginHorizontal: 10,
  },
});

export default OtpSection;