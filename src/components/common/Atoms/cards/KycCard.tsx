import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';
import ImagePreview from '../../Molecules/ImagePreview';

const { width, height } = Dimensions.get('window');

interface KycCardProps {
  title: string;
  data: any;
  desc: string;
  frontURL: any;
  backURL: any;
  onPress: (param: any) => void;
}

const KycCard: React.FC<KycCardProps> = ({
  title,
  data,
  desc,
  frontURL,
  backURL,
  onPress,
}) => {
  // ✅ Added state for image preview modal
  const [showModal3, setShowModal3] = useState(false);
  const [selurl, setSelurl] = useState('');
  const [load, setLoad] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.dataContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 5,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (frontURL) {
                setSelurl(frontURL);
                setShowModal3(true);
              }
            }}
            style={{
              borderWidth: 1,
              borderColor: fontStyles.colors.black,
              borderStyle: 'dashed',
              color: fontStyles.colors.primary,
              height: 90,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                frontURL
                  ? { uri: frontURL }
                  : require('../../../../assets/images/frontID.png')
              }
              style={[{ width: '80%', height: '80%' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (backURL) {
                setSelurl(backURL);
                setShowModal3(true);
              }
            }}
            style={{
              borderWidth: 1,
              borderColor: fontStyles.colors.black,
              borderStyle: 'dashed',
              color: fontStyles.colors.primary,
              height: 90,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                backURL
                  ? { uri: backURL }
                  : require('../../../../assets/images/backID.png')
              }
              style={[{ width: '80%', height: '80%' }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.descContainer}>
        <View>
          <Text style={[styles.nameText, { textAlign: 'center' }]}>{desc}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
          <Text style={styles.nameText}>
            {languages['ID Number'][fontStyles.lang]} :{' '}
          </Text>
          <Text style={styles.nameSubText}>
            {data?.id_no || languages['N/A'][fontStyles.lang]}
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: -2, alignItems: 'center' }}>
          <Text style={styles.nameText}>
            {languages['Public Data'][fontStyles.lang]} :{' '}
          </Text>
          <Text style={styles.nameSubText}>
            {data?.public_data_id || languages['N/A'][fontStyles.lang]}
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', marginTop: -2, alignItems: 'center' }}>
          <Text style={styles.nameText}>
            {languages['OCR ID'][fontStyles.lang]} :{' '}
          </Text>
          <Text style={styles.nameSubText}>
            {data?.ocr_id || languages['N/A'][fontStyles.lang]}
          </Text>
        </View>
      </View>

      {/* ✅ Modal for image zoom and preview */}
      {showModal3 && (
        <ImagePreview
          visible={showModal3}
          onClose={() => setShowModal3(false)}
          url={selurl}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
  },
  title: {
    fontWeight: '600',
    color: fontStyles.colors.primary,
    marginVertical: 12,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 5,
    lineHeight: 20,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  dataContainer: {
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    padding: 10,
    height: 120,
  },
  descContainer: {
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    padding: 10,
    marginTop: 5,
  },
  nameText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    color: fontStyles.colors.darkBrown,
  },
  nameSubText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
    color: fontStyles.colors.darkBrown,
  },
});

export default KycCard;
