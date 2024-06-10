import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import OTPTextInput from 'react-native-otp-textinput';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button/Button';
import Fonts from '../../assets/fonts/Fonts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {APICall} from '../../helper/Helper';
import Toast from 'react-native-simple-toast';

const VerifyOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;
  // console.log(data, 'verification routes data');
  let otpInput = useRef(null);
  const otpInputRef = useRef(null);
  const [otp, setOtp] = useState(null);
  const handleCodeChange = code => {
    setOtp(code);
  };

  const handleResendOtp = () => {
    resendOtp();
  };

  // API CALLS
  // VERIFY ORDER

  const verifyDelivery = () => {
    const param = {
      suborder_id: data['suborder-id'],
      delivery_code: otp,
    };
    console.log(param, 'verifyDelivery');
    APICall(
      'post',
      'delivery-boys/verify_code',
      param,
      onSuccessVerifyDelivery,
      onFailVerifyDelivery,
    );
  };

  const onSuccessVerifyDelivery = res => {
    Toast.show(res?.message);
    // console.log(res?.message, 'onSuccessVerifyDelivery');
    navigation.navigate('OrderScreen');
  };
  const onFailVerifyDelivery = err => {
    console.log(err?.response?.data, 'onFailVerifyDelivery');
  };

  //RESEND OTP API
  const resendOtp = () => {
    const param = {
      order_id: data['suborder-id'],
    };
    APICall(
      'post',
      'delivery-boys/resend-otp',
      param,
      onSuccessResendOtp,
      onFailResendOtp,
    );
  };

  const onSuccessResendOtp = res => {
    Toast.show(res?.message);
    otpInputRef.current.clear();
    // console.log(res, 'onSuccessResendOtp');
  };
  const onFailResendOtp = err => {
    console.log(err?.response?.data, 'onFailResendOtp');
  };

  return (
    <>
      <BackHeader headerTitle={'Verify Order'} />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.white,
          marginTop: 20,
          padding: 20,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.Manrope600,
            color: Colors.primarycolor,
            marginTop: 5,
          }}>
          Enter Verification Code
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.Manrope600,
            color: Colors.primarycolor,
            marginTop: 5,
          }}>
          We've Send You The Verification Code
        </Text>
        <OTPTextInput
          ref={otpInputRef}
          handleTextChange={handleCodeChange}
          tintColor={Colors.primarycolor}
          textInputStyle={styles.otp__Input}
          containerStyle={styles.otp__container}
          autoFocus={true}
          inputCount={6}
        />
        <TouchableOpacity
          onPress={handleResendOtp}
          style={{
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Text
            style={{fontFamily: Fonts.Manrope600, color: Colors.primarycolor}}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        <Button
          btnTxt={'Verify'}
          Width={'90%'}
          customStyle={{marginVertical: 20}}
          submit={() => {
            if (otp.length < 6) {
              Toast.show('please enter 6 digit otp');
            } else {
              verifyDelivery();
            }
          }}
        />
      </View>
    </>
  );
};

export default VerifyOrderScreen;

const styles = StyleSheet.create({
  otp__Input: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  otp__container: {marginTop: 20, width: '100%'},
});
