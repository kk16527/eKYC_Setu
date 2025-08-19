// BottomDrawer.tsx
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SurpriseBranchVisit from '../../screens/Screens/FieldMonitoring/surpriseBranchVisit/SurpriseBranchVisit';
// import SurpriseBranchVisit from '../sreens/surpriseBranchVisit/SurpriseBranchVisit';
import SurpriseCenterVisit from '../../screens/Screens/FieldMonitoring/surpriseCenterVisit/SurpriseCenterVisit';
// import SurpriseCenterVisit from '../sreens/surpriseCenterVisit/SurpriseCenterVisit';
import Others from '../../screens/Screens/FieldMonitoring/others/Others';
// import Others from '../sreens/others/Others';
import Home from '../../screens/Screens/FieldMonitoring/home/Home';
// import Home from '../sreens/home/Home';
import VisitScreen from '../../screens/Screens/FieldMonitoring/VisitScreen/VisitScreen';
// import ImageZoom from '../sreens/ImageZoom';

const Tab = createBottomTabNavigator();

const BottomDrawer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#FCEAE6',
        },
        tabBarActiveTintColor: '#231917',
        tabBarInactiveTintColor: '#534340',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Dashboard',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? '#9CF1F0' : 'transparent'},
              ]}>
              <Text>D</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SurpriseBranchVisit"
        component={SurpriseBranchVisit}
        options={{
          title: 'Branch Visit',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? '#9CF1F0' : 'transparent'},
              ]}>
              <Text>S</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="VisitScreen"
        component={VisitScreen}
        options={{
          title: 'Client Visit',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? '#9CF1F0' : 'transparent'},
              ]}>
              <Text>Client</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SurpriseCenterVisit"
        component={SurpriseCenterVisit}
        options={{
          title: 'Center Visit',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? '#9CF1F0' : 'transparent'},
              ]}>
              <Text>Center</Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Others"
        component={Others}
        options={{
          title: 'Others',
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? '#9CF1F0' : 'transparent'},
              ]}>
              <Text>Other</Text>
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 30,
    width: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default BottomDrawer;
