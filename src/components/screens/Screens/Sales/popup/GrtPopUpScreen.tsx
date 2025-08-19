import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Button from '../../../../common/Atoms/buttons/Button';
import fontStyles from '../../../../../assets/styles/constants';
import DatePickerField from '../../../../common/Atoms/DatePickerField';
import Datesvg from '../../../../../assets/images/svg/Datesvg';
import {useAlert} from '../../../../../../AlertContext';
import AppLoader from '../../../../common/Atoms/AppLoader';
import languages from '../../../../../common/language';
import TimePickerField from '../../../../common/Atoms/cards/TimePickerField';

interface PopUpProps {
  isVisible: boolean;
  onClose: (padd: any, db: any) => void;
  isload?: any;
  dates?: any;
}

const GrtPopUpScreen: React.FC<PopUpProps> = ({
  isVisible,
  onClose,
  isload,
  dates,
}) => {
  const [db, setDb] = useState<any>('');
  const [pdd, setpdd] = useState<any>('');
  const [time,setTime] = useState<any>(new Date())
  const showAlert = useAlert();

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={{flex: 1}}>
              <View style={styles.topContainer}>
                <Text style={styles.modalTitle}>
                  {languages['Scheduled'][fontStyles.lang]}
                </Text>
                {/* <TouchableOpacity onPress={onClose}>
                                  <PopUpBackButton />
                              </TouchableOpacity> */}
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <View style={{width: '100%'}}>
                  <DatePickerField
                    label={languages['Preferred Date'][fontStyles.lang]}
                    value={pdd}
                    rightIcon={
                      <Datesvg
                        backgroundColor={
                          db ? '#49454F' : fontStyles.colors.white
                        }
                      />
                    }
                    onChangeDate={setpdd}
                    isMandatory={true}
                    showDay = {true}
                  />
                  <Text style={styles.dobText}>
                    {languages['DD/MM/YYYY'][fontStyles.lang]}
                  </Text>
                </View>
                <View style={{width: '100%',flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{width:'66%'}}>
                    <DatePickerField
                      label={languages['First Repayment Date'][fontStyles.lang]}
                      value={db}
                      rightIcon={
                        <Datesvg
                          backgroundColor={
                            db ? '#49454F' : fontStyles.colors.white
                          }
                        />
                      }
                      onChangeDate={setDb}
                      isMandatory={true}
                      showDay = {true}
                    />
                    <Text style={styles.dobText}>
                      {languages['DD/MM/YYYY'][fontStyles.lang]}
                    </Text>
                  </View>
                  <View style={{width:'32%'}}>
                     <TimePickerField
                        label={"Meeting @"}
                        value={time}
                        onChangeDate={val => {
                          console.log(val);
                          setTime(val)
                          // setstartTime(val);
                        }}
                      />
                    <Text style={styles.dobText}>
                      HH:MM 
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                
                {dates?.meeting_details?.map((item: any,index:any) => (
                  <View key={index}>
                    <Text style={styles.subText}>{item.repayment_frequency}</Text>
                      <View style={[styles.cardContent,{marginTop:5,}]}>
                        {item.meeting_dates?.map((date:any, index:any) => {
                         
                          const d = new Date(date);
                          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                          const dayName = daysOfWeek[d.getDay()];
                          const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()} (${dayName})`;
                          
                          return (
                            <Text key={index} style={[styles.cardText, { width: '28%', padding: 5}]}>
                              {formattedDate}{item.meeting_dates.length - 1 === index ? "" : ","}
                            </Text>
                          );
                        })}
                      </View>
                  </View>
                ))}

                
              </View>
            </ScrollView>
            <View style={styles.closeButton}>
              <Button
                title={languages.Schedule[fontStyles.lang]}
                variant={'contained'}
                color={fontStyles.colors.primary}
                onPress={() => {
                  if (!(pdd & db)) {
                    showAlert(
                      languages.Error[fontStyles.lang],
                      languages['Please Select dates'][fontStyles.lang],
                    );
                  } else {
                    onClose(pdd, db,time);
                  }
                }}
                disabled={!(pdd & db)}
              />
            </View>
          </View>
        </View>
        {isload && <AppLoader />}
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
    // backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    // top: height / 2, // Place at half the screen
    // height: 450,
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
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.primary,
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: fontStyles.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  dobText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: fontStyles.colors.lightBrown,
    textAlign: 'left',
    // marginLeft: 16,
  },
  subText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 28,
    color: fontStyles.colors.primary,
    textAlign: 'left',
  },
  cardContent: {
    backgroundColor: fontStyles.colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    
  },

  cardText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: fontStyles.colors.deepBlack,
    includeFontPadding: false,
    textAlignVertical: 'top',
    // marginStart: 10,
  },
});

export default GrtPopUpScreen;
