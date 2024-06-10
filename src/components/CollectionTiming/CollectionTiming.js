import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Fonts from '../../assets/fonts/Fonts';
import {Colors} from '../../assets/colors';
import SelectMultiOption from '../SelectMultiOption/SelectMultiOption';
import MyMultiSelect from '../MyMultiSelect/MyMultiSelect';

const CollectionTiming = ({label, optionData, optionValue, optionSetValue}) => {
  // Make a copy of optionValue to avoid directly modifying the state
  const [localOptionValue, setLocalOptionValue] = useState([...optionValue]);

  const handleNumberChange = (text, index) => {
    const updatedOptionValue = [...optionValue];
    if (text.trim() === '') {
      // If the input value is empty, remove the 'number' key from the slot object
      delete updatedOptionValue[index].number;
    } else {
      // Otherwise, update the 'number' property of the slot object
      updatedOptionValue[index] = {...updatedOptionValue[index], number: text};
    }
    // Propagate the modified optionValue back to the parent component
    optionSetValue(updatedOptionValue);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.primarycolor,
          fontFamily: Fonts.Manrope600,
        }}>
        {label}
      </Text>
      {/* <SelectMultiOption
        data={optionData}
        value={optionValue}
        setValue={optionSetValue}
      /> */}
      <MyMultiSelect
        data={optionData}
        value={optionValue}
        setValue={optionSetValue}
      />
      <>
        {optionValue.length > 0 ? (
          <View>
            <Text
              style={{
                color: Colors.primarycolor,
                fontFamily: Fonts.Manrope600,
              }}>
              Patients For Slot:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingHorizontal: 1,
                marginVertical: 10,
                gap: 10,
              }}>
              {optionValue.map((slot, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.5,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.lightPrimary,
                      padding: 5,
                    }}>
                    <Text style={{}}>Slot {slot.value}</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: 10}}>
                    <TextInput
                      style={{padding: 0}}
                      keyboardType="numeric"
                      onChangeText={text => handleNumberChange(text, i)}
                      value={slot.number || ''}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </>
    </View>
  );
};

export default CollectionTiming;

const styles = StyleSheet.create({
  container: {marginVertical: 5},
});
