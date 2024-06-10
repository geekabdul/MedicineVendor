import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../../assets/colors';
import {appImages} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';

const LoginVendorScreen = () => {
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
        onPress={() => navigation.navigate('LoginScreen', {from: 'Store'})}
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
          Login As Store
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen', {from: 'Lab'})}
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
          Login As Lab
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LoginVendorScreen;
