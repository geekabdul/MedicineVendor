import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../assets/colors';
import Fonts from '../../assets/fonts/Fonts';
import { appImages } from '../../assets/images';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';

const UploadImage = ({ label, imagePath, setImagePath }) => {
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImagePath(image);
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

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImagePath(image);
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
  return (
    <>
      <Text>{label}</Text>
      <View style={styles.uploadImage__container}>
        <Image
          source={!imagePath ? appImages.addImage : { uri: imagePath.path }}
          style={styles.imageStyle}
        />
        <View style={styles.uploadTakeBtn__container}>
          <TouchableOpacity
            onPress={openCamera}
            activeOpacity={0.5}
            style={styles.imageTakeUploadBtn}>
            <Text style={styles.takeUploadBtnText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openGallery}
            activeOpacity={0.5}
            style={styles.imageTakeUploadBtn}>
            <Text style={styles.takeUploadBtnText}>Upload Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
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
});
