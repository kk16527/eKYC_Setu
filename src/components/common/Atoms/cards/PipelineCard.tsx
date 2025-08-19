import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Timer from '../../../../assets/images/svg/Timer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';
import {useNavigation} from '@react-navigation/native';

interface PipelineCardProps {
  props: any;
  onPress?: () => void;
}

const PipelineCard: React.FC<PipelineCardProps> = ({props, onPress}) => {
  const [isSelected, setIsSelected] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    // console.log(
    //   '==================================Selected Center Data:',
    //   props,
    // );
    // navigation.navigate('CustomerList', {
    //   selData: {...props, ...{centerName: props?.center_name}},
    // });

    //  navigation.navigate('CustomerList', {
    //   selData: {...props, ...{centerName: props?.center_name}},
    // });

  navigation.navigate('CustomerList', {
    selData: props,  
  });
// }

    // console.log(props)
    // setIsSelected((prev) => !prev);
    // navigation.navigate('CustomerList')
    // navigation.navigate('CustomerList', {
    //   selData: props.center // Passing center_code as selData
    // });
    // console.log(props.center_code)
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected ? {backgroundColor: fontStyles.colors.paleRed} : {},
      ]}
      onPress={() => handlePress()}>
      <View style={styles.profileSection}>
        <View style={styles.textContainer}>
          {/* <Text style={styles.name}>{props.name}</Text> */}
          <Text style={styles.name}>{props.center_name}</Text>
          <Text style={styles.id}>
            {languages['Center ID'][fontStyles.lang]} -{props.center_code}
          </Text>
        </View>
        {/* <View style={styles.sideContent}>
          <Text style={styles.sideText}>{props.time}1 Days ago</Text>
          <View style={styles.imageContainer}>
            <Timer />
            <Text style={styles.cgtTxt}>{languages.CGT[fontStyles.lang]}</Text>
          </View>
        </View> */}
      </View>
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={styles.fieldsContainer}>
          <View style={styles.field}>
            <Text style={styles.number}>
              {props.application_count}
              {/* enrol */}
            </Text>
            <Text style={styles.label}>
              {/* {languages['Total Enrolled'][fontStyles.lang]} */}
              {languages.Enrolled[fontStyles.lang]}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.number}>{props.cgt_count}</Text>
            <Text style={styles.label}>{languages.CGT[fontStyles.lang]}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.number}>
              {props.grt_count}
              {/* grt */}
            </Text>
            <Text style={styles.label}>{languages.GRT[fontStyles.lang]}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.number}>
              {props.approval_count}
              {/* enrol */}
            </Text>
            <Text style={styles.label}>
              {/* {languages['Total Enrolled'][fontStyles.lang]} */}
              {languages.Approval[fontStyles.lang]}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <AntDesign
            name="right"
            size={13}
            color={fontStyles.colors.lightBrown}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 20,
    paddingVertical: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    width: '75%',
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: fontStyles.colors.darkBrown,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  sideContent: {
    // flex: 1,
    alignItems: 'flex-end',
    color: fontStyles.colors.cyan,
    width: '25%',
  },
  sideText: {
    fontFamily: 'Montserrat-Medium',
    color: fontStyles.colors.darkPink,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    // marginRight: 6,
  },
  imageContainer: {
    width: 63,
    height: 22,
    backgroundColor: fontStyles.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 6,
    marginTop: 4,
  },
  divider: {
    height: 0.5,
    backgroundColor: fontStyles.colors.black,
    // marginVertical: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    // marginTop: 10,
  },
  field: {
    justifyContent: 'space-between',
  },
  number: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.primary,
    alignSelf: 'center',
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.black,
    // marginTop: 4,
  },
  button: {
    backgroundColor: fontStyles.colors.lightishGrey,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cgtTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.cyan,
  },
});

export default PipelineCard;
