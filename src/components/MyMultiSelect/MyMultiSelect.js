import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../assets/fonts/Fonts';

const MyMultiSelect = ({label, data, value, setValue}) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  const handlePress = item => {
    const isSelected = value.some(
      selectedItem => selectedItem.value === item.value,
    );
    if (isSelected) {
      // Deselect the item
      setValue(value.filter(selectedItem => selectedItem.value !== item.value));
    } else {
      // Select the item
      setValue([...value, item]);
    }
    setIsShowDropDown(!setIsShowDropDown);
  };
  return (
    <View>
      {label && (
        <Text
          style={{
            color: Colors.primarycolor,
            fontFamily: Fonts.Manrope600,
          }}>
          {label}
        </Text>
      )}
      <View
        style={styles.dropdown__container}
        onTouchEnd={() => setIsShowDropDown(!isShowDropDown)}>
        <Text style={styles.placeholder}>
          {value.length > 0 ? `${value.length} item Selected ` : 'Select item'}
        </Text>
        <Entypo name="chevron-down" size={15} />
      </View>
      <View>
        {isShowDropDown && (
          <ScrollView
            nestedScrollEnabled={true}
            style={{
              backgroundColor: 'white',
              elevation: 3,
              paddingVertical: 10,
              borderWidth: 0.1,
              margin: 1,
              maxHeight: 300,
            }}>
            {data?.map(el => (
              <Pressable
                onPress={() => handlePress(el)}
                style={({pressed}) => ({
                  backgroundColor: value.some(
                    selectedItem => selectedItem.value === el.value,
                  )
                    ? 'lightgrey'
                    : pressed
                    ? 'lightgrey'
                    : 'white',
                })}>
                <Text
                  style={{
                    paddingHorizontal: 10,

                    marginVertical: 20,
                    fontSize: 16,
                    fontFamily: Fonts.Manrope400,
                  }}>
                  {el.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
        {/* {value.length > 0 && (
          <View style={{position: 'absolute', zIndex: -1}}>
            {value.map(el => (
              <View>
                <Text>{el.label}</Text>
              </View>
            ))}
          </View>
        )} */}
      </View>
    </View>
  );
};

export default MyMultiSelect;

const styles = StyleSheet.create({
  dropdown__container: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: Colors.primarycolor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: 16,
    fontFamily: Fonts.Manrope400,
  },
});
