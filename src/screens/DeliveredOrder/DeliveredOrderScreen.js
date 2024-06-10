import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APICall} from '../../helper/Helper';
import BackHeader from '../../components/BackHeader/BackHeader';

const DeliveredOrderScreen = () => {
  const [orderDelivered, setDeliveredOrder] = useState(null);
  const getDeliveredOrders = () => {
    APICall(
      'get',
      'delivery-boys/delivered-orders',
      {},
      onSuccessDeliveredOrder,
      onFailDeliveredOrder,
    );
  };

  const onSuccessDeliveredOrder = res => {
    console.log(res?.data, 'order Delivered');
    setDeliveredOrder(res?.data);
  };
  const onFailDeliveredOrder = err => {
    console.log(err, 'onFailDeliveredOrder');
  };
  useEffect(() => {
    getDeliveredOrders();
  }, []);
  return (
    <ScrollView>
      <BackHeader headerTitle={'Delivered Orders'} />
      {orderDelivered?.map((order, index) => (
        <View style={styles.container}>
          <Text style={styles.label}>Sub Order ID:</Text>
          <Text style={styles.value}>{order.sub_order_id}</Text>

          <Text style={styles.label}>Updated At:</Text>
          <Text style={styles.value}>{order.updated_at}</Text>

          <Text style={styles.label}>Order Total:</Text>
          <Text style={styles.value}>{order.order_total}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DeliveredOrderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});
