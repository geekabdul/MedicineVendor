import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const Calendar = ({label, mode, value, setValue, minimumDate}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    if (mode === 'time') {
      console.log('A Time has been picked: ', date.toLocaleString());
      setValue(moment(date).format('HH:mm'));
    } else {
      console.log('A date has been picked: ', date.toLocaleString());
      setValue(moment(date).format('YYYY-MM-DD'));
    }
    hideDatePicker();
  };
  return (
    <>
      <View style={styles.dateTime_container}>
        <Text>{label}</Text>
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisibility(true);
          }}
          style={styles.dateTime_subContainer}>
          <Text style={{color: '#0080FF'}}>{value ? value : label}</Text>
          <AntDesign name="caretdown" color="#0080FF" />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        is24Hour={true}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minimumDate}
      />
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  dateTime__mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateTime_container: {
    width: '48%',
    paddingVertical: 20,
  },
  dateTime_subContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
