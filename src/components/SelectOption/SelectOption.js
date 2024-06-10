import {StyleSheet, Text, View} from 'react-native';
import React, {useState, memo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Colors} from '../../assets/colors';
import Fonts from '../../assets/fonts/Fonts';

const SelectOption = memo(({label, data, value, setValue}) => {
  //   const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return <Text style={[styles.label]}>{label}</Text>;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        //
      />
    </View>
  );
});

export default SelectOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // padding: 16,
    paddingHorizontal: 0,
    marginVertical: 5,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: Colors.primarycolor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    // position: 'absolute',
    backgroundColor: 'white',
    // left: 22,
    // top: 8,
    // zIndex: 999,
    // paddingHorizontal: 8,
    marginBottom: 5,
    fontSize: 14,
    color: Colors.primarycolor,
    fontFamily: Fonts.Manrope600,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Fonts.Manrope400,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primarycolor,
    fontFamily: Fonts.Manrope400,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
