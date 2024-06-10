import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import {APICall} from '../../helper/Helper';

const AssignedOrdersScreen = () => {
  const [assignedOrdersData, setAssignedOrdersData] = useState(null);

  const getAssignedOrders = async () => {
    APICall(
      'get',
      'assigned-order-list',
      {},
      getAssignedOrdersSuccess,
      getAssignedOrdersFail,
    );
  };

  const getAssignedOrdersSuccess = res => {
    console.log(res?.data, 'getAssignedOrderssuccessful');
    setAssignedOrdersData(res?.data);
  };

  const getAssignedOrdersFail = error => {
    console.log(error.response.data, 'Error getAssignedOrders');
  };

  useEffect(() => {
    getAssignedOrders();
  }, []);
  return (
    <>
      <BackHeader headerTitle={'Assigned Orders'} />
      <Text>AssignedOrdersScreen</Text>
    </>
  );
};

export default AssignedOrdersScreen;

const styles = StyleSheet.create({});
