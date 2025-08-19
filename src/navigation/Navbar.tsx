import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontStyles from '../assets/styles/constants';

interface NavbarProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
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
                    <AntDesign name="left" size={16} color="#231917" />
                </TouchableOpacity>
            )}
            <Text style={styles.navTitle}>{title}</Text>
            {showBackButton && <View style={styles.spacer} />}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: fontStyles.colors.GreyRed ,
        paddingHorizontal: 16,
    },
    backButton: {
        // paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitle: {
        flex: 1, // Takes the remaining space between backButton and spacer
        fontSize: 16,//before 20
        fontFamily: 'Montserrat-Medium',
        color: "#000",
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    spacer: {
        width: 40, // Ensures title stays centered by balancing the backButton width
    },
});

export default Navbar;
