import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderScreen from '../../screens/Dashboard/Order.js/OrderScreen';
import { Colors } from '../../assets/colors';
import InventoryScreen from '../../screens/Dashboard/Inventory/InventoryScreen';
import InsightScreen from '../../screens/Dashboard/Insight/InsightScreen';
import ProfileScreen from '../../screens/Dashboard/Profile/ProfileScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../../assets/fonts/Fonts';
import useUserProfile from '../../hooks/useUserProfile';
import { ActivityIndicator } from 'react-native';

const OrderIcon = (color, focused) => (
  <Feather name="package" size={18} color={color} />
);
const InventoryIcon = (color, focused) => (
  <Entypo name="text-document" size={18} color={color} />
);
const InsightIcon = (color, focused) => (
  <Entypo name="light-bulb" size={18} color={color} />
);
const ProfileIcon = (color, focused) => (
  <Feather name="user" size={18} color={color} />
);

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const userData = useUserProfile();

  if (!userData) {
    return <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }} />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 13, fontFamily: Fonts.Poppins500 },
        tabBarActiveTintColor: Colors.primarycolor,
        tabBarInactiveTintColor: 'gray',
      }}
      initialRouteName="OrderScreen">
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, focused }) => OrderIcon(color, focused),
          tabBarLabel: 'Order',
        }}
      />

      {userData?.basic_details?.type !== 3 && (
        <>
          <Tab.Screen
            name="InventoryScreen"
            component={InventoryScreen}
            options={{
              tabBarIcon: ({ color, focused }) => InventoryIcon(color, focused),
              tabBarLabel: 'Inventory',
            }}
          />
          <Tab.Screen
            name="InsightScreen"
            component={InsightScreen}
            options={{
              tabBarIcon: ({ color, focused }) => InsightIcon(color, focused),
              tabBarLabel: 'Insight',
            }}
          />
        </>
      )}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => ProfileIcon(color, focused),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;
