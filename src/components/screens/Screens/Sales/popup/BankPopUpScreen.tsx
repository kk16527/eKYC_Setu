import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PopUpBackButton from '../../../../../assets/images/svg/PopUpBackButton';
import Button from '../../../../common/Atoms/buttons/Button';
import fontStyles from '../../../../../assets/styles/constants';
import InputWithIcon from '../../../../common/Atoms/textInputs/InputWithIcon';
import PopUpDataCard from '../../../../common/Molecules/PopUpDataCard';
import Bank from '../../../../../assets/images/svg/Bank';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Apis from '../../../../../services/apis';
import {useAlert} from '../../../../../../AlertContext';
import AppLoader from '../../../../common/Atoms/AppLoader';
import languages from '../../../../../common/language';
interface PopUpProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  inputTitle?: string;
  icon?: React.ReactNode;
  onAdd?: any;
  makePrimary?: any;
  list?: any;
  load2?: any;
}

const BankPopUpScreen: React.FC<PopUpProps> = ({
  load2,
  isVisible,
  onClose,
  title,
  subTitle,
  inputTitle,
  icon,
  onAdd,
  makePrimary,
  list,
}) => {
  const [load, setLoad] = useState(false);
  const [acc, setacc] = useState<string>('');
  const [isChecked1, setIsChecked1] = useState<Boolean>(false);
  const [isChecked2, setIsChecked2] = useState<Boolean>(false);
  const [bank, setBank] = useState<string>('');
  const [ifsc, setIfsc] = useState<string>('');
  const [bankAdress, setBankAddress] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const apis = new Apis();
  const showAlert = useAlert();

  const ifscFun = (val: any) => {
    setLoad(true);
    apis
      .master({
        _func: 'get-ifsc-details',
        ifsc: val,
      })
      .then((response: any) => {
        try {
          const res = response?.data?.data || [];
          console.log('ires?.BRANCH_', res?.BRANCH);
          setBank(res?.BANK);
          setBankAddress(res?.ADDRESS);
          setBranch(res?.BRANCH);
          setLoad(false);
        } catch (error: any) {
          if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Response Headers:', error.response.headers);
            console.log('Response Data:', error.response.data);

            const errorMessage =
              error.response.data?.desc ||
              languages['Something went wrong'][fontStyles.lang];
            showAlert(languages.Error[fontStyles.lang], errorMessage);
          } else if (error.request) {
            console.error('No response received:', error.request);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['No response from server'][fontStyles.lang],
            );
          } else {
            console.error('Error setting up request:', error.message);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['An unexpected error occurred'][fontStyles.lang],
            );
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Headers:', error.response.headers);
          console.log('Response Data:', error.response.data);

          const errorMessage =
            error.response.data?.desc ||
            languages['Something went wrong'][fontStyles.lang];
          showAlert(languages.Error[fontStyles.lang], errorMessage);
        } else if (error.request) {
          console.error('No response received:', error.request);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['No response from server'][fontStyles.lang],
          );
        } else {
          console.error('Error setting up request:', error.message);
          showAlert(
            languages.Error[fontStyles.lang],
            languages['An unexpected error occurred'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={onClose}>
        <ScrollView style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={{position: 'absolute', right: 8, top: 8}}>
              {/* <PopUpBackButton /> */}
              <SearchIcon
                name="closecircleo"
                size={18}
                color={fontStyles.colors.lightBrown}
              />
            </TouchableOpacity>
            <ScrollView>
              {list?.map((data: any, index: any) => (
                <PopUpDataCard
                  key={index}
                  isChecked={data.is_primary}
                  title={languages['Account Number'][fontStyles.lang]}
                  data={data.acc}
                  onClick={() => {
                    makePrimary({
                      _func: 'mark-is-primary',
                      param: 'Bank',
                      reference_id: data.reference_id,
                      is_primary: 1,
                    });
                  }}
                />
              ))}
            </ScrollView>

            <View style={[styles.topContainer]}>
              <Text style={styles.modalTitle}>
                {languages.Add[fontStyles.lang]} {title}
              </Text>
              {/* <TouchableOpacity onPress={onClose}>
                                <PopUpBackButton />
                            </TouchableOpacity> */}
            </View>

            <InputWithIcon
              label={languages['IFSC Code'][fontStyles.lang]}
              placeholder={languages['Enter IFSC Code'][fontStyles.lang]}
              value={ifsc}
              maxLength={11}
              autoCapitalize="characters"
              onChangeText={(val: any) => {
                const upper = val.toUpperCase();
                setIfsc(upper);
                const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
                if (ifscRegex.test(val)) {
                  ifscFun(val);
                }
                if (!val) {
                  setBankAddress('');
                  setBank('');
                  setBranch('');
                }
              }}
              rightIcon={
                <TouchableOpacity onPress={() => setIfsc('')}>
                  <SearchIcon
                    name="closecircleo"
                    size={15}
                    color={fontStyles.colors.lightBrown}
                  />
                </TouchableOpacity>
              }
            />
            <InputWithIcon
              label={languages.Bank[fontStyles.lang]}
              placeholder={languages['Bank Name'][fontStyles.lang]}
              value={bank}
              onChangeText={(val: any) => {
                setBank(val);
              }}
              leftIcon={<Bank color={fontStyles.colors.black} />}
              disabled={true}
            />
            <InputWithIcon
              label={languages['branch'][fontStyles.lang]}
              placeholder={languages['Enter Branch'][fontStyles.lang]}
              value={branch}
              onChangeText={(val: any) => {
                setBranch(val);
              }}
              leftIcon={<Bank color={fontStyles.colors.black} />}
              disabled={true}
            />
            <InputWithIcon
              label={languages['Bank Address'][fontStyles.lang]}
              placeholder={languages['Bank Address'][fontStyles.lang]}
              value={bankAdress}
              onChangeText={(val: any) => {
                setBankAddress(val);
              }}
              disabled={true}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <InputWithIcon
                  label={inputTitle ? inputTitle : title}
                  placeholder={languages['Enter Number'][fontStyles.lang]}
                  value={acc}
                  onChangeText={(val: any) => {
                    setacc(val);
                  }}
                  leftIcon={icon}
                  keyboardType="number-pad"
                />
              </View>
              {/* <View style={{ width: '30%' }}>
                                <AddButtonWithIcon title={'Add'} onPress={handleAddPhone} />
                            </View> */}
            </View>
            <View style={styles.closeButton}>
              <Button
                title={languages['Add New Account'][fontStyles.lang]}
                variant={'contained'}
                disabled={!acc}
                color={fontStyles.colors.primary}
                onPress={() => {
                  if (acc) {
                    let body: any = {
                      _func: 'add-update-bank-details',
                      bank_name: bank,
                      account_type: 'Saving',
                      bank_account_number: acc,
                      ifsc: ifsc,
                      bank_address: bankAdress,
                      branch: branch,
                    };
                    console.log('body===', body);

                    let missingFields: any = Object.keys(body)
                      .filter(
                        key =>
                          !body[key] ||
                          body[key] === 'NaN-NaN-NaN' ||
                          (typeof body[key] === 'object' &&
                            Object.values(body[key]).every(value => !value)),
                      )
                      .map(key => key);

                    // let excludeFields: any = ["product_code"];
                    // missingFields = missingFields.filter((item: any) => !excludeFields.includes(item));

                    let missingFieldsReadable = missingFields.map(
                      (key: any) => {
                        return key === 'bank_name'
                          ? languages['Bank Name'][fontStyles.lang]
                          : key === 'bank_account_number'
                          ? languages['Bank Account Number'][fontStyles.lang]
                          : key === 'bank_address'
                          ? languages['Bank Address'][fontStyles.lang]
                          : key === 'ifsc'
                          ? languages.Ifsc[fontStyles.lang]
                          : key; // Default to key if not mapped
                      },
                    );

                    if (missingFields.length > 0) {
                      setLoad(false);
                      showAlert(
                        languages.Error[fontStyles.lang],
                        `${
                          languages['Please fill details'][fontStyles.lang]
                        } ${missingFieldsReadable.join(', ')}`,
                        // missingFields[0] +" is Required"
                      );
                      return;
                    }

                    onAdd(body);
                  }
                }}
              />
            </View>
          </View>
          {(load || load2) && <AppLoader />}
          <View style={{height: 1000}}></View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: height / 5, // Place at half the screen
    // height: 450,
    left: 20,
    right: 20,

    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: fontStyles.colors.white,
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
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.primary,
    textAlign: 'center',
    marginTop: 12,
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

export default BankPopUpScreen;
