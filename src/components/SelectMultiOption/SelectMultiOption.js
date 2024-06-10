import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useRef} from 'react';
import {MultiSelect} from 'react-native-element-dropdown';
import {Colors} from '../../assets/colors';
import Fonts from '../../assets/fonts/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SelectMultiOption = memo(({label, data, value, setValue}) => {
  const multiSelectRef = useRef(null);
  // console.log(value, 'dddddddddd');

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  const renderLabel = () => {
    return <Text style={[styles.label]}>{label}</Text>;
  };

  const onSelectedItemsChange = item => {
    setValue(item);
    if (multiSelectRef.current) {
      multiSelectRef.current.close(); // Close the dropdown
    }
  };
  return (
    <View style={styles.container}>
      {label && renderLabel()}
      <MultiSelect
        ref={multiSelectRef}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={
          value.length > 0 ? `${value.length} Selected` : 'Select item'
        }
        value={value}
        onChange={onSelectedItemsChange}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity
            onPress={() => unSelect && unSelect(item)}
            style={styles.selectedStyle}>
            <Text style={styles.textSelectedStyle}>{item.label}</Text>
            <AntDesign color="black" name="delete" size={17} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

export default SelectMultiOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Fonts.Manrope400,
  },
  selectedTextStyle: {
    fontSize: 16,
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  label: {
    backgroundColor: 'white',

    fontSize: 14,
    marginBottom: 5,
    color: Colors.primarycolor,
    fontFamily: Fonts.Manrope600,
  },
});
