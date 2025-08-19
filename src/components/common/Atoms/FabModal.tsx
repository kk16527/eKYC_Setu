import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Enrollment from '../../../assets/images/svg/Enrollment';
import CreateCenter from '../../../assets/images/svg/CreateCenter';
import CreateVillage from '../../../assets/images/svg/CreateVillage';
import fontStyles from '../../../assets/styles/constants';
import languages from '../../../common/language';


interface FabModal {
  visible: boolean;
  onClose: () => void;
  allowedActions:any
}

const FabModal: React.FC<FabModal> = ({ visible, onClose,allowedActions }) => {
  const navigation = useNavigation();
    // console.log("Allowed Actions:", allowedActions);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity onPress={onClose} style={styles.blackScreen}>
        <View style={styles.bottomButtons}>
          {allowedActions.includes("enrollment")&&(<TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('Enrollment'); }}
            style={styles.imageContainer}
          >
            <Text style={styles.bottomButtonText}>{languages.Enrollment[fontStyles.lang]}</Text>
            <View style={styles.bottomButton}>
              <Enrollment />
            </View>
          </TouchableOpacity>)}
          {allowedActions.includes("create_center")&&(<TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('CreateCenter'); }}
            style={styles.imageContainer}
          >
            <Text style={styles.bottomButtonText}>{languages['Create Center'][fontStyles.lang]}</Text>
            <View style={styles.bottomButton}>
              <CreateCenter />
            </View>
          </TouchableOpacity>)}
          {allowedActions.includes("create_village")&&(<TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('CreateVillage'); }}
            style={styles.imageContainer}
          >
            <Text style={styles.bottomButtonText}>{languages['Create Village'][fontStyles.lang]}</Text>
            <View style={styles.bottomButton}>
              <CreateVillage />
            </View>
          </TouchableOpacity>)}
          {allowedActions.includes("create_route")&&(<TouchableOpacity
            onPress={() => { onClose(); navigation.navigate('CreateRoute'); }}
            style={styles.imageContainer}
          >
            <Text style={styles.bottomButtonText}>{languages['Create Route'][fontStyles.lang]}</Text>
            <View style={styles.bottomButton}>
              <CreateVillage />
            </View>
          </TouchableOpacity>)}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blackScreen: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.9,
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  bottomButtons: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: fontStyles.spacing.paddingHorizontal,
    paddingBottom: '40%',
    zIndex: 3,
  },
  imageContainer: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  bottomButton: {
    backgroundColor: fontStyles.colors.secondary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontFamily: 'Montserrat-Medium',
    color: fontStyles.colors.lightPink,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.25,
    width: '70%',
    textAlign: 'right',
  },
});

export default FabModal;
