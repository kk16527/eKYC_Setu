import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import fontStyles from '../../../assets/styles/constants';

const CategoriesList = ({ categories, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Optional: store which category was clicked if needed
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onBranchVisit = () => {
    closeModal();
    // Navigate or handle Branch Visit
    navigation.navigate('BranchVisitScreen'); // change screen name accordingly
  };

  const onCenterVisit = () => {
    closeModal();
    // Navigate or handle Center Visit
    navigation.navigate('CenterVisitScreen'); // change screen name accordingly
  };

  return (
    <View style={{ marginTop: 5, backgroundColor: '#FCEAE6', borderRadius: 8 }}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={openModal}
          activeOpacity={0.7}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: 14 }}>{category}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Visit Type</Text>

            <Pressable style={styles.button} onPress={onBranchVisit}>
              <Text style={styles.buttonText}>Branch Visit</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={onCenterVisit}>
              <Text style={styles.buttonText}>Center Visit</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.closeButton]} onPress={closeModal}>
              <Text style={[styles.buttonText, { color: '#980000' }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '95%',
    backgroundColor: fontStyles.colors.white,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // shadow for android
    shadowColor: '#000', // shadow for ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#980000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#980000',
  },
});
