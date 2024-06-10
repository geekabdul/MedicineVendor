import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/Button/Button';
import { APICall } from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import OrderedCard from '../../../components/OrderedCard/OrderedCard';
import Header from '../../../components/Header/Header';
import Fonts from '../../../assets/fonts/Fonts';
import { useFocusEffect } from '@react-navigation/native';
import AssignedOrderCard from '../../../components/AssignedOrderCard/AssignedOrderCard';
import { useNavigation } from '@react-navigation/native';

const TimeData = [
  { title: '1 hours', value: '1' },
  { title: '2 hours', value: '2' },
  { title: 'Tomorrow', value: '-2' },
];

const OrderScreen = () => {
  const navigation = useNavigation();

  // useCloseAppOnBackButton();
  const [orderConfirmationModal, setOrderConfirmationModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const [type, setType] = useState('');
  const [orderList, setOrderList] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // const tabsData = [...(type ===3?['All','Assigned', 'Started']:
  //   'All',
  //   'Pending',
  //   'Accepted',
  //   'Rejected',
  //   ...(type === 1
  //     ? ['Shipped', 'Assigned', 'Out For Delivery', 'Delivered']
  //     : ['Test Completed']))
  // ];

  let tabsData = [];

  if (type === 1) {
    tabsData = [
      'All',
      'Pending',
      'Accepted',
      'Rejected',
      'Shipped',
      'Assigned',
      'Out For Delivery',
      'Delivered',
    ];
  } else if (type === 2) {
    tabsData = ['All', 'Pending', 'Accepted', 'Rejected', 'Test Completed'];
  } else if (type === 3) {
    tabsData = ['All', 'Assigned', 'OnGoing'];
  }

  const toggleSwitch = () => {
    if (userData?.status?.store_status) {
      setIsModalVisible(true);
    } else {
      turnOn('-3'); //Turn on the store status.
    }
    // setIsEnabled(prev);
    // if (!prev) {
    //   setIsModalVisible(true);
    // } else {
    //   // setTurnOn('-1');
    // }
  };

  const handleContinue = () => {
    if (!selectedTime) {
      Alert.alert('Please select time');
    } else {
      turnOn(selectedTime);
      setIsModalVisible(false);
      setSelectedTime(null);
    }
  };

  const getOrdersList = paramtype => {
    const queryParams = {
      type: paramtype === 1 ? 'medicine' : paramtype === 2 ? 'test' : null,
    };
    // console.log(queryParams, '???????????????????');
    APICall(
      'get',
      'order-list',
      queryParams,
      onSuccessOrderList,
      onFailedOrderList,
    );
  };

  const onSuccessOrderList = res => {
    console.log('Success:', res.result);
    setOrderList(res.result);
  };
  const onFailedOrderList = err => {
    console.error('Error:', err);
  };

  const getAssignedOrders = async () => {
    APICall(
      'get',
      'delivery-boys/assigned-orders',
      {},
      onSuccessAssignedOrders,
      onFailedAssignedOrders,
      true,
    );
  };

  const onSuccessAssignedOrders = res => {
    console.log(res.data, 'AssignedOrders Success');
    setOrderList(res.data);
  };
  const onFailedAssignedOrders = err => {
    console.log(err.response.data.message, 'AssignedOrders failed');
    setOrderList([]);
  };
  const turnOn = async time => {
    const endpoint = type == 3 ? 'delivery-boys/turn_on' : 'turn-on';
    const param = { turn_on: time };
    APICall('post', endpoint, param, onSuccessTurnOn, onFailedTurnOn, true);
  };

  const onSuccessTurnOn = res => {
    // console.log(res, 'turnON success');
    Toast.show(res.message, Toast.LONG);

    getProfile();
  };
  const onFailedTurnOn = err => {
    console.log(err.response.data.message, 'turnON failed');
    Toast.show(err.response.data.message);
  };

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };
  const getProfileSuccess = res => {
    console.log(res?.result?.status, 'Profile fetch successful');
    setType(res?.result?.basic_details?.type);
    setUserData(res?.result);
    setIsEnabled(res?.result?.status?.store_status);
    if (res?.result?.basic_details?.type === 3) {
      getAssignedOrders();
    } else {
      getOrdersList(res?.result?.basic_details?.type);
    }
  };

  const getProfileFail = error => {
    console.log(error.response.data, 'Error fetching profile');
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []), // Dependency array ensures effect runs only when fetchData changes
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await getProfile();
    setRefreshing(false);
  };

  const filteredOrders = orderList?.filter(order => {
    switch (selectedTab) {
      case 'Pending':
        return order.order_status === 'pending';
      case 'Accepted':
        return order.order_status === 'confirmed';
      case 'Rejected':
        return order.order_status === 'rejected';
      case 'Shipped':
        return order.order_status === 'shipped';
      case 'Out For Delivery':
        return order.order_status === 'out_for_delivery';
      case 'Assigned':
        return order.order_status === 'assigned';
      case 'Delivered':
        return order.order_status === 'delivered';
      case 'Test Completed':
        return order.order_status === 'delivered';
      case 'All':
      default:
        return true;
    }
  });

  //filter delivery boy order
  const filteredAssignedOrders = orderList?.filter(order => {
    switch (selectedTab) {
      case 'Assigned':
        return order.order_status == 6;
      case 'OnGoing':
        return order.order_status == 5;
      case 'All':
      default:
        return true;
    }
  });

  // console.log(filteredAssignedOrders, 'filterrrrrrr');

  const renderOrderCards = () => {
    if (filteredOrders?.length > 0) {
      return filteredOrders.map((order, i) => (
        <OrderedCard key={i} data={order} type={type} />
      ));
    }
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text style={{ fontSize: 16, fontFamily: Fonts.Poppins600 }}>No data</Text>
        </View>
      </>
    )
  };

  const renderAssignedCards = () => {
    if (filteredAssignedOrders.length > 0) {
      return filteredAssignedOrders?.map((order, i) => (
        <View
          onTouchEnd={() => {
            if (order.order_status == 5) {
              navigation.navigate('MapScreen', { data: order });
            } else {
              // console.log(order.order_status, 'order status');
              setOrderConfirmationModal(true);
              setSelectedOrder(order);
            }
          }}
          key={i}>
          <AssignedOrderCard data={order} />
        </View>
      ));
    }
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text style={{ fontSize: 16, fontFamily: Fonts.Poppins600 }}>No data</Text>
        </View>
      </>
    )
  };

  return (
    <View style={styles.container}>
      <Header toggleSwitch={prev => toggleSwitch(prev)} isEnabled={isEnabled} />
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.tabs_mainContainer}
          showsHorizontalScrollIndicator={false}>
          {tabsData?.map((tab, id) => (
            <TouchableOpacity
              key={id}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedTab === tab ? Colors.lightPrimary : Colors.white,
                },
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  {
                    color: selectedTab === tab ? Colors.dark : Colors.grey,
                  },
                  { fontFamily: Fonts.Manrope600 },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.horizontalLine} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={styles.orderList__container}> */}
        {orderList === null ? (
          <ActivityIndicator />
        ) : type !== 3 ? (
          renderOrderCards()
        ) : (
          renderAssignedCards()
        )}
        {/* </View> */}
      </ScrollView>
      {/* switch on and off modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ismodalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
          setSelectedTime(null);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 20, color: Colors.dark }}>
                Auto turn-on after
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setSelectedTime(null);
                }}>
                <AntDesign name={'close'} size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '120%',
                height: 0.5,
                backgroundColor: Colors.grey,
                marginVertical: 10,
                marginHorizontal: -20,
              }}
            />
            <View style={{ marginVertical: 20 }}>
              {TimeData.map((item, i) => (
                <View
                  key={i}
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onTouchEnd={() => setSelectedTime(item.value)}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderWidth: 1.5,
                      borderColor: 'darkgrey',
                      borderRadius: 999,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {selectedTime == item.value ? (
                      <View
                        style={{
                          height: 14,
                          width: 14,
                          backgroundColor: 'darkgrey',
                          borderRadius: 999,
                        }}
                      />
                    ) : null}
                  </View>
                  <Text style={{ color: 'black', fontSize: 16 }}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: 'lightgrey',
                width: '120%',
                height: 10,
                marginHorizontal: -20,
              }}
            />

            <View style={{ marginVertical: 20 }}>
              <Text style={{ color: 'black', fontSize: 16 }}>
                Manually turn on
              </Text>

              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onTouchEnd={() => setSelectedTime('-1')}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1.5,
                    borderColor: 'darkgrey',
                    borderRadius: 999,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectedTime == '-1' ? (
                    <View
                      style={{
                        height: 14,
                        width: 14,
                        backgroundColor: 'darkgrey',
                        borderRadius: 999,
                      }}
                    />
                  ) : null}
                </View>
                <Text style={{ color: 'black', fontSize: 16 }}>
                  I will turn it on myself
                </Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: '120%',
                alignItems: 'center',
                marginHorizontal: -20,
              }}>
              <Button
                btnTxt={'Confirm'}
                Width={'80%'}
                submit={handleContinue}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* order confirmation modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={orderConfirmationModal}
        onRequestClose={() => {
          setOrderConfirmationModal(!orderConfirmationModal);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              width: '90%',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
              elevation: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Manrope500,
                fontSize: 16,
                color: Colors.dark,
              }}>
              Are you Ready for Delivery?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '60%',
                marginVertical: 10,
              }}>
              <Button
                btnTxt={'No'}
                Width={'45%'}
                customStyle={{ backgroundColor: Colors.red }}
                submit={() => {
                  setOrderConfirmationModal(false);
                  setSelectedOrder(null);
                }}
              />
              <Button
                btnTxt={'Yes'}
                Width={'45%'}
                customStyle={{ backgroundColor: Colors.green }}
                submit={() => {
                  setOrderConfirmationModal(false);
                  navigation.navigate('MapScreen', { data: selectedOrder });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 20,
    width: '100%',
    height: '80%',
  },
  tabs_mainContainer: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 10,
    backgroundColor: Colors.white
  },
  tab: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderColor: Colors.grey,
  },
  horizontalLine: {
    backgroundColor: Colors.lightgrey,
    height: 1,
    width: '100%',
  },
  // orderList__container: { padding: 20 },
});
