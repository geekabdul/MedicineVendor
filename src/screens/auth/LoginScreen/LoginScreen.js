import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import {appImages} from '../../../assets/images';
import {Colors} from '../../../assets/colors';
import Button from '../../../components/Button/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {APICall, BASEURL} from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import Fonts from '../../../assets/fonts/Fonts';

const {width: screenWidth} = Dimensions.get('window');

const Carausel = [
  {
    illustration:
      'https://img.freepik.com/free-photo/high-angle-pill-foils-plastic-containers_23-2148533456.jpg?w=740&t=st=1690526005~exp=1690526605~hmac=3ef79e4f202347f89dc54293b81ea00139b58a3ebc2919285015d9796c091520',
  },
  {
    illustration:
      'https://img.freepik.com/free-photo/closeup-view-pharmacist-hand-taking-medicine-box-from-shelf-drug-store_342744-320.jpg?w=740&t=st=1690526653~exp=1690527253~hmac=07027cfa278012d68ebf9b375b68df4136c42e2938c65477893119f4bdc88be4',
  },
  {
    illustration:
      'https://img.freepik.com/free-photo/top-view-variety-medicine-tablets_23-2148529769.jpg?w=740&t=st=1690526668~exp=1690527268~hmac=dc51688548ad5fe678f3cc34416042fa814b044ed26a4ba1ba2c7de32ce676cd',
  },
];

const renderItem = ({item, index}) => {
  return (
    <>
      <Image
        source={appImages.logoMain}
        style={{
          width: screenWidth / 1.2,
          height: screenWidth / 1.8,
          alignSelf: 'center',
          marginVertical: 15,
          resizeMode: 'contain',
        }}
      />
    </>
  );
};
const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {from} = route.params;
  const carouselRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [imgActive1, setImgActive1] = useState(0);
  const [number, setNumber] = useState('');
  const Continue = () => {
    const params = {
      mobile: number,
      type:
        from === 'Store'
          ? 1
          : from === 'Lab'
          ? 2
          : from === 'Delivery'
          ? 3
          : null,
    };
    APICall('post', 'login', params, OnSucessLogin, OnFailLogin);
  };

  const OnSucessLogin = data => {
    console.log(data, 'login success');
    if (data?.status) {
      navigation.navigate('OTPScreen', {
        number: number,
        type:
          from === 'Store'
            ? 1
            : from === 'Lab'
            ? 2
            : from === 'Delivery'
            ? 3
            : null,
      });
      // Toast.show('OTP sent');
      setNumber('');
    }
  };

  const OnFailLogin = error => {
    console.log(error?.response?.data, 'login error');
    Toast.show(error?.response?.data?.message);
  };

  const handleInputFocus = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 500, animated: true});
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      handleInputFocus();
    });
    return () => {
      showSubscription.remove();
    };
  }, []);
  return (
    <ScrollView
      ref={scrollViewRef}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.mainContainer}>
      <Carousel
        ref={carouselRef}
        autoplay={true}
        contentContainerStyle={{backgroundColor: 'lightpink'}}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={Carausel}
        loop={true}
        autoplayInterval={4000}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={index => setImgActive1(index)}
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.Poppins600,
          color: 'black',
          textAlign: 'center',
        }}>
        Medicine delivery in 2 hours*
      </Text>
      <View
        style={{
          width: screenWidth / 1.1,
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {Carausel.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: 20,
                height: 4,
                marginHorizontal: 7,
                borderRadius: 10,
                backgroundColor:
                  imgActive1 == index ? Colors.primarycolor : '#E5E5E5',
              }}
            />
          );
        })}
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.title}>Sign in / Sign up</Text>
        <Text style={styles.details}>
          Sign in or Sign up to order and access your Medicine, Lab Test,
          Special Offers and more...
        </Text>
        <Text style={styles.heading}>PHONE NUMBER</Text>
        <View style={styles.numberBox}>
          <Text style={styles.codeText}>+91</Text>
          <TextInput
            style={styles.numberText}
            onChangeText={value => {
              setNumber(value.replace(/[^0-9]/g, ''));
            }}
            placeholderTextColor={Colors.dark}
            value={number}
            maxLength={10}
            onFocus={handleInputFocus}
            keyboardType="numeric"
          />
        </View>
        <Button
          Width={'100%'}
          btnTxt={'LOG IN USING OTP'}
          customStyle={{
            backgroundColor: number.length == 10 ? Colors.primarycolor : 'grey',
          }}
          disabled={number.length != 10}
          submit={() => Continue()}
          // submit={() => navigation.navigate('OTPScreen')}
        />
        <TouchableOpacity activeOpacity={0.9}>
          <Image
            source={appImages.googleLogo}
            style={{
              width: screenWidth / 1.08,
              alignSelf: 'center',
              resizeMode: 'stretch',
              height: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9}>
          <Image
            source={appImages.fbLogo}
            style={{
              width: screenWidth / 1.08,
              alignSelf: 'center',
              resizeMode: 'stretch',
              height: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.versionText}>V 1.03</Text>
      <Text style={styles.policiesText}>
        By continuing you agree to our{' '}
        <Text style={[styles.policiesText, {color: '#fd5c63'}]}>
          Term of service
        </Text>{' '}
        and{' '}
        <Text style={[styles.policiesText, {color: '#fd5c63'}]}>
          Privacy & Legal Policy
        </Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;
