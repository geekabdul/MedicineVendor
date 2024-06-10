import { useEffect, useState } from 'react';
import { APICall } from '../helper/Helper';

const useUserProfile = () => {
  const [userData, setUserData] = useState(null);

  const getProfileSuccess = res => {
    setUserData(res?.result);
  };

  const getProfileFail = error => {
    console.log(error.response.data, 'Error fetching profile');
  };

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };

  useEffect(() => {
    getProfile();
  }, []);
  return userData;
};

export default useUserProfile;
