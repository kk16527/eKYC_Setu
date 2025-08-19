import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Edit from 'react-native-vector-icons/MaterialCommunityIcons';
import fontStyles from '../../../../assets/styles/constants';
import languages from '../../../../common/language';

interface FamilyDetailsProps {
  name: any
  id: any
  role: any
  relation: any
  onPress: () => void;
}

const FamilyDetailsCard: React.FC<FamilyDetailsProps> = ({ name, id, role, relation, onPress }) => {

  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.id}>{languages.ID[fontStyles.lang]}: {id}</Text>
        </View>
        <View style={styles.sideContent}>
          <Text style={styles.sideText}>{role}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={[styles.fieldsContainer, { backgroundColor: relation == "Guarenteer" ? fontStyles.colors.primary : fontStyles.colors.secondary }]}>
          <Text style={[styles.fieldText, { color: relation == "Guarenteer" ? "#fff" : fontStyles.colors.cyan }]}>{relation}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Edit name="pencil-outline" size={18} color={fontStyles.colors.lightBrown} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={onPress}>
            <Trash name="trash-2" size={18} color={fontStyles.colors.lightBrown} />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: fontStyles.colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkGreyishVoilet,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: '500',
    color: fontStyles.colors.darkBrown,
  },
  id: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: fontStyles.colors.darkBrown,
  },
  sideContent: {
    flex: 1,
    alignItems: 'flex-end',
    color: fontStyles.colors.cyan,
  },
  sideText: {
    color: fontStyles.colors.darkPink,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    marginRight: 6,
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
  fieldsContainer: {
    justifyContent: 'center',
    backgroundColor: fontStyles.colors.secondary,
    borderRadius: 6,
    height: 30,
  },
  fieldText: {
    color: fontStyles.colors.cyan,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    marginRight: 6,
    paddingHorizontal: 12,
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
    backgroundColor: fontStyles.colors.lightishGrey,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FamilyDetailsCard;
