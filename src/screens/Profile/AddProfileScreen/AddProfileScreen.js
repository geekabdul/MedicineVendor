import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackHeader from '../../../components/BackHeader/BackHeader';
import { Colors } from '../../../assets/colors';
import Fonts from '../../../assets/fonts/Fonts';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import { APICall } from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import { appImages } from '../../../assets/images';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import useCloseAppOnBackButton from '../../../hooks/useCloseAppOnBackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProfileScreen = () => {
  useCloseAppOnBackButton();
  const navigation = useNavigation();
  // const route = useRoute();
  // const {type} = route.params;
  const [type, setType] = useState();

  const [userDetails, setUserDetails] = useState(null);
  // console.log('typeeeeeeee', type);
  //inputs states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [dob, setDob] = useState('');
  const [imagePaths, setImagePaths] = useState(null);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [nearbyPinCode, setNearByPincode] = useState('');
  const [nearbyArray, setNearbyArray] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [adhaarNumber, setAdhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [druglicenseNumber, setDruglicenseNumber] = useState('');
  const [dlNumber, setDlNumber] = useState('');

  //lab details  inputsstates
  const [labName, setLabName] = useState('');
  const [labOpenTime, setLabOpenTime] = useState('');
  const [labCloseTime, setLabCloseTime] = useState('');
  const [labAddress, setLabAddress] = useState('');
  const [labLandmark, setLabLandmark] = useState('');
  const [labPincode, setLabPincode] = useState('');
  const [labLatitude, setLabLatitude] = useState('');
  const [labLongitude, setLabLongitude] = useState('');
  const [labImagePath, setLabImagePath] = useState(null);

  // pacakges state
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [modalOf, setModalOf] = useState('');

  //states
  const [showInput, setShowInput] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDob(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const AddProfile = async () => {
    const formData = new FormData();
    const imageName = imagePaths?.path?.split('/').slice(-1)[0];

    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', number);
    formData.append('address', address);
    formData.append('landmark', landmark);
    formData.append('pincode', pincode);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('aadhar_number', adhaarNumber);
    formData.append('pan_number', panNumber);
    // const nearbyPincodesString = nearbyArray.join(',');
    formData.append('pincodes', '110001,110002');
    // formData.append('pincodes', JSON.stringify(nearbyArray));
    formData.append('gst_number', gstNumber);
    formData.append('drug_license_number', druglicenseNumber);
    formData.append('dl_number', dlNumber);
    formData.append('dob', dob);
    // {
    //   !!imagePaths?.mime
    //     ? formData.append('image', {
    //         uri: imagePaths?.path,
    //         type: imagePaths?.mime,
    //         name: imageName,
    //       })
    //     : null;
    // }
    if (imagePaths?.mime) {
      formData.append('image', {
        uri: imagePaths?.path,
        type: imagePaths?.mime,
        name: imageName,
      });
    }
    console.log(JSON.stringify(formData), 'pppppppp');

    APICall('post', 'add-profile', formData, formSuccessed, formFailed, true);
  };
  const formSuccessed = data => {
    console.log(data, 'success');
    Toast.show(data?.message);
    type == 2 ? AddLab() : navigation.navigate('UploadDocument', { type });
  };
  const formFailed = error => {
    console.log(error?.response?.data, 'add error');
    Toast.show(error?.response?.data?.message);
  };

  const AddLab = async () => {
    const formData = new FormData();
    const imageName = labImagePath?.path?.split('/').slice(-1)[0];

    formData.append('lab_name', labName);
    formData.append('open_time', labOpenTime);
    formData.append('close_time', labCloseTime);
    formData.append('address', labAddress);
    formData.append('landmark', labLandmark);
    formData.append('pincode', labPincode);
    formData.append('latitude', labLatitude);
    formData.append('longitude', labLongitude);
    {
      !!labImagePath?.mime
        ? formData.append('image', {
          uri: labImagePath?.path,
          type: labImagePath?.mime,
          name: imageName,
        })
        : null;
    }

    APICall('post', 'add-lab', formData, labAdded, labFailed, true);
    // axios
    //   .post(`${BASEURL}add-lab`, labformData, {headers})
    //   .then(response => {
    //     console.log(response?.data, 'success');
    //     Toast.show(response?.data?.message);
    //     // props?.navigation.goBack();
    //   })
    //   .catch(error => {
    //     console.log('item fail', error);
    //     Toast.show(error?.response?.data?.message);
    //   });
  };

  const labAdded = data => {
    console.log(data, 'success ADDED');
    Toast.show(data?.message);
    navigation.navigate('UploadDocument', { type });
  };
  const labFailed = error => {
    console.log('LAB fail', error);
    Toast.show(error?.response?.data?.message);
  };

  const openCamera = imagetype => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        imagetype === 'userImage'
          ? setImagePaths(image)
          : imagetype === 'labImage'
            ? setLabImagePath(image)
            : null;
      })
      .catch(error => {
        if (
          error == 'Error: User did not grant camera permission.' ||
          error == 'Error: User did not grant library permission.'
        ) {
          Toast.show('User did not grant camera permission');
        }
      });
  };

  const openGallery = imagetype => {
    // console.log(imagetype, 'iittt');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // console.log('galaryImage', image);
        imagetype === 'userImage'
          ? setImagePaths(image)
          : imagetype === 'labImage'
            ? setLabImagePath(image)
            : null;
      })
      .catch(error => {
        if (
          error == 'Error: User did not grant library permission.' ||
          error == 'Error: User did not grant camera permission.'
        ) {
          Toast.show('User did not grant library permission.');
        }
      });
  };

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };

  const getProfileSuccess = res => {
    // console.log(res?.result?.basic_details?.type, 'Profile fetch successful');
    setUserDetails(res?.result || null);
    setType(res?.result?.basic_details?.type);
  };

  const getProfileFail = error => {
    console.log(error.response.data, 'Error fetching profile');
  };

  //logout
  const logoutUser = async () => {
    APICall('get', 'logout', {}, onSuccessLogout, onFailedLogout);
  };

  const onSuccessLogout = res => {
    AsyncStorage.removeItem('Token');
    console.log(res.message, 'SuccessLogout');
    Toast.show(res?.message);
    navigation.navigate('LoginChoiceScreen');
  };
  const onFailedLogout = err => {
    console.log(err.response.data, 'logoutError');
    // Toast.show(err?.response?.data);
  };

  // console.log('userDetailsuserDetails', userDetails);
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails?.basic_details?.name || '');
      setNumber(userDetails?.basic_details?.mobile || '');
    }
  }, [userDetails]);
  return (
    <>
      <BackHeader
        headerTitle={'Profile'}
        showBackIcon={false}
        RightIcon={
          <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
            <Feather name="log-out" size={25} color={Colors.dark} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <InputField
          label={'Name*'}
          placeholder={'Name'}
          value={name}
          setValue={setName}
        />
        <InputField
          label={'Email*'}
          placeholder={'Email'}
          value={email}
          setValue={setEmail}
        />
        <InputField
          label={'Mobile*'}
          placeholder={'Mobile'}
          value={number}
          setValue={setNumber}
          keyboardType="number-pad"
        />

        <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
          <InputField
            label={'Date of Birth*'}
            placeholder={'YYYY-MM-DD'}
            value={dob}
            setValue={setDob}
            keyboardType="number-pad"
            isEditable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />
        <Text
          style={{ color: Colors.primarycolor, fontFamily: Fonts.Manrope600 }}>
          Upload Image
        </Text>
        <View style={styles.uploadImage__container}>
          <Image
            source={
              !imagePaths ? appImages.userDefaultImage : { uri: imagePaths.path }
            }
            style={styles.imageStyle}
          />
          <View style={styles.uploadTakeBtn__container}>
            <TouchableOpacity
              onPress={() => openCamera('userImage')}
              activeOpacity={0.5}
              style={styles.imageTakeUploadBtn}>
              <Text style={styles.takeUploadBtnText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openGallery('userImage')}
              activeOpacity={0.5}
              style={styles.imageTakeUploadBtn}>
              <Text style={styles.takeUploadBtnText}>Upload Picture</Text>
            </TouchableOpacity>
          </View>
        </View>

        <InputField
          label={'Address'}
          placeholder={'Address'}
          value={address}
          setValue={setAddress}
        />
        {type !== 3 ? (
          <>
            <View
              onTouchEnd={() => {
                setModalOf('profile');
                setModalVisible(true);
              }}>
              <InputField
                label={'Landmark'}
                placeholder={'Landmark'}
                value={landmark}
                setValue={setLandmark}
                isEditable={false}
              />
            </View>
            <InputField
              label={'Pincode'}
              placeholder={'Pincode'}
              value={pincode}
              setValue={setPincode}
              isEditable={false}
            />
            <View>
              {nearbyArray.length > 0 && (
                <>
                  <Text>NearBy Pincodes</Text>
                  <ScrollView
                    horizontal
                    style={styles.nearbyContainer}
                    showsHorizontalScrollIndicator={false}>
                    {nearbyArray.map((nearby, index) => (
                      <View style={styles.nearByText__container}>
                        <Text key={index} style={styles.nearbyText}>
                          {nearby}
                        </Text>
                        <View
                          onTouchEnd={() => {
                            setNearbyArray(prevArray => [
                              ...prevArray.slice(0, index),
                              ...prevArray.slice(index + 1),
                            ]);
                          }}>
                          <AntDesign name="close" color="white" />
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </>
              )}

              {showInput ? (
                <View style={styles.addInput__container}>
                  <InputField
                    placeholder={`NearBy Pincode ${nearbyArray.length + 1}`}
                    value={nearbyPinCode}
                    setValue={val => {
                      console.log(val);
                      setNearByPincode(val);
                    }}
                    keyboardType={'Numeric'}
                    maxLength={6}
                  />
                  <View style={styles.inputBtnAddDelete__container}>
                    <Button
                      btnTxt={'Add'}
                      customStyle={styles.addInputBtn}
                      submit={() => {
                        if (nearbyPinCode.trim().length === 6) {
                          setNearbyArray(prevArray => [
                            ...prevArray,
                            nearbyPinCode,
                          ]);
                          // console.log(typeof Number(nearbyPinCode));
                          setNearByPincode('');
                          setShowInput(false);
                        } else {
                          Toast.show('Pincode is not less or greater than 6');
                        }
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setShowInput(false);
                      }}
                      style={styles.deletInputBtn}>
                      <AntDesign name="delete" size={25} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <Button
                btnTxt={'Add Nearby pincode'}
                customStyle={styles.addNearbyBtn}
                submit={() => {
                  setShowInput(true);
                }}
              />
            </View>
          </>
        ) : null}

        <InputField
          label={'Adhaar Number'}
          placeholder={'Adhaar Number'}
          value={adhaarNumber}
          setValue={setAdhaarNumber}
          keyboardType="number-pad"
          maxLength={12}
        />
        <InputField
          label={'Pan Number'}
          placeholder={'Pan Number'}
          value={panNumber}
          setValue={setPanNumber}
        />
        <InputField
          label={'GST Number'}
          placeholder={'GST Number'}
          value={gstNumber}
          setValue={setGstNumber}
        />
        {type !== 3 ? (
          <InputField
            label={'Drug License Number'}
            placeholder={'Drug License Number'}
            value={druglicenseNumber}
            setValue={setDruglicenseNumber}
          />
        ) : null}
        {type === 3 ? (
          <>
            <InputField
              label={'Driving License'}
              placeholder={'Driving License'}
              value={dlNumber}
              setValue={setDlNumber}
            />
          </>
        ) : null}
        {type === 2 ? (
          <>
            <InputField
              label={'Lab Name'}
              placeholder={'Lab Name'}
              value={labName}
              setValue={setLabName}
            />
            <InputField
              label={'Open Time'}
              placeholder={'Open Time'}
              value={labOpenTime}
              setValue={setLabOpenTime}
            />
            <InputField
              label={'Close Time'}
              placeholder={'Close Time'}
              value={labCloseTime}
              setValue={setLabCloseTime}
            />
            <InputField
              label={'Lab Address'}
              placeholder={'Lab Address'}
              value={labAddress}
              setValue={setLabAddress}
            />
            <View
              onTouchEnd={() => {
                setModalOf('lab');
                setModalVisible(true);
              }}>
              <InputField
                label={'Lab LandMark'}
                placeholder={'Lab LandMark'}
                value={labLandmark}
                setValue={setLabLandmark}
                isEditable={false}
              />
            </View>
            <InputField
              label={'Lab PinCode'}
              placeholder={'Lab PinCode'}
              value={labPincode}
              setValue={setLabPincode}
              isEditable={false}
            />
            <Text>Upload Lab Image</Text>
            <View style={styles.uploadImage__container}>
              <Image
                source={
                  !labImagePath ? appImages.addImage : { uri: labImagePath.path }
                }
                style={styles.imageStyle}
              />
              <View style={styles.uploadTakeBtn__container}>
                <TouchableOpacity
                  onPress={() => openCamera('labImage')}
                  activeOpacity={0.5}
                  style={styles.imageTakeUploadBtn}>
                  <Text style={styles.takeUploadBtnText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openGallery('labImage')}
                  activeOpacity={0.5}
                  style={styles.imageTakeUploadBtn}>
                  <Text style={styles.takeUploadBtnText}>Upload Picture</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
        <View style={{ marginTop: 10 }}>
          <Button btnTxt={'Add Profile'} Width={'90%'} submit={AddProfile} />
        </View>
      </ScrollView>

      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text>{modalOf}</Text> */}
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                if (modalOf === 'profile') {
                  setLandmark(data.description);
                  setPincode(
                    details.address_components.find(component =>
                      component.types.includes('postal_code'),
                    )?.short_name,
                  );
                  setLatitude(details.geometry.location.lat);
                  setLongitude(details.geometry.location.lng);
                } else if (modalOf === 'lab') {
                  setLabLandmark(data.description);
                  setLabPincode(
                    details.address_components.find(component =>
                      component.types.includes('postal_code'),
                    )?.short_name,
                  );
                  setLabLatitude(details.geometry.location.lat);
                  setLabLongitude(details.geometry.location.lng);
                }

                setModalVisible(false);
              }}
              query={{
                key: 'AIzaSyCyHcqLcJ1Kw1cTcFCFDEdyZcVlwLRSsMI',
                language: 'en',
              }}
              // textInputProps={{
              //   value: landmark ? landmark : null,
              // }}
              styles={{
                container: { marginTop: 20 },
                textInputContainer: { paddingHorizontal: 10 },
                textInput: {
                  borderWidth: 1,
                  borderColor: Colors.lightgrey,
                },
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => {
          setLogoutModalVisible(!logoutModalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 20,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: Colors.dark }}>
              Are you sure to log out?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                width: '80%',
                marginVertical: 20,
              }}>
              <Button btnTxt={'Yes'} Width={'45%'} submit={logoutUser} />
              <Button
                btnTxt={'No'}
                Width={'45%'}
                submit={() => setLogoutModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddProfileScreen;

const styles = StyleSheet.create({
  inputField: {
    padding: 0,
    paddingLeft: 10,
    paddingVertical: 7,
    marginVertical: 7,
    fontSize: 12,
    borderRadius: 3,
    color: 'black',
    fontFamily: Fonts.Poppins400,
    borderWidth: 1.5,
    borderColor: Colors.primarycolor,
    backgroundColor: 'white',
    width: '100%',
  },
  nearbyContainer: {
    paddingLeft: 10,
    paddingVertical: 12,
    marginVertical: 7,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.primarycolor,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  nearByText__container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPrimary,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginRight: 10,
  },
  nearbyText: {
    marginRight: 5,
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.Poppins400,
  },
  addInput__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBtnAddDelete__container: { flexDirection: 'row', alignItems: 'center' },
  addInputBtn: {
    paddingHorizontal: 5,
  },
  deletInputBtn: {
    backgroundColor: Colors.lightPrimary,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  addNearbyBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
  },
  uploadImage__container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: Colors.primarycolor,
    borderRadius: 3,
    padding: 10,
  },
  imageStyle: { width: 100, height: 100 },
  uploadTakeBtn__container: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  imageTakeUploadBtn: {
    marginVertical: 10,
    alignItems: 'center',
    padding: 7,
    backgroundColor: Colors.white,
    borderWidth: 1,
    width: '80%',
    borderColor: Colors.primarycolor,
    borderRadius: 3,
  },
  takeUploadBtnText: { fontSize: 12, fontFamily: Fonts.Poppins400 },

  //modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    width: '100%',
    height: '70%',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  //modal styles
});
