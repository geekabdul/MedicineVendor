import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../assets/fonts/Fonts';

const SecondaryHeader = ({headerTitle}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 15,
      }}>
      <View onTouchEnd={() => navigation.goBack()}>
        <AntDesign name={'close'} size={20} color={Colors.dark} />
      </View>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 18,
          // fontWeight: 'bold',
          fontFamily: Fonts.Manrope800,
          color: Colors.dark,
        }}>
        {headerTitle}
      </Text>
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({});
