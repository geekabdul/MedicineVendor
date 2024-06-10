import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../../assets/fonts/Fonts';

const BackHeader = ({headerTitle, showBackIcon = true, RightIcon}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBackIcon ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={Colors.dark} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.title__container}>
        <Text style={styles.titleText}>{headerTitle}</Text>
        {RightIcon && RightIcon}
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  title__container: {
    marginLeft: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  titleText: {fontSize: 16, color: Colors.dark, fontFamily: Fonts.Manrope600},
});
