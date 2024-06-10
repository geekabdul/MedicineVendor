import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {memo} from 'react';
import Fonts from '../../assets/fonts/Fonts';
import {Colors} from '../../assets/colors';

const InputField = ({
  value,
  setValue,
  placeholder,
  label,
  keyboardType,
  isEditable = true,
  maxLength,
}) => {
  return (
    <View>
      {label ? (
        <Text
          style={{color: Colors.primarycolor, fontFamily: Fonts.Manrope600}}>
          {label}
        </Text>
      ) : null}
      <TextInput
        style={styles.inputField}
        onChangeText={setValue}
        placeholderTextColor={'grey'}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={isEditable}
        maxLength={maxLength}
      />
    </View>
  );
};

export default memo(InputField);

const styles = StyleSheet.create({
  inputField: {
    padding: 0,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 7,
    fontSize: 12,
    borderRadius: 3,
    color: 'black',
    fontFamily: Fonts.Manrope400,
    borderWidth: 1,
    borderColor: Colors.primarycolor,
    backgroundColor: 'white',
    width: '100%',
  },
});
