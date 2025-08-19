import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import fontStyles from '../../../assets/styles/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import languages from '../../../common/language';

const AdminSideDrawer = () => {
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const navigation = useNavigation();
  const [name, setName] = useState<any>('');
  const [role, setRole] = useState<any>('');
  const handleItemPress = (item: string, route?: string) => {
    setFocusedItem(item);
    if (route) {
      navigation.navigate(route);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name);
    const role = await AsyncStorage.getItem('roles');
    setRole(role?.replace('[', '')?.replace(']', '')?.replaceAll('"', ''));
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <AntDesign name="left" size={18} color={fontStyles.colors.black} />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        {/* <View > */}
        <Image
          source={require('../../../assets/images/userProfille.jpg')}
          style={[styles.profileImage, {right: 0, objectFit: 'contain'}]}
          resizeMode="contain"
        />
        {/* </View> */}
        <View style={styles.profileText}>
          <Text style={styles.drawerSubText}>{name}</Text>
          <Text style={styles.drawerSubText2}>{role}</Text>
        </View>
        {/* <EditButton /> */}
      </View>

      {/* Menu Items */}
      <View style={styles.menuItems}>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Tasks' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Tasks')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/star.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Tasks' && {color: fontStyles.colors.white},
              ]}>
              {languages.Tasks[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Leads' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Leads')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/star.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Leads' && {color: fontStyles.colors.white},
              ]}>
              {languages.Leads[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'New Leads' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('New Leads')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/star.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'New Leads' && {color: fontStyles.colors.white},
              ]}>
              {languages['New Leads'][fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Total Users' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Total Users')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/star.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Total Users' && {
                  color: fontStyles.colors.white,
                },
              ]}>
              {languages['Total Users'][fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Center' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Center')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/center.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Center' && {color: fontStyles.colors.white},
              ]}>
              {languages.Center[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Route' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Route', 'RouteList')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/route.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Route' && {color: fontStyles.colors.white},
              ]}>
              {languages.Route[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            focusedItem === 'Support' && styles.focusedItem,
          ]}
          onPress={() => handleItemPress('Support')}>
          <View style={styles.itemContent}>
            <Image
              source={require('../../../assets/images/support.png')}
              style={[{width: 30}]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.drawerText,
                focusedItem === 'Support' && {color: fontStyles.colors.white},
              ]}>
              {languages.Support[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Support and Logout */}
      {/* <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.bottomItems}
           onPress={async () => {
            Alert.alert(
              "Logout",                
              "Are you sure you want to log out?",  
              [
                {
                  text: "Cancel",    
                  style: "cancel", 
                },
                {
                  text: "OK",        
                  onPress: async () => { 
                    await AsyncStorage.clear(); 
                    navigation.navigate("PhoneNo");  
                  },
                },
              ],
              { cancelable: false }   // Disallow dismissing the alert by tapping outside
            );
          }}
          >
            <View style={styles.itemContent}>
              <Logout color={fontStyles.colors.white} />
              <Text style={styles.itemText}>Logout</Text>
            </View>
          </TouchableOpacity>
       
        <Text style={styles.bottomText}>App Name :- Krytrim</Text>
        <Text style={styles.bottomText}>Owner :- Sindhuja Microcredit Pvt Ltd</Text>
        <Text style={styles.bottomText}>App Version :- 1.0</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fontStyles.colors.white,
    paddingHorizontal: fontStyles.spacing.paddingHorizontal,
  },
  backButton: {
    width: 30,
    marginBottom: 40,
    marginTop: 20,
    // paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: fontStyles.colors.gainsBoro,
    marginRight: 15,
    borderWidth: 3,
    borderColor: fontStyles.colors.limeGreen,
  },
  profileText: {
    width: '65%',
    textAlign: 'center',
  },
  drawerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: fontStyles.colors.greyBlack,
  },
  itemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.white,
  },
  drawerSubText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: 0.5,
    color: fontStyles.colors.greyBlack,
  },
  drawerSubText2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.greyBlack,
  },
  menuItems: {
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bottomText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: fontStyles.colors.greyBlack,
  },
  bottomItems: {
    width: '50%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: fontStyles.colors.primary,
    shadowColor: fontStyles.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3, // Convert 4D hex to decimal (0.3 for 4D)
    shadowRadius: 2, // Matches the blur radius
    // Android shadow
    elevation: 2, // Matches the elevation effect
  },
  iconContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 12,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkPink,
  },
  focusedItem: {
    backgroundColor: fontStyles.colors.primary,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AdminSideDrawer;
