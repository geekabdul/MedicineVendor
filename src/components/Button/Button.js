import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../../assets/fonts/Fonts';
import {Colors} from '../../assets/colors';

export default function Button({
  btnTxt,
  Width,
  customStyle,
  txtStyle,
  submit = null,
  disabled,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled}
      onPress={() => submit && submit()}
      style={[
        styles.btnBox,
        {
          backgroundColor: disabled ? Colors.lightPrimary : Colors.primarycolor,
          ...customStyle,
          width: Width,
        },
      ]}>
      <Text style={[styles.btnText, {...txtStyle}]}>{btnTxt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnBox: {
    backgroundColor: Colors.primarycolor,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 7,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: Fonts.Poppins600,
    color: 'white',
  },
});
