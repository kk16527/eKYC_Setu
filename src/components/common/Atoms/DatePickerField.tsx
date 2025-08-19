import React, {useState, FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import fontStyles from '../../../assets/styles/constants';
import Datesvg from '../../../assets/images/svg/Datesvg';

interface OutlinedDatePickerProps {
  label: string;
  value: Date | null;
  onChangeDate: (date: Date) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: any;
  isMandatory?: boolean;
  showDay?: any;
  defaultOpenDate?: Date;
  maxDate?: any;
  minDate?: any;
}

const DatePickerField: FC<OutlinedDatePickerProps> = ({
  label,
  value,
  onChangeDate,
  leftIcon,
  rightIcon,
  disabled,
  isMandatory = true,
  showDay,
  defaultOpenDate,
  minDate,
  maxDate,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleConfirm = (date: Date) => {
    setIsPickerOpen(false);
    onChangeDate(date);
  };
  let dateValue: any = value;
  const d = new Date(dateValue);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = daysOfWeek[d.getDay()];

  const formattedDate = showDay
    ? dateValue instanceof Date
      ? `${dateValue.getDate().toString().padStart(2, '0')}/${(
          dateValue.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${dateValue.getFullYear()} - ${dayName}`
      : ''
    : dateValue instanceof Date
    ? `${dateValue.getDate().toString().padStart(2, '0')}/${(
        dateValue.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${dateValue.getFullYear()}`
    : '';

      const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            setIsPickerOpen(true);
          }
        }}
        style={styles.inputContainer}>
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 10,
            backgroundColor: fontStyles.colors.white,
            // backgroundColor: 'red',
            flexDirection: 'row',
          }}>
          <Text style={[styles.text, {fontSize: 10}]}>{label}</Text>
          {isMandatory && (
            <Text style={{color: '#FF0000', fontSize: 10}}> *</Text>
          )}
        </View>
        <View style={styles.input}>
          <View style={{top: -4}}>
            <Datesvg/>
          </View>
          <Text
            style={[
              styles.text,
              {
                marginLeft: 5,

                color: disabled
                  ? fontStyles.colors.grey
                  : fontStyles.colors.black,
              },
            ]}>
            {formattedDate || 'Select Date'} 
          </Text>
        </View>
      </TouchableOpacity>
      {/* <DatePicker
        modal
        open={isPickerOpen}
        // date={value || new Date()}
        // date={value || defaultOpenDate || new Date()}
       
        onConfirm={handleConfirm}
        onCancel={() => setIsPickerOpen(false)}
        mode="date"
        maximumDate={defaultOpenDate || undefined}
        
      /> */}
      <DatePicker
        modal
        open={isPickerOpen}
        date={value || defaultOpenDate || new Date()} // ✅ Set default open date
        onConfirm={handleConfirm}
        onCancel={() => setIsPickerOpen(false)}
        mode="date"
        maximumDate={maxDate} // ✅ Disable dates after this
        minimumDate={minDate}
        title={minDate&&maxDate?
          ("Select Date within \n ("+formatDateToDDMMYYYY(minDate)+" - "+formatDateToDDMMYYYY(maxDate)+")")
          :"Select Date"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    height: 40,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontSize: 12,
    color: fontStyles.colors.black,
  },
  container: {
    width: '100%',
    marginBottom: 5,
  },
  // input: {
  //     backgroundColor: fontStyles.colors.white,
  //     width: '100%',
  //     textAlign: 'left',
  // },
  contentStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '400',
    width: '100%',
    lineHeight: 24,
    letterSpacing: 0.4,
    // borderWidth: 2,
    marginLeft: 45,
  },
});

export default DatePickerField;
