import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// 7732914128
import React, {useState} from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import {useRoute} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {Colors} from '../../assets/colors';
import {APICall} from '../../helper/Helper';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const ViewDeliveryBoy = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderImage = imageUrl => {
    if (
      imageUrl !== 'http://143.110.244.110/medicine-app/images/no_image.png'
    ) {
      return (
        <TouchableOpacity onPress={() => handleImageClick(imageUrl)}>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </TouchableOpacity>
      );
    } else {
      return <Image source={{uri: imageUrl}} style={styles.image} />;
    }
  };

  const onPressAccept = () => {
    updateKycStatus(1);
  };
  const onPressReject = () => {
    updateKycStatus(2);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };
  const renderModalContent = () => {
    if (selectedImage) {
      return (
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image source={{uri: selectedImage}} style={styles.modalImage} />
        </View>
      );
    }
    return null;
  };

  const updateKycStatus = async statusType => {
    const param = {
      deliveryboy_id: data.deliveryboy_id,
      status: statusType, //1->approved, 2->rejected
    };
    await APICall(
      'post',
      'update-kyc',
      param,
      onSuccessUpdateKyc,
      onErrorUpdateKyc,
    );
  };

  const onSuccessUpdateKyc = res => {
    // console.log(res?.message, 'sucess update-kyc');
    Toast.show(res?.message);
    navigation.goBack();
    // setDeliveryBoys(res?.data, 'fetch successfull list');
  };
  const onErrorUpdateKyc = err => {
    Toast.show(err?.message);
    console.error('error update-kyc', err);
  };
  return (
    <>
      <BackHeader headerTitle={`${data?.name} Details`} />
      <View style={styles.container}>
        <Text style={styles.nameText}>{data?.name}</Text>
        {data?.aadhar_number && (
          <Text style={styles.detailText}>
            Aadhar Number: {data?.aadhar_number}
          </Text>
        )}
        <Text style={styles.detailText}>KYC Status: {data?.kyc_status}</Text>
        <View style={styles.imageContainer}>
          <View>
            <Text>Adhaar Card Front:</Text>
            {data?.aadhar_image_front && renderImage(data?.aadhar_image_front)}
          </View>
          <View>
            <Text>Adhaar Card Back:</Text>
            {data?.aadhar_image_back && renderImage(data?.aadhar_image_back)}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>DL Number:</Text>
          {data?.dl_number && (
            <Text style={{marginLeft: 10}}>{data?.dl_number}</Text>
          )}
        </View>
        <View>
          <Text>DL Image:</Text>
          {data?.dl_image && renderImage(data?.dl_image)}
        </View>
      </View>
      {
        //   data.kyc_status !== 'Approved' &&
        //     data.kyc_status !== 'Rejected' &&
        data.kyc_status == 'Pending' && (
          <View style={styles.Bottom_container}>
            <Button btnTxt={'Accept'} submit={onPressAccept} Width={'45%'} />
            <Button
              btnTxt="Reject"
              submit={onPressReject}
              Width={'45%'}
              customStyle={{backgroundColor: Colors.red}}
            />
          </View>
        )
      }
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default ViewDeliveryBoy;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    marginTop: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imagePlaceholder: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  Bottom_container: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 24,
    color: 'white',
  },
  modalImage: {
    width: '95%',
    height: '80%',
    resizeMode: 'contain',
  },
});
