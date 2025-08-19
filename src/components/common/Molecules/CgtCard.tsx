import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Camera from '../../../assets/images/svg/Camera';
import fontStyles from '../../../assets/styles/constants';
import SquareCheckBoxes from '../Atoms/checkBoxes/SquareCheckBoxes';
import {useAlert} from '../../../../AlertContext';
import languages from '../../../common/language';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Edit from 'react-native-vector-icons/MaterialCommunityIcons';

interface CgtProps {
  props: any;
  onPress: () => void;
  is_hv_fi_required?: any;
  onClick?: any;
  isChecked?: any;
  setIsChecked?: any;
  url?: any;
  isLast?: any;
  isGrt?: any;
  onLeaderPress?: any;
  isLeader?: any;
  name?: any;
  id?: any;
  position?: any;
  onPreviewImage?: (url: any) => void;
  showEditButton?: boolean;
  
}

const CgtCard: React.FC<CgtProps> = ({
  isGrt,
  isLast,
  name,
  id,
  position,
  onPress,
  is_hv_fi_required,
  onClick,
  setIsChecked,
  isChecked,
  url,
  onLeaderPress,
  isLeader,
  onPreviewImage,
  showEditButton,
}) => {
//  console.log('Received image URL:', url);
  const showAlert = useAlert();
  const handleUploadPhoto = async () => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 800, maxHeight: 800, quality: 0.8},
      response => {
        if (response.didCancel) {
          showAlert(languages['Upload Cancelled'][fontStyles.lang]);
        } else if (response.errorCode) {
          showAlert(
            languages.Error[fontStyles.lang],
            response.errorMessage ||
              languages['Unknown error occurred'][fontStyles.lang],
          );
        } else {
          console.log('Photo URI:', response.assets?.[0]?.uri);
          showAlert(
            languages['Photo Uploaded'][fontStyles.lang],
            languages['Photo added successfully'][fontStyles.lang],
          );
        }
      },
    );
  };

  const [lead, setLead] = useState(isLeader);

  useEffect(() => {
    setLead(isLeader);
  }, [isLeader]);

  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <SquareCheckBoxes
          isChecked={isChecked}
          onCheck={setIsChecked}
          checkedColor={fontStyles.colors.primary}
          uncheckedColor={fontStyles.colors.white}
          borderColorWhenUnchecked={fontStyles.colors.black}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>
            {languages.ID[fontStyles.lang]}: {id}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />

      {isGrt && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={onLeaderPress}
            style={{
              flexDirection: 'row',
              padding: 5,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: lead
                ? fontStyles.colors.secondary
                : fontStyles.colors.pink,
              marginBottom: 10,
            }}>
            <Edit name="crown-outline" size={20} color={'#904B3D'} />
            <Text
              style={[
                styles.fieldText,
                {fontSize: 12, color: fontStyles.colors.primary, marginLeft: 3},
              ]}>
              {lead
                ? languages['Center Leader'][fontStyles.lang]
                : languages['Update Center Leader'][fontStyles.lang]}
            </Text>
          </TouchableOpacity>

          {showEditButton && (
            <TouchableOpacity
              onPress={onPress}
              style={{
                padding: 8,
                borderRadius: 20,
                alignItems: 'center',
                backgroundColor: '#ddd',
              }}>
              <Edit name="pencil-outline" size={18} color={'#000'} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {is_hv_fi_required == '1' && (
        <View style={styles.content}>
          <Text style={styles.fieldText}>{position}</Text>
          {url && (
            // <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                console.log();
                if (onPreviewImage) {
                  // onPreviewImage(url);
                  //  onPreviewImage(url[0]);
                  onPreviewImage(url);
                } else {
                  console.warn('onPreviewImage is undefined');
                }
              }}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: url}}
                //  source={{ uri: url[0] }}
                style={[{height: 50, width: 100, right: -10}]}
                resizeMode="contain"
                onError={() =>
                  showAlert(
                    languages['Image Load Failed'][fontStyles.lang] ||
                      'Image Load Failed',
                    languages[
                      'Unable to load the image. Please try again later.'
                    ][fontStyles.lang] ||
                      'Unable to load the image. Please try again later.',
                  )
                }
              />
              {/* </View> */}
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={onClick}>
            <Camera />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    borderWidth: 0.1,
    padding: 12,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.darkBrown,
  },
  divider: {
    height: 1,
    backgroundColor: fontStyles.colors.black,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldText: {
    color: fontStyles.colors.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    color: fontStyles.colors.primary,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: fontStyles.colors.transparentBlack,
    // marginTop: 4,
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
  },
});

export default CgtCard;
