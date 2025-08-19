import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import fontStyles from '../../../../assets/styles/constants';

interface ProgressProps {
    label: string;
    progress?: number;
    isActive?: boolean;
    onPress?: () => void;
}

const ProgressBarWithText: React.FC<ProgressProps> = ({ label, progress, isActive, onPress }) => {
    // Example progress value

    const progressPercentage = progress * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <View style={[styles.circle, isActive && styles.activeCircle,]} />
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    text: {
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
        fontWeight: '600',
        color: fontStyles.colors.lightBlack,
        // lineHeight: 8,
        letterSpacing: 0.5,
        // marginBottom: 2,
        textAlign: 'center',
        height: 35,
        width: '80%',
        // borderWidth: 2,
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 5,
        backgroundColor: fontStyles.colors.deepRed,
        marginBottom: 10,
    },
    activeCircle: {
        backgroundColor: '#F0F0F0', // Change the color for the active circle
    },
    progressBarContainer: {
        width: '80%',
        height: 5,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: fontStyles.colors.deepRed,
    },
});

export default ProgressBarWithText;
