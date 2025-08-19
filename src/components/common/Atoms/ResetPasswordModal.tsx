import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../common/Atoms/buttons/Button'; // Button component
import languages from '../../../common/language';
import fontStyles from '../../../assets/styles/constants';

const ResetPasswordModal = ({
  visible,
  onClose,
  onResetPassword,
  value,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isPasswordVisible,
  togglePasswordVisibility,
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{languages['Reset Password'][fontStyles.lang]}</Text>

          <Ionicons
            name={'close'}
            color="black"
            size={30}
            style={styles.closeIcon}
            onPress={onClose}
          />

          <TextInput
            style={styles.input}
            placeholder={languages['Employee ID'][fontStyles.lang]}
            value={value}
            onChangeText={(val) => setValue(val)}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.input}
            placeholder={languages['Enter Password'][fontStyles.lang]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
          />
          <TextInput
            style={styles.input}
            placeholder={languages['Confirm Password'][fontStyles.lang]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isPasswordVisible}
          />

          <Button
            title={languages['Reset Password'][fontStyles.lang]}
            variant="contained"
            color="#3b82f6" // Primary color for button
            onPress={onResetPassword}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    width: '80%',
    marginBottom: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ResetPasswordModal;
