import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header/Header';
import {Colors} from '../../../assets/colors';
import InventoryCard from '../../../components/MedicineInventoryCard/MedicineInventoryCard';
import LabInventory from '../../../components/LabInventory/LabInventory';
import StoreInventory from '../../../components/StoreInventory/StoreInventory';
import DeliveryBoyIneventory from '../../../components/DeliveryBoyIneventory/DeliveryBoyIneventory';

const InventoryScreen = () => {
  const [loginType, setLoginType] = useState(null);
  const getType = async () => {
    const type = await AsyncStorage.getItem('type');
    setLoginType(type);
  };
  useEffect(() => {
    getType();
  }, []);

  if (!loginType) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <View style={{flex: 1}}>
        {loginType == 1 ? (
          <StoreInventory />
        ) : loginType == 2 ? (
          <LabInventory />
        ) : loginType == 3 ? (
          <DeliveryBoyIneventory />
        ) : null}
      </View>
    </>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});
