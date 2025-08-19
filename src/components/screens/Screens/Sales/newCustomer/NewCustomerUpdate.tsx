import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NavbarWithSalesIcon from '../../../../../navigation/NavbarWithMoreIcon';
import fontStyles from '../../../../../assets/styles/constants';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../../common/Atoms/buttons/Button';
import BasicTextInputWithPadding from '../../../../common/Atoms/textInputs/BasicTextInputWithPadding';
import DatePickerField from '../../../../common/Atoms/DatePickerField';
import InputWithIcon from '../../../../common/Atoms/textInputs/InputWithIcon';
import Profile from '../../../../../assets/images/svg/Profile';
import Rupee from '../../../../../assets/images/svg/Rupee';
import MaritalStatus from '../../../../../assets/images/svg/MaritalStatus';
import InputWithDropdown from '../../../../common/Atoms/textInputs/InputWithDropdown';
import Apis from '../../../../../services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAlert} from '../../../../../../AlertContext';
import languages from '../../../../../common/language';
import AppLoader from '../../../../common/Atoms/AppLoader';
import RadioButton from '../../../../common/Atoms/radioButton';
const NewCustomerUpdate: any = ({route}) => {
  const {selData} = route.params;

  const data: any = {
    id: selData?.center_code,
    name: selData?.center_name,
    enrolled: '',
    CGT: '',
    icon: 'home',
    lat: selData.latitude,
    long: selData.longitude,

    add: (
      selData.district +
      ' ' +
      selData.village_state +
      ' - ' +
      selData.pincode
    ).trim(),
  };
  //  console.log("LLL",data.id)
  const navigation = useNavigation();

  const [customer, setCustomer] = useState<string>('');
  const [loan, setLoan] = useState<string>('');

  const [religion, setReligion] = useState<any>({});
  const [caste, setCaste] = useState<any>({});
  const [dob, setDob] = useState<any>();
  const [address, setAddress] = useState<string>('');

  const [load, setLoad] = useState(false);
  const [loanAmts, setLoanamts] = useState<any>();
  const [loancode, setLoancode] = useState<any>(null);
  const apis = new Apis();
  const [grplabel, setGrplabel] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [resData, setResData] = useState<any>();
  const [casteOptions, setcasteOptions] = useState<any>([]);
  const [religionlist, setreligionlist] = useState<any>([]);
  const [statelist, setstatelist] = useState<any>([]);
  const [districtlist, setdistrictlist] = useState<any>([]);
  const [alldistrictlist, setalldistrictlist] = useState<any>([]);
  const [maritalStatusOptions, setmaritalStatusOptions] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState<any>(null);
  const [hospicash, sethospicash] = useState<any>(true);
  const [villageCode, setVillageCode] = useState<string>('');
  const [panchayat, setPanchayat] = useState<string>('');
  const [block, setBlock] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [loanPurposeList, setloanPurposeList] = useState<any>([]);
  const [loanPurpose, setloanPurpose] = useState<any>(null);
  const [loanBtypeList, setloanBtypeList] = useState<any>([]);
  const [loanBtype, setloanBtype] = useState<any>(null);
  const [grpCodeList, setGrpCodelist] = useState([]);
  const [grpCode, setGrpCode] = useState('');
  const showAlert = useAlert();
  const [allBtypeList, setallBtypeList] = useState<any>([]);
  const handleMaritalStatusSelect = (value: any, label: any) => {
    setMaritalStatus({
      label: label,
      value: value,
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    setLoad(true);
    apis
      .temporaryCustomer({
        _func: 'get-temporary-customer-details',
        temporary_id: selData?.tempid,
      })
      .then((response: any) => {
        try {
          const res = response?.data?.data || [];

          let loanProductCode = res?.product_code;
          setLoancode(loanProductCode);

          let isoDate: any = new Date().toISOString();
          if (res.dob) {
            const [day, month, year] = res.dob.split('-');
            isoDate = new Date(
              `${year}-${month}-${day}T00:00:00Z`,
            ).toISOString();
          }

          setResData(res);
          setCustomer(res?.name || '');
          setDistrict(res?.address?.district || '');
          setPin(res?.address?.pincode || '');
          setState(res?.address?.state || '');
          setReligion({
            label: res?.religion || '',
            value: res?.religion_code || '',
          });

          setCaste({
            label: res?.caste || '',
            value: res?.caste_code || '',
          });
          setMaritalStatus({
            label: res?.marital_status || '',
            value: res?.marital_status_code || '',
          });
          setAddress(res?.address?.home_address || '');
          const today = new Date();
          const defaultDate = new Date();
          defaultDate.setFullYear(today.getFullYear() - 18);

          setDob(res.dob ? new Date(isoDate) : defaultDate);
          apis
            .getLoanProducts()
            .then(async (response: any) => {
              try {
                const res1 = response?.data?.data || [];

                let arr: any = [];
                res1?.map((item: any) => {
                  arr.push({label: item?.loan_amount, value: item?.code});
                  if (item.code == loanProductCode) {
                    setLoan(item?.loan_amount);
                  }
                });

                setLoanamts(arr);

                await getMasterDetails(res?.address?.state);
                await handleGetVillage();
                await getGroupcodes();
              } catch (error: any) {
                if (error.response) {
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
                    languages['An unexpected error'][fontStyles.lang],
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
                  languages['An unexpected error'][fontStyles.lang],
                );
              }
              setLoad(false);
            });
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
              languages['An unexpected error'][fontStyles.lang],
            );
          }
          setLoad(false);
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
            languages['An unexpected error'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };

  const getMasterDetails = async (ResState?: any) => {
    try {
      let res: any = await AsyncStorage.getItem('masterDetails');

      if (!res) {
        showAlert(
          languages.Error[fontStyles.lang],
          'Master Details data not getting.',
        );
        setLoad(false);
        return;
      }

      res = JSON.parse(res);
      let ms: any = [];
      res?.marital_status?.map((item: any) => {
        ms.push({label: item?.name, value: item?.code});
      });
      const allowedStatuses = ['married', 'widow'];
      ms = ms.filter((item: any) =>
        allowedStatuses.includes(item.label?.toLowerCase()),
      );
      setmaritalStatusOptions(ms);

      let rl: any = [];
      res?.religion_master?.map((item: any) => {
        rl.push({label: item?.name, value: item?.code});
      });
      setreligionlist(rl);

      let sl: any = [];
      res?.state_master?.map((item: any) => {
        sl.push({label: item?.state, value: item?.state});
      });
      setstatelist(sl);

      let cl: any = [];
      res?.caste_master?.map((item: any) => {
        cl.push({label: item?.name, value: item?.code});
      });
      setcasteOptions(cl);

      setalldistrictlist(res?.district_state);

      let btype: any = [];
      res?.loan_purpose_master?.map((item: any) => {
        btype.push({label: item?.purpose_name, value: item?.purpose_name});
      });
      setloanBtypeList(btype);
      setallBtypeList(res?.loan_purpose_master);
      getGroupcodes();
      setLoad(false);
    } catch (error: any) {
      setLoad(false);
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
          languages['An unexpected error'][fontStyles.lang],
        );
        setLoad(false);
      }
      setLoad(false);
    }
  };

  const getGroupcodes = async () => {
    console.log('get-center-group');
    setLoad(true);

    const body = {
      _func: 'get-center-group',
      lms_center_id: data.id,
    };
    // console.log('get-center-group body', body);
    apis
      .center(body)
      .then((response: any) => {
        // console.log('==========???', response.data.data);
        try {
          let groups = response.data.data || [];
          // console.log("==========???",groups)
          let ms: any = [];
          groups?.map((item: any) => {
            ms.push({label: item?.group_name, value: item?.group_code});
          });
          setGrpCodelist(ms);

          setLoad(false);
        } catch (error: any) {}
      })
      .catch((error: any) => {
        if (error.response) {
          console.log('Status Code:', error.response.status);
          console.log('Response Headers:', error.response.headers);
          console.log('Response Datauuu:', error.response.data);

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

  {
    /*Calender*\ */
  }
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  const updateCustomer = () => {
    const date = new Date(dob);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${date.getFullYear()}`;
    let body: any = {
      _func: 'update-staging-customer',
      temporary_id: selData?.tempid,
      name: customer,
      dob: formattedDate,
      religion: religion?.value,
      caste: caste?.value,
      address1: address,
      state: stateName,
      district: district,
      pincode: pincode,
      product_code: loancode,
      marital_status: maritalStatus?.value,
      group_code: grpCode,
      staging_applied_loan_details: {
        applied_business_type: loanBtype,
        applied_loan_purpose: loanPurpose,
        hospicash: true,
      },
    };
    setLoad(true);
    console.log('update-staging-customer', body);
    let missingFields: any =
      Object.keys(body)
        .filter(
          key =>
            !body[key] ||
            body[key] === 'NaN-NaN-NaN' ||
            (typeof body[key] === 'object' &&
              Object.values(body[key]).every(value => !value)),
        )
        .map(key => key) || [];

    let missingFieldsReadable = missingFields?.map((key: any) => {
      return key === 'address1'
        ? languages.Address[fontStyles.lang]
        : key === 'product_code'
        ? languages.Loan[fontStyles.lang]
        : key === 'marital_status'
        ? languages['Marital Status'][fontStyles.lang]
        : key;
    });

    if (missingFields.length > 0) {
      setLoad(false);
      showAlert(
        languages.Error[fontStyles.lang],
        `${
          languages['Please fill details'][fontStyles.lang]
        } ${missingFieldsReadable.join(', ')}`,
      );
      return;
    }

    apis
      .temporaryCustomer(body)
      .then((response: any) => {
        try {
          const res = response?.data?.data || [];

          navigation.navigate('Kyc', {selData});
          setLoad(false);
        } catch (error: any) {
          if (error.response) {
            console.log('Status Code:', error?.response?.status);
            console.log('Response Headers:', error?.response?.headers);
            console.log('Response Data:', error?.response?.data);

            const errorMessage =
              error.response.data?.desc ||
              languages['Something went wrong'][fontStyles.lang];
            showAlert(languages.Error[fontStyles.lang], errorMessage);
            setLoad(false);
          } else if (error.request) {
            console.error('No response received:', error.request);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['No response from server'][fontStyles.lang],
            );
            setLoad(false);
          } else {
            console.error('Error setting up request:', error?.message);
            showAlert(
              languages.Error[fontStyles.lang],
              languages['An unexpected error'][fontStyles.lang],
            );
            setLoad(false);
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          console.log('Status Code:', error?.response?.status);
          console.log('Response Headers:', error?.response?.headers);
          console.log('Response Data:', error?.response?.data);

          const errorMessage =
            error.response?.data?.desc ||
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
            languages['An unexpected error'][fontStyles.lang],
          );
        }
        setLoad(false);
      });
  };

  const handleGetVillage = async (): Promise<void> => {
    setLoad(true);

    try {
      const body = {
        _func: 'get-village-by-code',
        village_code: selData?.village_code,
      };

      const response = await apis.village(body);

      const data = response?.data.data;

      if (!data) {
        throw new Error('No response data received');
      }

      // ✅ Directly set values
      setVillageCode(data?.village_name || '');
      setPanchayat(data?.panchayat || '');
      setBlock(data?.block || '');
      setPincode(data?.pincode || '');
      setDistrict(data?.district || '');
      setStateName(data?.village_state || '');
      // console.log(">>>>>>",stateName)
    } catch (error: any) {
      console.error('Error fetching village data:', error);

      let errMessage =
        languages?.['Something went wrong']?.[fontStyles?.lang] ||
        'Something went wrong';

      if (error?.response?.data?.desc) {
        errMessage = error.response.data.desc;
      }

      showAlert(languages?.Error?.[fontStyles?.lang] || 'Error', errMessage);
    } finally {
      setLoad(false);
    }
  };

  

 useEffect(() => {
    let sel: any = allBtypeList?.filter((item: any) => {
      return item?.purpose_name == loanBtype;
    });

    if (sel[0]) {
      setLoad(true);
      let purpose: any = [];
      sel[0]?.sub_purpose?.map((item: any) => {
        purpose.push({label: item?.purpose_name, value: item?.purpose_name});
      });
      setloanPurposeList(purpose);
      setLoad(false);
    }
  }, [loanBtype]);

  return (
    <View style={styles.container}>
      <NavbarWithSalesIcon
        title={languages['New Customer'][fontStyles.lang]}
        showBackButton={true}
      />
      <View style={styles.mainContent}>
        <ScrollView
          style={{height: '70%', paddingBottom: 300, marginTop: 20}}
          showsVerticalScrollIndicator={false}>
          <InputWithIcon
            label={languages['Customer Name'][fontStyles.lang]}
            placeholder={languages['Enter Customer Name'][fontStyles.lang]}
            value={customer}
            onChangeText={val => {
              setCustomer(val);
            }}
            leftIcon={<Profile />}
            disabled={resData?.name ? true : false}
            isMandatory={true}
          />
          <View style={[styles.inputContainer, {}]}>
            <View style={styles.basicInput}>
              <InputWithDropdown
                label={languages.Caste[fontStyles.lang]}
                data={casteOptions}
                onSelect={(val: any, label: any) => {
                  setCaste({
                    label: label,
                    value: val,
                  });
                }}
                datavalue={caste?.label || ''}
                isMandatory={true}
              />
            </View>
            <View style={styles.basicInput}>
              <InputWithDropdown
                label={languages.Religion[fontStyles.lang]}
                data={religionlist}
                onSelect={(val: any, label: any) => {
                  // setReligion(val);
                  setReligion({
                    label: label,
                    value: val,
                  });
                }}
                datavalue={religion?.label || ''}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.basicInput}>
              <InputWithDropdown
                label={languages['Marital Status'][fontStyles.lang]}
                data={maritalStatusOptions}
                icon={<MaritalStatus />}
                onSelect={handleMaritalStatusSelect}
                datavalue={maritalStatus?.label}
              />
            </View>
            <View style={styles.basicInput}>
              <DatePickerField
                label={languages.Dob[fontStyles.lang]}
                value={dob}
                onChangeDate={val => {
                  setDob(val);
                }}
                isMandatory={true}
                defaultOpenDate={eighteenYearsAgo}
              />
            </View>
          </View>

          {/* <View style={[styles.halfContainer, {marginTop: -5}]}> */}
          <View style={[styles.rowContainer]}>
            <View style={styles.halfContainer}>
              <InputWithDropdown
                label={languages['Loan Amount'][fontStyles.lang]}
                data={loanAmts || []}
                icon={<Rupee />}
                onSelect={(res: any, val: any) => {
                  setLoan(val);
                  setLoancode(res);
                }}
                datavalue={loan}
              />
            </View>
            <View style={styles.halfContainer}>
              <InputWithDropdown
                label={'Group Code'}
                data={grpCodeList}
                onSelect={(edu: any, label: any) => {
                  setGrplabel(label);
                  setGrpCode(edu);
                }}
                datavalue={grpCode}
                isMandatory={true}
              />
            </View>
          </View>
          {/* </View> */}

          <View style={styles.expandedSection}>
            <View style={{flex: 1}}>
              <View style={[styles.rowContainer]}>
                <View style={styles.halfContainer}>
                  <InputWithDropdown
                    label={languages['Busniness type'][fontStyles.lang]}
                    data={loanBtypeList}
                    onSelect={(res: any) => {
                      setloanBtype(res);
                    }}
                    datavalue={loanBtype}
                    isMandatory={true}
                  />
                </View>
                <View style={styles.halfContainer}>
                  <InputWithDropdown
                    label={languages['Loan Purpose'][fontStyles.lang]}
                    data={loanPurposeList}
                    onSelect={(res: any) => {
                      setloanPurpose(res);
                    }}
                    datavalue={loanPurpose}
                    isMandatory={true}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={[styles.label, {color: fontStyles.colors.grey}]}>
                  {languages.Hospicash[fontStyles.lang]}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      sethospicash(!hospicash);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {
                          fontSize: 14,
                          color: hospicash ? fontStyles.colors.primary : 'grey',
                        },
                      ]}>
                      {languages.Yes[fontStyles.lang]}
                    </Text>
                    <RadioButton
                      isChecked={hospicash}
                      onCheck={() => {}}
                      checkedColor={fontStyles.colors.darkGreen}
                      uncheckedColor={fontStyles.colors.strongRed}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      sethospicash(!hospicash);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {
                          fontSize: 14,
                          color: !hospicash
                            ? fontStyles.colors.primary
                            : 'grey',
                        },
                      ]}>
                      {languages.No[fontStyles.lang]}
                    </Text>
                    <RadioButton
                      isChecked={!hospicash}
                      onCheck={() => {}}
                      checkedColor={fontStyles.colors.darkGreen}
                      uncheckedColor={fontStyles.colors.strongRed}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 5}}>
            <BasicTextInputWithPadding
              label={languages.Address[fontStyles.lang]}
              placeholder={languages['Enter Address'][fontStyles.lang]}
              value={address}
              onChangeText={val => {
                setAddress(val);
              }}
              isMandatory={true}
            />
          </View>
          <View style={[styles.dropDownContainer]}>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.Village[fontStyles.lang]}
                placeholder={languages['Village'][fontStyles.lang]}
                value={villageCode}
                onChangeText={(val: any) => {}}
                isMandatory={true}
                disabled={true}
              />
            </View>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.Panchayat[fontStyles.lang]}
                placeholder={languages['Panchayat'][fontStyles.lang]}
                value={panchayat}
                onChangeText={(val: any) => {}}
                isMandatory={true}
                disabled={true}
              />
            </View>
          </View>

          <View style={[styles.dropDownContainer]}>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.Block[fontStyles.lang]}
                placeholder={languages['Block'][fontStyles.lang]}
                value={block}
                onChangeText={(val: any) => {}}
                isMandatory={true}
                disabled={true}
              />
            </View>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.Pincode[fontStyles.lang]}
                placeholder={languages['Enter Pincode'][fontStyles.lang]}
                value={pincode}
                keyboardType="number-pad"
                // maxLength={6}
                onChangeText={(val: any) => {
                  // setPin(val);
                }}
                isMandatory={true}
                disabled={true}
              />
            </View>
          </View>
          <View style={[styles.dropDownContainer]}>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.District[fontStyles.lang]}
                placeholder={languages['District'][fontStyles.lang]}
                value={district}
                onChangeText={(val: any) => {}}
                isMandatory={true}
                disabled={true}
              />
            </View>
            <View style={styles.halfContainer}>
              <InputWithIcon
                label={languages.State[fontStyles.lang]}
                placeholder={languages['State'][fontStyles.lang]}
                value={stateName}
                onChangeText={(val: any) => {}}
                isMandatory={true}
                disabled={true}
              />
            </View>
          </View>

          <View style={styles.signInButton}>
            <Button
              title={languages.Proceed[fontStyles.lang]}
              variant={'contained'}
              color={fontStyles.colors.primary}
              onPress={() => {
                console.log('Button pressed');
                updateCustomer();
              }}
            />
          </View>
          <View style={{height: 50}}></View>
        </ScrollView>
      </View>
      {load && <AppLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fontStyles.colors.white,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: fontStyles.spacing.paddingHorizontal,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.primary,
    marginVertical: 12,
  },
  itemRow: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  progressBar: {
    marginTop: 16,
  },
  signInButton: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
    borderRadius: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -5,
  },
  basicInput: {
    width: '48%',
  },
  halfContainer: {
    width: '48%',
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '30%',
  },
  expandedSection: {
    marginTop: 16,
    zIndex: 1,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.primary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewCustomerUpdate;
