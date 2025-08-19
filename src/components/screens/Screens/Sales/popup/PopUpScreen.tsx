import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';

import Button from '../../../../common/Atoms/buttons/Button';
import fontStyles from '../../../../../assets/styles/constants';
import InputWithIcon from '../../../../common/Atoms/textInputs/InputWithIcon';
import AddButtonWithIcon from '../../../../common/Atoms/buttons/AddButtonWithIcon';
import PopUpDataCard from '../../../../common/Molecules/PopUpDataCard';
import languages from '../../../../../common/language';
import AppLoader from '../../../../common/Atoms/AppLoader';

import SearchIcon from 'react-native-vector-icons/AntDesign';

interface PopUpProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  inputTitle?: string;
  icon?: React.ReactNode;
  list?: any;
  addFun?: any;
  data?: any;
  onClick?: any;
  load?: any;
  keyboard?: any;
}

const PopUpScreen: React.FC<PopUpProps> = ({
  isVisible,
  onClose,
  title,
  subTitle,
  inputTitle,
  icon,
  list,
  addFun,
  onClick,
  load,
  keyboard,
}) => {
  const [phone, setPhone] = useState<any>('');

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.modalTitle}>
                {languages.Add[fontStyles.lang]} {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                {/* <PopUpBackButton /> */}
                <SearchIcon
                  name="closecircleo"
                  size={18}
                  color={fontStyles.colors.lightBrown}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {list.map((data: any, index: any) => (
                <PopUpDataCard
                  key={index}
                  onClick={() => {
                    onClick(data);
                  }}
                  title={subTitle ? subTitle : title}
                  data={data.value}
                  isChecked={data.is_primary}
                />
              ))}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{width: '60%'}}>
                <InputWithIcon
                  label={inputTitle ? inputTitle : title}
                  placeholder={languages['Enter Number'][fontStyles.lang]}
                  value={phone}
                  onChangeText={(val: any) => {
                    const upperCaseVal = val.toUpperCase();
                    setPhone(upperCaseVal);
                  }}
                  leftIcon={icon}
                  keyboardType={keyboard || 'default'}
                  maxLength={icon && 10}
                />
              </View>
              <View style={{width: '30%'}}>
                <AddButtonWithIcon
                  title={languages.Add[fontStyles.lang]}
                  onPress={() => {
                    setPhone(''), addFun(phone);
                  }}
                  // hideIcon={true}
                />
              </View>
            </View>
            <View style={styles.closeButton}>
              <Button
                title={languages.Close[fontStyles.lang]}
                variant={'contained'}
                color={fontStyles.colors.primary}
                onPress={onClose}
              />
            </View>
          </View>
        </View>
        {load && <AppLoader />}
      </Modal>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',

    left: 20,
    right: 20,
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  modalTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.primary,
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: fontStyles.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PopUpScreen;
