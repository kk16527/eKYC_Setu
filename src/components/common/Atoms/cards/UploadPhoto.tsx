import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import fontStyles from '../../../../assets/styles/constants';
import { useAlert } from '../../../../../AlertContext';
import languages from '../../../../common/language';

const UploadPhoto = () => {
    const [photos, setPhotos] = useState([]);
    const showAlert = useAlert();

    const handlePickImage = (index) => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 1, // Allow only one image
            },
            (response) => {
                if (response.didCancel) {
                    showAlert(languages.Cancelled[fontStyles.lang], languages['No photo'][fontStyles.lang]);
                } else if (response.errorCode) {
                    showAlert(languages.Error[fontStyles.lang], response.errorMessage || languages['Something went wrong'][fontStyles.lang]);
                } else if (response.assets && response.assets.length > 0) {
                    const newPhotos = [...photos];
                    if (index !== undefined) {
                        // Replace existing photo at index
                        newPhotos[index] = response.assets[0].uri;
                    } else {
                        // Add a new photo
                        if (photos.length < 2) {
                            newPhotos.push(response.assets[0].uri);
                        } else {
                            showAlert(languages['Limit Reached'][fontStyles.lang], languages['You can upload'][fontStyles.lang]);
                        }
                    }
                    setPhotos(newPhotos);
                }
            }
        );
    };

    const handleRemoveImage = (index) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        setPhotos(newPhotos);
    };

    return (
        <View style={styles.container}>
            <View style={styles.photoRow}>
                {photos.map((photo, index) => (
                    <View key={index} style={styles.photoContainer}>
                        <Image source={{ uri: photo }} style={styles.image} />
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() => handlePickImage(index)}
                        >
                            <Ionicons name="pencil" size={20} color={fontStyles.colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleRemoveImage(index)}
                        >
                            <Ionicons name="trash" size={20} color={fontStyles.colors.white} />
                        </TouchableOpacity>
                    </View>
                ))}
                {photos.length < 2 && (
                    <TouchableOpacity
                        style={styles.uploadSection}
                        onPress={() => handlePickImage()}
                    >
                        <Ionicons name="add-circle-sharp" size={40} color="grey" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderColor: '#E5E5E5',
        borderStyle: 'dotted',
        borderRadius: 16,
        borderWidth: 2,
        padding: 16,
    },
    photoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },
    uploadSection: {
        width: 140,
        height: 120,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderStyle: 'dotted',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        position: 'relative',
        width: 140,
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    changeButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: fontStyles.colors.black,
        borderRadius: 12,
        padding: 5,
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 5,
    },
});

export default UploadPhoto;
