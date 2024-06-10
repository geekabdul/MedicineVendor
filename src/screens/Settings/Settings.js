import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';
import { Colors } from '../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button/Button';
import Calendar from '../../components/Calendar/Calendar';
import { APICall } from '../../helper/Helper';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../../assets/fonts/Fonts';

const data = [
  { Icon: 'clock', title: ' Schedule off-time in advance', route: '' },
  { Icon: 'package', title: 'Order History', route: 'OrderHistory' },
  { Icon: 'help-circle', title: 'Support', route: 'Support' },
  { Icon: 'edit', title: 'Share your feedback', route: 'Feedback' },
  { Icon: 'update', title: 'Update Timing', route: 'UpdatTimingScreen' },
];
const Settings = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loginType, setLoginType] = useState(null);

  const getType = async () => {
    const type = await AsyncStorage.getItem('type');
    setLoginType(type);
  };

  console.log(startDate, startTime, endDate, endTime);

  const handleProceed = () => {
    if (startDate && startTime && endDate && endTime) {
      offTime();
      setModalVisible(false);
      setStartDate(null);
      setStartTime(null);
      setEndDate(null);
      setEndTime(null);
    } else {
      alert('Please select all Date and time');
    }
  };

  const offTime = async () => {
    const params = {
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
    };
    const endpoint = loginType == 3 ? 'delivery-boys/off-time' : 'off-time';

    APICall('post', endpoint, params, onsuccessOffTime, onFailedOffTime, true);
  };

  const onsuccessOffTime = res => {
    console.log(res, 'success offtime');
    Toast.show(res.message, Toast.LONG);
  };
  const onFailedOffTime = err => {
    console.log(err, 'failed offtime');
  };

  const logoutUser = async () => {
    APICall('get', 'logout', {}, onSuccessLogout, onFailedLogout);
  };

  const onSuccessLogout = res => {
    AsyncStorage.removeItem('Token');
    console.log(res.message, 'SuccessLogout');
    Toast.show(res?.message);
    navigation.navigate('LoginChoiceScreen');
  };
  const onFailedLogout = err => {
    console.log(err.response.data, 'logoutError');
    // Toast.show(err?.response?.data);
  };

  const handleDataItem = el => {
    if (el.title == ' Schedule off-time in advance') {
      setModalVisible(true);
    } else {
      navigation.navigate(el.route);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <>
      <SecondaryHeader headerTitle={'Outlet Settings'} />

      <View style={styles.container}>
        <View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.grey,
            }}>
            <Text style={{ color: Colors.dark, fontFamily: Fonts.Manrope600 }}>
              Online Ordering
            </Text>
          </View>
          {data?.map((el, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleDataItem(el)}
              style={{
                paddingVertical: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.grey,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {el.title === 'Update Timing' ? (
                  <MaterialCommunityIcons
                    name={el.Icon}
                    size={20}
                    color={'black'}
                  />
                ) : (
                  <Feather name={el.Icon} size={20} color={'black'} />
                )}
                <Text style={{ marginLeft: 10, fontFamily: Fonts.Manrope500 }}>
                  {el.title}
                </Text>
              </View>
              <Feather name={'chevron-right'} size={20} color={'black'} />
            </TouchableOpacity>
          ))}
        </View>
        <View
          onPress={{}}
          style={{
            paddingVertical: 10,
            borderTopWidth: 0.5,
            borderTopColor: Colors.grey,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={logoutUser}>
            <Feather name={'log-out'} size={20} color={'black'} />
            <Text style={{ marginLeft: 10 }}>Logout</Text>
          </TouchableOpacity>
          {/* <Feather name={'chevron-right'} size={20} color={'black'} /> */}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <Text style={{ color: Colors.dark, fontSize: 20 }}>
                Schedule an off-time
              </Text>
              <View
                onTouchEnd={() => {
                  setModalVisible(false);
                  setStartDate(null);
                  setStartTime(null);
                  setEndDate(null);
                  setEndTime(null);
                }}>
                <AntDesign name={'close'} size={25} />
              </View>
            </View>
            <View
              style={{
                height: 0.5,
                width: '120%',
                backgroundColor: Colors.grey,
                marginHorizontal: -20,
                alignItems: 'center',
              }}
            />
            <View style={styles.dateTime__mainContainer}>
              {/* {['Start Date', 'Start Time', 'End Date', 'End Time'].map(
                (item, i) => (
                  <View style={styles.dateTime_container}>
                    <Text>{item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (item === 'Start Date' || item === 'End Date') {
                          setMode('date');
                        } else {
                          setMode('time');
                        }
                        setShow(true);
                      }}
                      style={styles.dateTime_subContainer}>
                      <Text style={{color: '#0080FF'}}>{item}</Text>
                      <AntDesign name="caretdown" color="#0080FF" />
                    </TouchableOpacity>
                  </View>
                ),
              )} */}

              <Calendar
                label={'Start Date'}
                mode={'date'}
                value={startDate}
                setValue={setStartDate}
                minimumDate={new Date()}
              />
              <Calendar
                label={'Start Time'}
                mode={'time'}
                value={startTime}
                setValue={setStartTime}
              />
              <Calendar
                label={'End Date'}
                mode={'date'}
                value={endDate}
                setValue={setEndDate}
                minimumDate={new Date()}
              />
              <Calendar
                label={'End Time'}
                mode={'time'}
                value={endTime}
                setValue={setEndTime}
              />
            </View>
            <Text style={{ textAlign: 'center', color: 'red' }}>
              You will not receive any orders during selected time
            </Text>
            <View style={{ width: '100%', marginVertical: 10 }}>
              <Button
                btnTxt={'PROCEED'}
                Width={'100%'}
                submit={handleProceed}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: Colors.white,
    padding: 10,
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
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
