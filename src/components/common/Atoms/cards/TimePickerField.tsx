import React, { useState, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import fontStyles from '../../../../assets/styles/constants';
import Datesvg from '../../../../assets/images/svg/Datesvg';


interface OutlinedDatePickerProps {
    label: string;
    value: Date | null;
    onChangeDate: (date: Date) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?:any
}

const TimePickerField: FC<OutlinedDatePickerProps> = ({
    label,
    value,
    onChangeDate,
    leftIcon,
    rightIcon,
    disabled
}) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleConfirm = (date: Date) => {
        setIsPickerOpen(false);
        onChangeDate(date);
    };
    let dateValue: any = value; 
    const formattedDate = dateValue instanceof Date
        ? `${dateValue.getDate().toString().padStart(2, '0')}/${(dateValue.getMonth() + 1)
              .toString()
              .padStart(2, '0')}/${dateValue.getFullYear()}`
        : ""
        // new Date().toLocaleDateString('en-GB'); 

        const formatTime = (timestamp:any) => {
            const date = timestamp?(new Date(timestamp)):new Date();
            let hours:any = date.getHours(); 
            let minutes:any = date.getMinutes();             
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; 
            minutes = minutes < 10 ? `0${minutes}` : minutes; 
            hours = hours < 10 ? `0${hours}` : hours; 

            
            return `${hours}:${minutes} ${ampm}`;
        };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                if(!disabled)
                {
                    setIsPickerOpen(true)
                }
                }} style={styles.inputContainer}>
                <View style={{position:'absolute',top:-12,left:15,backgroundColor:fontStyles.colors.white,padding:5}}>
                    <Text style={[styles.text,{fontSize:10}]}>{label}</Text>
                </View>
                <View style={styles.input}>
                    {/* <View style={{top:-4}}><Datesvg backgroundColor={ fontStyles.colors.white}/></View> */}
                    <Text style={[styles.text,{marginLeft:5,color:disabled?fontStyles.colors.grey:fontStyles.colors.black}]}>{formatTime(dateValue) || "Select Time"}</Text>
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                open={isPickerOpen}
                date={value || new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setIsPickerOpen(false)}
                mode="time"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:18
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: fontStyles.colors.black,
        // lineHeight: 22,
        letterSpacing: 0.1,
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

export default TimePickerField;
