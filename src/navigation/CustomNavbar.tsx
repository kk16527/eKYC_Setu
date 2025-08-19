import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontStyles from '../assets/styles/constants';

interface CustomNavbarProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    showSignInButton?: boolean;
    onSignInPress?: () => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({
    title,
    showBackButton = true,
    onBackPress,
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.navbar}>
            {showBackButton && (
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={22} color={'#000'} />
                </TouchableOpacity>
            )}
            <Text style={styles.navTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: fontStyles.colors.GreyRed,
        // paddingHorizontal: 16,
    },
    backButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    navTitle: {
        flex: 1,
        fontSize: 16,//before 22
        fontFamily: 'Montserrat-Medium',
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.5,
        // textAlign: 'left',
        // textDecorationLine: 'none',
        textAlign: 'center',
        color: '#000',
    },
});

export default CustomNavbar;
