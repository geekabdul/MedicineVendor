import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import {APICall} from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import useUserProfile from '../../../hooks/useUserProfile';
import Header from '../../../components/Header/Header';
import { Colors } from '../../../assets/colors';
import { appImages } from '../../../assets/images';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../../assets/fonts/Fonts';
import Calendar from '../../../components/Calendar/Calendar';
import Button from '../../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APICall } from '../../../helper/Helper';

const routeStoreData = [
  { title: 'Add Delivery Boy', path: 'AddDeliveryBoy' },
  { title: 'Delivery Boy List', path: 'DeliveryBoyListScreen' },
  { title: 'Assingned Orders List', path: 'AssignedOrdersScreen' },
];
const data = [
  { Icon: 'clock', title: ' Schedule off-time in advance', route: '' },
  { Icon: 'package', title: 'Order History', route: 'OrderHistory' },
  { Icon: 'help-circle', title: 'Support', route: 'Support' },
  { Icon: 'edit', title: 'Share your feedback', route: 'Feedback' },
  { Icon: 'update', title: 'Update Timing', route: 'UpdatTimingScreen' },
];
const routeLabData = [
  { title: 'Health Reports', path: 'HealthReportsScreen' },
];
const routeDeliveryBoyData = [
  { title: 'Order Delivered', path: 'DeliveredOrderScreen', Icon: 'package', },
];
const ProfileScreen = () => {
  const navigation = useNavigation();
  const userData = useUserProfile();
  console.log(userData?.basic_details?.profile_image, 'profilescreen');
  // const navigation = useNavigation();
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
    console.log("logoutUserlogoutUserlogoutUserlogoutUserlogoutUser")
    APICall('get', 'logout', {}, onSuccessLogout, onFailedLogout);
  };

  const onSuccessLogout = res => {
    console.log(res.message, 'SuccessLogout');
    AsyncStorage.removeItem('Token');
    Toast.show(res?.message);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginChoiceScreen' }],
    });
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
      <Header headerTitle="Profile" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.userProfileContainer}>
            <View style={styles.profileImageContainer}>
              {/* {userData?.basic_details?.profile_image ? (
                <Image
                  source={{ uri: userData?.basic_details?.profile_image }}
                  style={styles.profileImage}
                />
              ) : ( */}
              <Image
                source={appImages.userDefaultImage}
                style={styles.profileImage}
              />
              {/* )} */}
            </View>
            <View style={styles.userDetailsContainer}>
              <Text style={styles.userName}>
                {userData?.basic_details?.name}
              </Text>
              <Text style={styles.userMobile}>
                {userData?.basic_details?.email}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              {userData?.basic_details?.type === 1 &&
                routeStoreData.map((route, id) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(route.path)}
                    key={id}
                    style={styles.listBox}>
                    <Text style={styles.listText}>
                      {route.title}
                    </Text>
                    <Feather name={'chevron-right'} size={20} color={Colors.primarycolor} />
                  </TouchableOpacity>
                ))}
              {userData?.basic_details?.type === 2 &&
                routeLabData.map((route, id) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(route.path)}
                    key={id}
                    style={styles.listBox}>
                    <Text style={styles.listText}>
                      {route.title}
                    </Text>
                    <Feather name={'chevron-right'} size={20} color={Colors.primarycolor} />
                  </TouchableOpacity>
                ))}
              {userData?.basic_details?.type === 3 &&
                routeDeliveryBoyData.map((route, id) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(route.path)}
                    key={id}
                    style={styles.listBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather
                        name={route.Icon}
                        size={16}
                        style={{ marginRight: 5 }}
                        color={Colors.primarycolor}
                      />
                      <Text style={styles.listText}>
                        {route.title}
                      </Text>
                    </View>
                    <Feather name={'chevron-right'} size={20} color={Colors.primarycolor} />
                  </TouchableOpacity>
                ))}
              {data?.map((el, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleDataItem(el)}
                  style={styles.listBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {el.title === 'Update Timing' ? (
                      <MaterialCommunityIcons
                        name={el.Icon}
                        size={16}
                        style={{ marginRight: 5 }}
                        color={Colors.primarycolor}
                      />
                    ) : (
                      <Feather
                        name={el.Icon}
                        size={16}
                        style={{ marginRight: 5 }}
                        color={Colors.primarycolor}
                      />
                    )}
                    <Text style={styles.listText}>
                      {el.title}
                    </Text>
                  </View>
                  <Feather name={'chevron-right'} size={20} color={Colors.primarycolor} />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => logoutUser()}
                style={styles.listBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name={'log-out'}
                    size={16}
                    style={{ marginRight: 5 }}
                    color={Colors.primarycolor}
                  />
                  <Text style={styles.listText}>
                    Logout
                  </Text>
                </View>
                {/* <Feather name={'chevron-right'} size={20} color={Colors.primarycolor} /> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* {userData?.basic_details?.type === 2 ? (
            <>
              <Text
                style={styles.optionText}
                onPress={() => navigation.navigate('HealthReportsScreen')}>
                Health Report Screen
              </Text>
            </>
          ) : null} */}
          {/* {userData?.basic_details?.type === 3 ? (
            <>
              <Text
                style={styles.optionText}
                onPress={() => navigation.navigate('DeliveredOrderScreen')}>
                Delivered Order Screen
              </Text>
            </>
          ) : null} */}

        </ScrollView>
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
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  userProfileContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginVertical: 50,
  },
  profileImageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 5,
    borderRadius: 999,
    borderColor: Colors.primarycolor,
    backgroundColor: Colors.white,
    top: -50,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 999,
  },
  userDetailsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.dark,
  },
  userMobile: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.grey,
  },
  optionText: {
    marginVertical: 20,
  },
  listBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.primarycolor,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5
  },
  listText: {
    fontFamily: Fonts.Poppins400,
    color: Colors.dark,
    fontSize: 13
  },
  // container: {
  //   flex: 1,
  //   marginTop: 20,
  //   backgroundColor: Colors.white,
  //   padding: 10,
  //   justifyContent: 'space-between',
  // },
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
