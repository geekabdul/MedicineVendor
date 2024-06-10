import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {appImages} from '../../../assets/images';
import {Colors} from '../../../assets/colors';
import {useNavigation} from '@react-navigation/native';

const LoginChoiceScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      imageStyle={{opacity: 0.5}}
      source={appImages.launchScreen}
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginVendorScreen')}
        activeOpacity={0.8}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: Colors.lightPrimary,
          borderRadius: 5,
          borderWidth: 3,
          borderColor: Colors.primarycolor,
          marginVertical: 20,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 0.9,
            color: Colors.dark,
          }}>
          Login As Vendor
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen', {from: 'Delivery'})}
        activeOpacity={0.8}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: Colors.lightPrimary,
          borderRadius: 5,
          borderWidth: 3,
          borderColor: Colors.primarycolor,
          marginVertical: 20,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 0.9,
            color: Colors.dark,
          }}>
          Login As Delivery
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LoginChoiceScreen;
