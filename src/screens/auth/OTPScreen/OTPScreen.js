import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../../components/Button/Button';
import {Colors} from '../../../assets/colors';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fonts from '../../../assets/fonts/Fonts';
import OtpInputs from 'react-native-otp-inputs';
import {appImages} from '../../../assets/images';
import axios from 'axios';
import {APICall, BASEURL} from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {number, type} = route.params;

  const [timer, setTimer] = useState(30);
  const [otpLogin, setOtpLogin] = useState('');

  const decrementTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  };
  const startTimer = () => {
    setTimer(30);
  };
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(decrementTimer, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const Submit = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    const params = {
      device_token: fcmToken,
      mobile: number,
      otp: otpLogin,
      type: type,
    };
    APICall('post', 'verifyotp', params, OTPverified, OTPfailed);
  };
  const OTPverified = async data => {
    if (data?.status) {
      try {
        await AsyncStorage.setItem('Token', data?.token);
        await AsyncStorage.setItem('type', type.toString());
        Toast.show('Login Successfully');
        // console.log(data?.data, 'login success');
        if (!data?.data?.profile_filled) {
          navigation.navigate('AddProfileScreen', {type});
        } else if (!data?.data?.document_uploaded) {
          navigation.navigate('UploadDocument', {type});
        } else if (!data?.data?.bank_details && type !== 3) {
          navigation.navigate('UploadBankScreen');
        } else {
          navigation.navigate('Dashboard');
        }
        // getProfile();
      } catch (error) {
        console.error('Error saving data to AsyncStorage', error);
        // Handle error scenario (e.g., show an error message)
      }
    }
  };
  const OTPfailed = error => {
    Toast.show(error?.response?.data?.message);
  };
  const ResendOtp = () => {
    const params = {
      mobile: number,
      type: type,
    };

    axios
      .post(`${BASEURL}resendotp`, params)
      .then(response => {
        if (response?.data?.status) {
          Toast.show('OTP has been sent');
        }
      })
      .catch(error => {
        Toast.show(error?.response?.data?.message);
      });
  };

  // const getProfileSuccess = res => {
  //   // console.log(
  //   //   res?.result?.status?.profile_filled,
  //   //   'Profile fetch successful',
  //   // );
  //   if (res?.result?.status?.profile_filled) {
  //     navigation.navigate('Dashboard');
  //   } else {
  //     navigation.navigate('AddProfileScreen', {type});
  //   }
  // };

  // const getProfileFail = error => {
  //   console.log(error?.response?.data, 'Error fetching profile');
  // };

  // const getProfile = async () => {
  //   APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  // };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.title1}>
        Please enter OTP to access all Services!
      </Text>
      <Text style={styles.title3}>OTP sent on SMS</Text>
      <OtpInputs
        autofillFromClipboard={false}
        inputContainerStyles={{
          borderWidth: 1,
          borderColor: '#abab',
          height: 45,
          width: 45,
          borderRadius: 7,
          marginTop: 15,
        }}
        inputStyles={{
          textAlign: 'center',
          fontSize: 16,
          color: Colors.primarycolor,
          fontFamily: Fonts.Manrope500,
        }}
        handleChange={code => {
          setOtpLogin(code);
        }}
        numberOfInputs={6}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      />
      <View style={styles.timeBox}>
        {timer != 0 ? (
          <>
            <Text style={styles.title4}>Resent the OTP in </Text>
            <Text style={styles.title4}>
              {timer < 10 ? 0 : ''}
              {timer} sec
            </Text>
          </>
        ) : (
          <Text style={[styles.title4, {fontSize: 12}]}>
            Didn't receive the OTP?{' '}
            <Text
              onPress={() => {
                ResendOtp();
                startTimer();
              }}
              style={[
                styles.title4,
                {color: Colors.primarycolor, fontSize: 14},
              ]}>
              Resend OTP
            </Text>
          </Text>
        )}
      </View>
      <Button btnTxt={'SUBMIT OTP'} submit={() => Submit()} Width={'100%'} />
      <Image
        source={appImages.waterMark}
        style={{
          resizeMode: 'contain',
          width: 180,
          height: 180,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default OTPScreen;
