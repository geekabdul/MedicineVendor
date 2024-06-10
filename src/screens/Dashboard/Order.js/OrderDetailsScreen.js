import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { APICall } from '../../../helper/Helper';
import OrderProductCard from '../../../components/OrderProductCard/OrderProductCard';
import BackHeader from '../../../components/BackHeader/BackHeader';
import Button from '../../../components/Button/Button';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Fonts from '../../../assets/fonts/Fonts';

const OrderDetailsScreen = () => {
  const route = useRoute();
  const { order_id } = route.params;

  const [OrderDetails, setOrderDetails] = useState(null);
  const [type, setType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  const fetchType = async () => {
    try {
      const loginType = await AsyncStorage.getItem('type');
      setType(Number(loginType));
    } catch (error) {
      console.error('Error fetching data from AsyncStorage', error);
    }
    // console.log(type, 'type inside fetch type');
    // // if (type !== 3) {
    // // getOrdersList();
    // // } else if (type === 3) {
    // //AssignedOrderList
    // // }
  };

  //FETCH DELIVERY BOYS
  const fetchDeliveryBoys = async () => {
    await APICall(
      'get',
      'deliveryboy-list',
      {},
      onSuccessGetList,
      onErrorGetList,
    );
  };

  const onSuccessGetList = res => {
    console.log(res?.data, 'fetch successfull list');
    setDeliveryBoys(res?.data, 'fetch successfull list');
  };
  const onErrorGetList = err => {
    console.error('Error fetching delivery boys:', err);
  };

  //GET ORDER DETAILS API CALL
  const getOrderDetails = () => {
    const params = {
      order_id: order_id,
    };
    APICall('get', 'order-details', params, onPassDetails, onFailDetails);
  };

  const onPassDetails = item => {
    setOrderDetails(item?.data);
  };
  const onFailDetails = err => {
    console.log(err);
    setOrderDetails({});
  };

  //ACCEPT REJECT ORDER
  const accecptRejectOrder = status => {
    const params = {
      sub_order_id: order_id,
      status: status,
    };
    APICall(
      'post',
      'accept-reject-order',
      params,
      onSuccessAcceptReject,
      onFailAcceptReject,
    );
  };

  const onSuccessAcceptReject = res => {
    console.log(res, 'Accept Reject Success');
    Toast.show(res?.message);
    getOrderDetails();
  };
  const onFailAcceptReject = err => {
    console.log(err?.response?.data?.message, 'Accept Reject Fail');
    Toast.show(err?.response?.data?.message);
  };

  //UPDATE ORDER STATUS
  const updateOrderStatus = status => {
    console.log(status);
    const params = {
      sub_order_id: order_id,
      status: status,
    };
    APICall(
      'post',
      'update-orderstatus',
      params,
      onSuccessupdateOrderStatus,
      onFailupdateOrderStatus,
    );
  };

  const onSuccessupdateOrderStatus = res => {
    console.log(res, 'onSuccessupdateOrderStatus');
    Toast.show(res?.message);
    getOrderDetails();
  };
  const onFailupdateOrderStatus = err => {
    console.log(err?.response?.data?.message, 'onSuccessupdateOrderStatus');
    Toast.show(err?.response?.data?.message);
  };

  //ORDER ASSIGN
  const asignOrder = deliveryBoyId => {
    const params = {
      order_id: order_id,
      deliveryboy_id: deliveryBoyId,
    };
    APICall(
      'post',
      'assign-order',
      params,
      onSuccessasignOrder,
      onFailasignOrder,
    );
  };

  const onSuccessasignOrder = res => {
    console.log(res, 'onSuccessasignOrder');
    Toast.show(res?.message);
    getOrderDetails();
    setModalVisible(false);
  };
  const onFailasignOrder = err => {
    console.log(err?.response?.data?.message, 'onFailasignOrder');
    Toast.show(err?.response?.data?.message);
  };
  const uploadReport = data => {
    const fileToUpload = {
      name: data.name,
      type: data.type,
      uri: data.uri,
    };
    const formData = new FormData();
    formData.append('order_id', order_id);
    formData.append('image', fileToUpload);
    APICall(
      'post',
      'upload-report',
      formData,
      onSuccessuploadReport,
      onFailuploadReport,
      true,
    );
  };

  const onSuccessuploadReport = res => {
    console.log(res, 'onSuccessuploadReport');
    Toast.show(res?.message);
    // getOrderDetails();
    // setModalVisible(false);
  };
  const onFailuploadReport = err => {
    console.log(err, 'onFailuploadReport');
    // Toast.show(err);
  };

  const renderDeliveryBoyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deliveryBoyContainer}
      onPress={() => {
        if (item?.isActive) {
          asignOrder(item.deliveryboy_id);
        } else {
          Toast.show('Please select a Active Delivery Boy');
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: item?.isActive ? Colors.green : Colors.grey,
          }}
        />
      </View>
      <Text style={styles.mobile}>{item.mobile}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchType();
    getOrderDetails();
    fetchDeliveryBoys();
  }, []);

  const Status = item => {
    if (item == 0) {
      return 'pending';
    } else if (item == 1) {
      return 'confirmed';
    } else if (item == 2) {
      return 'rejected';
    } else if (item == 3) {
      return 'shipped';
    } else if (item == 4) {
      return type == 2 ? 'completed' : 'delivered';
    } else if (item == 5) {
      return 'Out For Delivery';
    } else if (item == 6) {
      return 'Assigned';
    }
  };
  const handleUploadReport = () => {
    handleFileSelection();
  };
  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      uploadReport(res[0]);

      // Process the selected files (see step 3)
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., show an error message)
    }
  };

  if (!OrderDetails || !type) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <BackHeader headerTitle={'Order Detail'} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 16,
              fontFamily: Fonts.Manrope600,
              paddingVertical: 4,
              color: Colors.primarycolor
            }}>
            Items
          </Text>

          <View
            style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }}>
            {OrderDetails?.items?.map((item, index) => (
              <OrderProductCard key={index} item={item} />
            ))}
          </View>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 16,
              fontFamily: Fonts.Manrope600,
              color: Colors.primarycolor,
              paddingVertical: 4,
            }}>
            Order Summary
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark,
                  paddingBottom: 2,
                }}>
                Patients:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.dark,
                  fontFamily: Fonts.Manrope800,
                }}>
                {OrderDetails?.order_summary?.patient_name}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark,
                  paddingBottom: 2,
                }}>
                Order No:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.dark,
                  fontFamily: Fonts.Manrope800,
                }}>
                {OrderDetails?.order_summary?.order_id}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              backgroundColor: 'white',
              marginVertical: 15,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: Colors.dark,
                fontFamily: Fonts.Manrope600,
              }}>
              Status:
            </Text>
            <View
              style={{
                paddingLeft: 10,
                width: '90%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.Manrope700,
                  color: 'red',
                }}>
                Order {Status(OrderDetails?.order_summary?.order_status)}
              </Text>
              {/* <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Manrope700,
                color: Colors.dark,
              }}>
              Reason: I want to modify item in my order.
            </Text> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              backgroundColor: 'white',
              paddingVertical: 10,
              justifyContent: 'space-between',
            }}>
            <MaterialIcons
              name="home-work"
              color={Colors.primarycolor}
              size={20}
              style={{ marginTop: 5 }}
            />
            <View
              style={{
                paddingLeft: 10,
                width: '90%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.Manrope800,
                  color: Colors.dark,
                  paddingBottom: 7,
                }}>
                Address Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.Manrope700,
                  color: Colors.dark,
                }}>
                {OrderDetails?.address_details?.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark,
                }}>
                {OrderDetails?.address_details?.address}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark,
                }}>
                {OrderDetails?.address_details?.pincode}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              backgroundColor: 'white',
              paddingVertical: 10,
              justifyContent: 'space-between',
            }}>
            <MaterialCommunityIcons
              name="office-building-outline"
              color={Colors.primarycolor}
              size={20}
              style={{ marginTop: 5 }}
            />
            <View
              style={{
                paddingLeft: 10,
                width: '90%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.Manrope800,
                  color: Colors.dark,
                  paddingBottom: 7,
                }}>
                Seller Details
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark,
                }}>
                <AntDesign name="user" color={Colors.primarycolor} size={20} />
                {'  '}
                {OrderDetails?.seller_details?.seller_name}
              </Text>
            </View>
          </View>

          {OrderDetails?.order_summary?.assigned_to?.name ? (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                backgroundColor: 'white',
                marginVertical: 15,
                paddingVertical: 15,
                // alignItems: 'center',
                // justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 24,
                  fontFamily: Fonts.Manrope600,
                  color: Colors.dark
                }}>
                Assigned to:
              </Text>
              <View
                style={{
                  paddingLeft: 10,
                  // flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.Manrope600,
                    color: Colors.dark,
                    lineHeight: 24
                  }}>
                  {OrderDetails?.order_summary?.assigned_to?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.Manrope600,
                    lineHeight: 24,
                    color: Colors.dark,
                  }}>
                  {OrderDetails?.order_summary?.assigned_to?.mobile}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
        {OrderDetails?.order_summary?.order_status != 2 &&
          OrderDetails?.order_summary?.order_status != 5 &&
          !(OrderDetails?.order_summary?.order_status == 4 && type != 2) ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingVertical: 20,
            }}>
            {OrderDetails?.order_summary?.order_status == 0 ? (
              <>
                <Button
                  btnTxt={'Reject'}
                  Width={'45%'}
                  txtStyle={{ color: Colors.primarycolor }}
                  customStyle={{ backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.primarycolor }}
                  submit={() => accecptRejectOrder('2')}
                />
                <Button
                  btnTxt={'Accept'}
                  Width={'45%'}
                  submit={() => accecptRejectOrder('1')}
                />
              </>
            ) : OrderDetails?.order_summary?.order_status == 1 ? (
              <>
                {type == 1 ? (
                  <Button
                    btnTxt={'Shipped'}
                    Width={'45%'}
                    submit={() => updateOrderStatus('3')}
                  />
                ) : (
                  <Button
                    btnTxt={'Test Complete'}
                    Width={'45%'}
                    submit={() => updateOrderStatus('4')}
                  />
                )}
              </>
            ) : OrderDetails?.order_summary?.order_status == 3 ? (
              <>
                <Button
                  btnTxt={'Assign Order'}
                  Width={'45%'}
                  submit={() => setModalVisible(true)}
                />
                {/* <Button
                btnTxt={'Out For Delivery'}
                Width={'45%'}
                submit={() => updateOrderStatus('5')}
              /> */}
              </>
            ) : OrderDetails?.order_summary?.order_status == 4 ? (
              <>
                <Button
                  btnTxt={'Upload Report'}
                  Width={'45%'}
                  submit={handleUploadReport}
                />
              </>
            ) : null}
          </View>
        ) : null}
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
            <View style={{ marginBottom: 20, borderBottomWidth: 0.5 }}>
              <Text style={{ fontSize: 20 }}>Order Assigned to</Text>
            </View>
            {deliveryBoys?.length == 0 ? (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.Manrope600,
                  textAlign: 'center',
                }}>
                No Delivery Boy created or added yet
              </Text>
            ) : (
              <FlatList
                data={deliveryBoys}
                renderItem={renderDeliveryBoyItem}
                keyExtractor={item => item.deliveryboy_id.toString()}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  //modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    maxHeight: '65%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  deliveryBoyContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mobile: {
    fontSize: 16,
    color: '#888',
  },
});
