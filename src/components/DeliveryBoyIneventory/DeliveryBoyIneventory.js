import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import {APICall} from '../../helper/Helper';

const DeliveryBoyIneventory = () => {
  const [deliveredOrdersData, setDeliveryOrdersData] = useState(null);

  const getDeliveredOrders = async () => {
    APICall(
      'get',
      'delivery-boys/delivered-orders',
      {},
      getDeliveredSuccess,
      getDeliveredFail,
    );
  };

  const getDeliveredSuccess = res => {
    console.log(res?.data, 'delivered-orders');
    setDeliveryOrdersData(res?.data);
  };

  const getDeliveredFail = error => {
    console.log(error.response.data, 'Error fetching profile');
  };
  useEffect(() => {
    getDeliveredOrders();
  }, []);
  return (
    <>
      <Header headerTitle={'Inventory'} />
      <View>
        <Text>DeliveryBoyIneventory</Text>
      </View>
    </>
  );
};

export default DeliveryBoyIneventory;

const styles = StyleSheet.create({});
