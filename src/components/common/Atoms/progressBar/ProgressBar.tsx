import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import fontStyles from '../../../../assets/styles/constants';

interface ProgressProps {
    label?: any;
    progress?: number;
    subProgress?:any
}

const ProgressBar: React.FC<ProgressProps> = ({ progress, subProgress }) => {
    // const [progress, setProgress] = useState<number>(0.1); // Progress value between 0 and 1
    // const [subProgress, setSubProgress] = useState<number>(0);

    const progressPercentage = progress * 100;
    const subProgressPercentage = subProgress * 100;

    return (

        <View style={styles.container}>
            {/* <View style={styles.progressBar}>
                <Animated.View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
            </View> */}
            <View style={styles.subProgressBar}>
                <Animated.View style={[styles.progressBarFill, { width: `${subProgressPercentage}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    progressBar: {
        width: 107,
        height: 5,
        backgroundColor: fontStyles.colors.secondary,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    subProgressBar: {
        // width: 245,
        width:'100%',
        height: 5,
        backgroundColor: fontStyles.colors.secondary,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: fontStyles.colors.deepRed,
    },
});

export default ProgressBar;
