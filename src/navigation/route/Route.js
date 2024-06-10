import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from '../auth/Auth';
import UploadDocument from '../../screens/Profile/UploadDocument/UploadDocument';
import Dashboard from '../BottomTab/BottomTab';
import AddProfileScreen from '../../screens/Profile/AddProfileScreen/AddProfileScreen';
import Settings from '../../screens/Settings/Settings';
import UploadBankScreen from '../../screens/Profile/UploadBankScreen/UploadBankScreen';
import AddDeliveryBoy from '../../screens/AddDeliveryBoy/AddDeliveryBoy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserProfile from '../../hooks/useUserProfile';
import OrderDetailsScreen from '../../screens/Dashboard/Order.js/OrderDetailsScreen';
import TotalSalesScreen from '../../screens/TotalSales/TotalSalesScreen';
import UpdatTimingScreen from '../../screens/UpdateTiming/UpdatTimingScreen';
import Main from '../../screens/Main/Main';
import DeliveryBoyListScreen from '../../screens/DeliveryBoyList/DeliveryBoyListScreen';
import Notification from '../../screens/Notification/Notification';
import AssignedOrdersScreen from '../../screens/AssignedOrders/AssignedOrdersScreen';
import LoginChoiceScreen from '../../screens/auth/LoginChoiceScreen/LoginChoiceScreen';
import LoginVendorScreen from '../../screens/auth/LoginVendorScreen/LoginVendorScreen';
import LoginScreen from '../../screens/auth/LoginScreen/LoginScreen';
import OTPScreen from '../../screens/auth/OTPScreen/OTPScreen';
import HealthReportsScreen from '../../screens/HealthReports/HealthReportsScreen';
import ViewDeliveryBoy from '../../screens/ViewDeliveryBoy/ViewDeliveryBoy';
import MapScreen from '../../screens/MapScreen/MapScreen';
import VerifyOrderScreen from '../../screens/VerifyOrderScreen/VerifyOrderScreen';
import DeliveredOrderScreen from '../../screens/DeliveredOrder/DeliveredOrderScreen';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();
const Route = () => {
  const userData = useUserProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const getData = async () => {
    try {
      const authToken = await AsyncStorage.getItem('Token');
      setToken(authToken);
    } catch (error) {
      console.error('Failed to load token', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return null; // or your loading component
  }

  const initialRoute = () => {
    // console.log(userData?.status?.profile_filled, 'checking status');
    if (token) {
      // if (userData?.status?.profile_filled == false) {
      //   return 'AddProfileScreen';
      // } else if (userData?.status?.document_uploaded == false) {
      //   return 'UploadDocument';
      // } else if (userData?.status?.bank_details == false) {
      //   return 'UploadBankScreen';
      // } else {
      //   return 'Dashboard';
      // }
      if (!userData?.status?.profile_filled) {
        return 'AddProfileScreen';
      } else if (!userData?.status?.document_uploaded) {
        return 'UploadDocument';
      } else if (
        !userData?.status?.bank_details &&
        userData?.basic_details?.type !== 3
      ) {
        return 'UploadBankScreen';
      } else {
        return 'Dashboard';
      }
    } else {
      return 'LoginChoiceScreen';
    }
  };

  // console.log(userData, 'userdataaaaaaaaaaaaaa');
  if (!userData && token) {
    return <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute()}>
        {/* AUTH STACKS */}
        <Stack.Screen name="LoginChoiceScreen" component={LoginChoiceScreen} />
        <Stack.Screen name="LoginVendorScreen" component={LoginVendorScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddProfileScreen" component={AddProfileScreen} />
        <Stack.Screen name="UploadDocument" component={UploadDocument} />
        <Stack.Screen name="UploadBankScreen" component={UploadBankScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddDeliveryBoy" component={AddDeliveryBoy} />
        <Stack.Screen
          name="DeliveryBoyListScreen"
          component={DeliveryBoyListScreen}
        />
        <Stack.Screen name="ViewDeliveryBoy" component={ViewDeliveryBoy} />
        <Stack.Screen
          name="AssignedOrdersScreen"
          component={AssignedOrdersScreen}
        />
        <Stack.Screen
          name="HealthReportsScreen"
          component={HealthReportsScreen}
        />
        <Stack.Screen name="TotalSalesScreen" component={TotalSalesScreen} />
        <Stack.Screen name="UpdatTimingScreen" component={UpdatTimingScreen} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="VerifyOrderScreen" component={VerifyOrderScreen} />
        <Stack.Screen
          name="DeliveredOrderScreen"
          component={DeliveredOrderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
