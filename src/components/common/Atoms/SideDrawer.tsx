import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../../ThemeContext';
import {useAlert} from '../../../../AlertContext';
import AppLoader from './AppLoader';
import languages from '../../../common/language';
import fontStyles from '../../../assets/styles/constants';
import Apis from '../../../services/apis';

import HomeIcon from '../../../assets/images/svg/HomeIcon';
import Sales2 from '../../../assets/images/svg/Sales2';
import Collections from '../../../assets/images/svg/Collections';
import RoutesIcon from '../../../assets/images/svg/RoutesIcon';
import Villages from '../../../assets/images/svg/Villages';
import Logout from '../../../assets/images/svg/Logout';

const SideDrawerScreen = () => {
  const apis = new Apis();
  const navigation = useNavigation();
  const showAlert = useAlert();
  const {isDarkTheme} = useTheme();
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const [name, setName] = useState('');

  const [moduleData, setModuleData] = useState<any[]>([]);
  const [load, setLoad] = useState(true);
  const [rolesList, setRolesList] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoad(true);
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedRole = await AsyncStorage.getItem('roles');
      const storedRoles = storedRole ? JSON.parse(storedRole) : [];
      setRolesList(storedRoles);

      storedRoles.forEach(role => {
        // console.log('Role Name:', role.role_name);
      });

      const storedModules = await AsyncStorage.getItem('moduleData');

      if (storedName) {
        setName(storedName);
      }

      if (storedModules) {
        setModuleData(JSON.parse(storedModules));
      }
      setLoad(false);
    } catch (err) {
    } finally {
      setLoad(false);
    }
  };

  const hasPermission = (label: string) => {
    let foundData = moduleData.find(mod => mod.module_label == label);
    return foundData;
  };

  const handlePress = (label: string, route: any, data: any) => {
    setFocusedItem(label);

    navigation.navigate(route, {data});
  };

  const handleLogout = async () => {
    showAlert(
      languages.Logout[fontStyles.lang],
      languages['Are you sure you want to log out'][fontStyles.lang] ||
        'Are you sure you want to log out',
      [
        {text: languages.Cancel[fontStyles.lang], style: 'cancel'},
        {
          text: languages.OK[fontStyles.lang],
          onPress: async () => {
            try {
              setLoad(true);

              const logoutBody = {_func: 'logout'};
              const response = await apis.logout(logoutBody);

              if (response?.data?.result === 'successful') {
                const sessionKeys = [
                  'token',
                  'userid',
                  'name',
                  'branch_id',
                  'roles',
                  'moduleData',
                ];
                await AsyncStorage.multiRemove(sessionKeys);

                // Navigate to login screen
                navigation.navigate('PhoneNo' as never);
              } else {
                showAlert(
                  languages.Error[fontStyles.lang],
                  response?.data?.desc ||
                    'Logout failed. Please try again later.',
                );
              }
            } catch (err) {
              showAlert(
                languages.Error[fontStyles.lang],
                'An error occurred while logging out. Please try again later.',
              );
            } finally {
              setLoad(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getIconColor = (item: string) =>
    focusedItem === item
      ? fontStyles.colors.white
      : fontStyles.colors.greyBlack;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkTheme ? '#222' : fontStyles.colors.white},
      ]}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <AntDesign name="left" size={18} color={fontStyles.colors.black} />
      </TouchableOpacity>

      {/* Profile */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/userProfille.jpg')}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <View style={styles.profileText}>
          <Text style={styles.drawerSubText}>{name}</Text>

          <Text>{rolesList.map(role => role.role_name).join(', ')}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItems}>
        {(() => {
          let permissionData = hasPermission('Home');

          if (permissionData) {
            return (
              <DrawerItem
                label="Home"
                icon={<HomeIcon color={getIconColor('Home')} />}
                focused={focusedItem === 'Home'}
                onPress={() =>
                  handlePress('Home', 'Mainscreen', permissionData)
                }
              />
            );
          }
        })()}

        {(() => {
          let permissionData = hasPermission('Sales');
          if (permissionData) {
            return (
              <DrawerItem
                label="Sales"
                icon={<Sales2 color={getIconColor('Sales')} />}
                focused={focusedItem === 'Sales'}
                onPress={() =>
                  handlePress('Sales', 'Salesscreen', permissionData)
                }
              />
            );
          }
        })()}

        {(() => {
          let permissionData = hasPermission('Collections');
          if (permissionData) {
            return (
              <DrawerItem
                label="Collections"
                icon={<Collections color={getIconColor('Collections')} />}
                focused={focusedItem === 'Collections'}
                onPress={() =>
                  handlePress('Collections', 'Collections', permissionData)
                }
              />
            );
          }
        })()}

        {(() => {
          let permissionData = hasPermission('Village And Center');
          if (permissionData) {
            return (
              <DrawerItem
                label="Villages"
                icon={<Villages color={getIconColor('Villages')} />}
                focused={focusedItem === 'Villages'}
                onPress={() =>
                  handlePress('Villages', 'Villages', permissionData)
                }
              />
            );
          }
        })()}

        {(() => {
          let permissionData = hasPermission('Routes');
          if (permissionData) {
            return (
              <DrawerItem
                label="Routes"
                icon={<RoutesIcon color={getIconColor('Routes')} />}
                focused={focusedItem === 'Routes'}
                onPress={() => handlePress('Routes', 'Routes', permissionData)}
              />
            );
          }
        })()}

        {(() => {
          let permissionData = hasPermission('Field Monitoring');
          if (permissionData) {
            return (
              <DrawerItem
                label="Field Monitoring"
                icon={<RoutesIcon color={getIconColor('Field Monitoring')} />}
                focused={focusedItem === 'Field Monitoring'}
                onPress={() =>
                  handlePress(
                    'Field Monitoring',
                    'BranchScreen',
                    permissionData,
                  )
                }
              />
            );
          }
        })()}
      </View>

      {/* Logout & Footer */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomItems} onPress={handleLogout}>
          <View style={styles.itemContent}>
            <Logout color={'#fff'} />
            <Text style={styles.itemText}>
              {languages.Logout[fontStyles.lang]}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.bottomText}>{languages.App[fontStyles.lang]}</Text>
        <Text style={styles.bottomText}>
          {languages.Owner[fontStyles.lang]}
        </Text>
        <Text style={styles.bottomText}>
          {languages.Version[fontStyles.lang]}
        </Text>
      </View>
      {load && <AppLoader />}
    </View>
  );
};

// Drawer Item Component
const DrawerItem = ({label, icon, onPress, focused}: any) => (
  <TouchableOpacity
    style={[styles.iconContainer, focused && styles.focusedItem]}
    onPress={onPress}>
    <View style={styles.itemContent}>
      {icon}
      <Text
        style={[
          styles.drawerText,
          focused && {color: fontStyles.colors.white},
        ]}>
        {languages[label]?.[fontStyles.lang] ?? label}
      </Text>
    </View>
  </TouchableOpacity>
);

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
  drawerSubText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '400',
    color: fontStyles.colors.greyBlack,
  },
  drawerSubText2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '400',
    color: fontStyles.colors.greyBlack,
  },
  menuItems: {
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 12,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: fontStyles.colors.darkPink,
  },
  focusedItem: {
    backgroundColor: fontStyles.colors.primary,
  },
  drawerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    paddingHorizontal: 20,
    color: fontStyles.colors.greyBlack,
  },
  itemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 10,
    color: '#fff',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  bottomText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: fontStyles.colors.greyBlack,
  },
});

export default SideDrawerScreen;
