export const BASEURL = 'http://143.110.244.110/medicine-app/api/vendor/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const APICall = async (
  method,
  url,
  params,
  onSuccess,
  onFailure,
  formData = false,
) => {
  const getToken = await AsyncStorage.getItem('Token');
  const headers = {
    Authorization: `Bearer ${getToken}`,
    'Content-Type': formData ? 'multipart/form-data' : 'application/json',
  };
  axios({
    method: method,
    url: `${BASEURL}${url}`,
    data: params,
    params: params,
    headers: headers,
  })
    .then(response => {
      onSuccess(response?.data);
    })
    .catch(error => {
      onFailure(error);
    });
};
