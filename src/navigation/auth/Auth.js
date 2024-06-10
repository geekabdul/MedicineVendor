import React from 'react';
// IMPORTS NAVIGATION
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginChoiceScreen from '../../screens/auth/LoginChoiceScreen/LoginChoiceScreen';
import LoginVendorScreen from '../../screens/auth/LoginVendorScreen/LoginVendorScreen';
import LoginScreen from '../../screens/auth/LoginScreen/LoginScreen';
import OTPScreen from '../../screens/auth/OTPScreen/OTPScreen';

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoginChoiceScreen">
      <AuthStack.Screen
        name="LoginChoiceScreen"
        component={LoginChoiceScreen}
      />
      <AuthStack.Screen
        name="LoginVendorScreen"
        component={LoginVendorScreen}
      />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
    </AuthStack.Navigator>
  );
};

export default Auth;
