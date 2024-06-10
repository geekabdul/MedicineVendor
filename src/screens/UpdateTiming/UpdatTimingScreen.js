import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import {APICall} from '../../helper/Helper';
import {Colors} from '../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getDayIndex = day => {
  // Convert the input day to lowercase to handle case-insensitivity
  const lowercaseDay = day.toLowerCase();

  // Array of days of the week
  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  // Use indexOf to find the index of the input day
  return daysOfWeek.indexOf(lowercaseDay);
};
const UpdatTimingScreen = () => {
  const [timingData, setTimingData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loginType, setLoginType] = useState(null);
  const getType = async () => {
    const type = await AsyncStorage.getItem('type');
    setLoginType(type);
  };

  const handleAddEditTime = (start, end) => {
    setStartTime(start);
    setEndTime(end);
    setModalVisible(true);
  };
  const handleSaveTimings = () => {
    if (!startTime || !endTime) {
      Toast.show('Please Select  Time Slot');
    } else {
      setModalVisible(false);
      UpdateTiming();
    }
  };

  const getTimings = async () => {
    APICall('get', 'get-timings', {}, onSuccessGetTiming, onFailGetTiming);
  };

  const onSuccessGetTiming = res => {
    // console.log(res?.result, 'getTimingSuccess');
    const dayNames = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    };
    const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    // Sort the data based on the order of days
    const sortedTimings = orderedDays.map(day => ({
      [dayNames[day]]: res?.result[0][day],
    }));
    // console.log(sortedTimings, 'sorted');

    setTimingData(sortedTimings);
  };
  const onFailGetTiming = err => {
    console.log(err, 'getTimingFail');
  };

  const UpdateTiming = () => {
    const param = {
      day: getDayIndex(selectedDay), //0-6 Mon-Sun
      start: startTime, //24 hour format
      end: endTime, //24 hour format
    };
    const endpoint =
      loginType == 3 ? 'delivery-boys/update-timing' : 'update-timing';
    APICall('post', endpoint, param, onSuccessTimeUpdate, onFailTimeUpdate);
  };
  const onSuccessTimeUpdate = res => {
    // console.log(res?.message, 'success update');
    Toast.show(res?.message);
    getTimings();
  };
  const onFailTimeUpdate = err => {
    console.log(err, 'fail Update');
    Toast.show(err?.message);
  };

  useEffect(() => {
    getTimings();
    getType();
  }, []);
  //   console.log(startTime, endTime, 'ttttttttt');
  return (
    <>
      <BackHeader headerTitle={'Update Timing'} />
      <ScrollView style={styles.body__container}>
        {timingData?.map((daySchedule, index) => (
          <View key={index} style={styles.container}>
            {Object.keys(daySchedule)?.map(day => (
              <View key={day}>
                <TouchableOpacity
                  style={[
                    styles.dayContainer,
                    {
                      backgroundColor:
                        selectedDay === day ? '#feeeef' : 'white',
                    },
                  ]}
                  onPress={() => {
                    setSelectedDay(prevState => (prevState === day ? '' : day));
                  }}>
                  <View style={styles.dayText}>
                    <Text>{day}</Text>
                    <View style={styles.dot} />
                    {daySchedule[day].closed ? (
                      <Text style={styles.closedText}>Closed</Text>
                    ) : (
                      <Text style={styles.openText}>Open</Text>
                    )}
                  </View>
                  <View>
                    <Feather
                      name={selectedDay !== day ? 'chevron-down' : 'chevron-up'}
                      size={20}
                      color={Colors.grey}
                    />
                  </View>
                </TouchableOpacity>
                {selectedDay === day ? (
                  <View style={styles.timingContainer}>
                    <Button
                      submit={() =>
                        handleAddEditTime(
                          daySchedule[day].start,
                          daySchedule[day].end,
                        )
                      }
                      btnTxt={'Add/Edit Time'}
                      customStyle={{
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={styles.centeredView}
          // onTouchEnd={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <View
              style={{borderBottomWidth: 0.5, borderBottomColor: Colors.grey}}>
              <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                {selectedDay} Timing
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Calendar
                label={'Start Time'}
                mode={'time'}
                value={startTime}
                setValue={setStartTime}
              />
              <Calendar
                label={'End Time'}
                mode={'time'}
                value={endTime}
                setValue={setEndTime}
              />
            </View>
            <View>
              <Button
                btnTxt={'Save'}
                customStyle={{
                  paddingHorizontal: 20,
                }}
                submit={handleSaveTimings}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UpdatTimingScreen;

const styles = StyleSheet.create({
  body__container: {
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  container: {
    borderWidth: 0.5,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: Colors.grey,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: 'black',
    borderRadius: 999,
    marginHorizontal: 10,
  },
  dayText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closedText: {
    color: 'red',
    fontWeight: '600',
  },
  openText: {
    color: 'green',
    fontWeight: '600',
  },
  timingContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.grey,
  },

  //modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
