import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import BackHeader from '../../../components/BackHeader/BackHeader';

import UploadImage from '../../../components/UploadImage/UploadImage';
import Button from '../../../components/Button/Button';
import {APICall} from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import useCloseAppOnBackButton from '../../../hooks/useCloseAppOnBackButton';

const UploadDocument = () => {
  useCloseAppOnBackButton();
  const navigation = useNavigation();
  // const route = useRoute();
  // const {type} = route?.params;
  // console.log('doctypeeeeeee', type);

  const [type, setType] = useState('');
  const [adhaarFrontImg, setAdhaarFrontImg] = useState(null);
  const [adhaarBackImg, setAdhaarBackImg] = useState(null);
  const [panCardImg, setPanCardImg] = useState(null);
  const [dlImg, setDlImg] = useState(null);

  const uploadDoc = async () => {
    const formData = new FormData();

    const adhaarFrontName = adhaarFrontImg?.path?.split('/').slice(-1)[0];
    const adhaarBackName = adhaarBackImg?.path?.split('/').slice(-1)[0];
    const panCardName = panCardImg?.path?.split('/').slice(-1)[0];
    const dlName = dlImg?.path?.split('/').slice(-1)[0];

    {
      !!adhaarFrontImg?.mime
        ? formData.append('aadhar_image_front', {
            uri: adhaarFrontImg?.path,
            type: adhaarFrontImg?.mime,
            name: adhaarFrontName,
          })
        : null;
    }
    {
      !!adhaarBackImg?.mime
        ? formData.append('aadhar_image_back', {
            uri: adhaarBackImg?.path,
            type: adhaarBackImg?.mime,
            name: adhaarBackName,
          })
        : null;
    }
    {
      !!panCardImg?.mime
        ? formData.append('pancard_image', {
            uri: panCardImg?.path,
            type: panCardImg?.mime,
            name: panCardName,
          })
        : null;
    }
    {
      type == 3
        ? !!dlImg?.mime
          ? formData.append('dl_image_front', {
              uri: dlImg?.path,
              type: dlImg?.mime,
              name: dlName,
            })
          : null
        : null;
    }

    APICall('post', 'upload-document', formData, onSuccess, onFailure, true);
  };

  const onSuccess = data => {
    console.log(data, 'success');
    Toast.show(data?.message);
    if (type != 3) {
      navigation.navigate('UploadBankScreen');
    } else {
      navigation.navigate('Dashboard');
    }
  };
  const onFailure = error => {
    console.log(error.response.data?.message, 'error');
    Toast.show(error?.response?.data?.message);
  };
  console.log(adhaarFrontImg);
  console.log(adhaarBackImg);
  console.log(panCardImg);
  console.log(dlImg);

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };

  const getProfileSuccess = res => {
    // console.log(res?.result?.basic_details?.type, 'Profile fetch successful');
    setType(res?.result?.basic_details?.type);
  };

  const getProfileFail = error => {
    console.log(error.response.data, 'Error fetching profile');
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <BackHeader headerTitle={'Upload Document'} />
      <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 40}}>
        <UploadImage
          label={'Adhaar Front'}
          imagePath={adhaarFrontImg}
          setImagePath={setAdhaarFrontImg}
        />
        <UploadImage
          label={'Adhaar Back'}
          imagePath={adhaarBackImg}
          setImagePath={setAdhaarBackImg}
        />
        {type != 3 && (
          <UploadImage
            label={'PAN Card'}
            imagePath={panCardImg}
            setImagePath={setPanCardImg}
          />
        )}
        {type == 3 ? (
          <UploadImage
            label={'Driving License'}
            imagePath={dlImg}
            setImagePath={setDlImg}
          />
        ) : null}
        <Button btnTxt={'Upload'} Width={'90%'} submit={uploadDoc} />
      </ScrollView>
    </>
  );
};

export default UploadDocument;
