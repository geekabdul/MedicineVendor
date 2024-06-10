import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APICall} from '../../helper/Helper';
import BackHeader from '../../components/BackHeader/BackHeader';
import Fonts from '../../assets/fonts/Fonts';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const DeliveryBoyListScreen = () => {
  const navigation = useNavigation();
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  const fetchDeliveryBoys = async () => {
    await APICall(
      'get',
      'deliveryboy-kyc-list',
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
  useFocusEffect(
    React.useCallback(() => {
      fetchDeliveryBoys();
    }, []), // Dependency array ensures effect runs only when fetchData changes
  );

  const renderDeliveryBoyItem = ({item}) => (
    <View
      style={styles.deliveryBoyContainer}
      onTouchEnd={() =>
        navigation.navigate('ViewDeliveryBoy', {
          data: item,
        })
      }>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.mobile}>{item.mobile}</Text>
      <Text style={styles.mobile}>
        Kyc:
        <Text style={{fontFamily: Fonts.Manrope500}}> {item.kyc_status}</Text>
      </Text>
    </View>
  );

  return (
    <>
      <BackHeader headerTitle={'Delivery Boy List'} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={deliveryBoys}
          renderItem={renderDeliveryBoyItem}
          keyExtractor={item => item.deliveryboy_id.toString()}
        />
      </View>
    </>
  );
};

export default DeliveryBoyListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: '#888',
  },
});
