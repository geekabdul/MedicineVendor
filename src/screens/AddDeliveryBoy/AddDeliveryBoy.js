import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { APICall } from '../../helper/Helper';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const AddDeliveryBoy = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const onAddProfile = () => {
    const params = {
      name: name,
      mobile: number,
    };

    APICall('post', 'add-deliveryboy', params, onAddSuccess, onAddFail);
  };

  const onAddSuccess = data => {
    Toast.show(data.message);
    setName('');
    setNumber('');

    navigation.goBack();
  };
  const onAddFail = error => {
    Toast.show(error?.response?.data?.message);
  };
  return (
    <>
      <BackHeader headerTitle={'Add Delivery Boy'} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <InputField
          label={'Name'}
          placeholder={'Name'}
          value={name}
          setValue={setName}
        />
        <InputField
          label={'Mobile'}
          placeholder={'Mobile'}
          value={number}
          setValue={setNumber}
          keyboardType="number-pad"
          maxLength={10}
        />

        <Button
          btnTxt={'Add'}
          Width={'100%'}
          customStyle={{ marginVertical: 20 }}
          submit={onAddProfile}
        />
      </ScrollView>
    </>
  );
};

export default AddDeliveryBoy;

const styles = StyleSheet.create({});
