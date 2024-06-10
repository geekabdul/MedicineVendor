import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../../../components/BackHeader/BackHeader';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import {APICall} from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import useCloseAppOnBackButton from '../../../hooks/useCloseAppOnBackButton';

const UploadBankScreen = () => {
  useCloseAppOnBackButton();
  const navigation = useNavigation();
  const [bankHolderName, setBankHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountType, setAccountType] = useState('');

  const onsubmitForm = () => {
    const params = {
      bank_holder_name: bankHolderName,
      account_number: accountNumber,
      bank_name: bankName,
      branch: bankBranch,
      ifsc_code: ifscCode,
      account_type: accountType,
    };
    console.log(params);
    APICall('post', 'add-bank', params, OnSucess, OnFail);
  };
  const OnSucess = data => {
    console.log(data.message);
    Toast.show(data.message);
    navigation.navigate('Dashboard');
  };
  const OnFail = error => {
    Toast.show(error?.response?.data?.message);
  };
  return (
    <>
      <BackHeader headerTitle={'Upload Bank Document'} />
      <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 40}}>
        <InputField
          label={'Bank Holder Name'}
          placeholder={'Bank Holder Name'}
          value={bankHolderName}
          setValue={setBankHolderName}
        />
        <InputField
          label={'Account Number'}
          placeholder={'Account Number'}
          value={accountNumber}
          setValue={setAccountNumber}
          keyboardType="number-pad"
        />
        <InputField
          label={'Bank Name'}
          placeholder={'Bank Name'}
          value={bankName}
          setValue={setBankName}
        />
        <InputField
          label={'Branch'}
          placeholder={'Branch'}
          value={bankBranch}
          setValue={setBankBranch}
        />
        <InputField
          label={'IFSC Code'}
          placeholder={'IFSC Code'}
          value={ifscCode}
          setValue={setIfscCode}
          keyboardType="number-pad"
        />
        <InputField
          label={'Account Type'}
          placeholder={'Account Type'}
          value={accountType}
          setValue={setAccountType}
        />
        <Button
          btnTxt={'Submit'}
          Width={'100%'}
          customStyle={{marginVertical: 20}}
          submit={onsubmitForm}
        />
      </ScrollView>
    </>
  );
};

export default UploadBankScreen;
