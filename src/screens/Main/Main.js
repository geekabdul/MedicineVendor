import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../navigation/BottomTab/BottomTab';
import AddProfileScreen from '../Profile/AddProfileScreen/AddProfileScreen';
import UploadDocument from '../Profile/UploadDocument/UploadDocument';
import UploadBankScreen from '../Profile/UploadBankScreen/UploadBankScreen';
import { APICall } from '../../helper/Helper';

const Stack = createNativeStackNavigator();
const Main = () => {
  const [userDetail, setUserDetails] = useState();
  const getProfileSuccess = res => {
    setUserDetails(res?.result);
  };

  const getProfileFail = error => {
    console.log(error?.response?.data, 'Error fetching profile');
  };

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (!userDetail) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator />
      </View>
    );
  }
  const initialRouteName = () => {
    // Check profile_filled status first
    if (!userDetail?.status?.profile_filled) {
      return 'AddProfileScreen'; // Go to AddProfileScreen if profile isn't filled
    }
    // Check document_uploaded and bank_details based on type
    if (userDetail?.basic_details?.type === 3) {
      return 'Dashboard'; // Go to Dashboard directly if type is 3
    } else if (
      userDetail?.status?.document_uploaded &&
      userDetail?.status?.bank_details
    ) {
      return 'Dashboard'; // Go to Dashboard if both documents are uploaded
    } else {
      return 'UploadDocument'; // Go to UploadDocument otherwise
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name="AddProfileScreen"
        component={AddProfileScreen}
        initialParams={{ type: userDetail?.basic_details?.type }}
      />
      <Stack.Screen
        name="UploadDocument"
        component={UploadDocument}
        initialParams={{ type: userDetail?.basic_details?.type }}
      />
      <Stack.Screen name="UploadBankScreen" component={UploadBankScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
