import React, { createContext, useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import fontStyles from './src/assets/styles/constants';
import languages from './src/common/language';
import PopUpBackButton from './src/assets/images/svg/PopUpBackButton';
import { Image } from 'react-native';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [],
  });

  // Function to Show Alert with Buttons
  const showAlert = (title, message, buttons = [{ text: languages.OK[fontStyles.lang], onPress: () => { } }]) => {
    setAlertData({ visible: true, title, message, buttons });
  };

  // Function to Close Alert
  const closeAlert = () => setAlertData({ ...alertData, visible: false });

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alertData.visible && (
        <Modal transparent visible animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.alertBox}>
              {alertData.title === languages.Error[fontStyles.lang] ? (
                <View style={styles.checkerContainer}>
                  <Image
                    source={require('./src/assets/images/report.png')}
                    style={{ width: '20%', height: '70%' }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.title, { color: fontStyles.colors.deepRed }]}>{alertData.title}</Text>
                </View>
              ) : alertData.title === languages.Success[fontStyles.lang] ? (
                <View style={styles.checkerContainer}>
                  <Image
                    source={require('./src/assets/images/check_circle.png')}
                    style={{ width: '20%', height: '70%' }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.title, { color: fontStyles.colors.forestgreen, marginLeft: 12 }]}>{alertData.title}</Text>
                </View>
              ) :
                <Text style={[styles.title, { marginBottom: 10 }]}>{alertData.title}</Text>
              }
              <Text style={styles.message}>{alertData.message}</Text>
              <View style={styles.buttonContainer}>
                {alertData?.buttons?.map((btn, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      closeAlert();
                      btn.onPress && btn.onPress(); // Execute button action
                    }}
                    style={[styles.button, btn.style === 'cancel' ? styles.cancelButton : styles.confirmButton]}
                  >
                    <Text style={styles.buttonText}>{btn?.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
};

// Custom Hook to Use Alert
export const useAlert = () => useContext(AlertContext);

// Styles
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  alertBox: { width: '90%', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 40, borderRadius: 10, alignItems: 'center' },
  title: { fontSize: 18, color: '#000', fontFamily: 'Montserrat-SemiBold' },
  message: { fontSize: 16, marginBottom: 20, marginTop: 5, textAlign: 'center', color: '#000', fontFamily: 'Montserrat-Medium' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' },
  button: { padding: 10, borderRadius: 100, flex: 1, marginHorizontal: 5, alignItems: 'center', marginTop: 10 },
  cancelButton: { backgroundColor: '#ccc' },
  confirmButton: { backgroundColor: '#904B3D' },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: 'Montserrat-SemiBold' },
  checkerContainer: { width: '35%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 10 },
});
