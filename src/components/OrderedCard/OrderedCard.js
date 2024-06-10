import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
// import Fonts from '../../assets/fonts/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../assets/colors';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../assets/fonts/Fonts';

export default function OrderedCard({ data, type }) {
  const navigation = useNavigation();
  // console.log(data.order_status);
  const Status = (item) => {
    if (item == 0) {
      return 'pending'
    } else if (item == 1) {
      return 'accepted'
    } else if (item == 2) {
      return 'rejected'
    } else if (item == 3) {
      return 'shipped'
    } else if (item == 4) {
      return 'delivered'
    } else if (item == 5) {
      return 'Out For Delivery'
    } else if (item == 6) {
      return 'Assigned';
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('OrderDetailsScreen', { order_id: data.sub_order_id })
      }
      style={styles.container}>
      <Text style={styles.statusText}>
        {data.order_status == 'delivered' && type == 2
          ? 'Completed'
          : Status(data.status)}
      </Text>
      <Text style={styles.nameText}>OrderId: {data.sub_order_id}</Text>
      <Text style={styles.nameText}>Total Item: {data.total_items}</Text>
      {data?.product_list.map((item, i) => {
        return (
          <Text
            numberOfLines={1}
            style={[styles.listName, { paddingTop: 5 }]}
            key={i}>
            {'\u2B24  '}
            {item?.name}
          </Text>
        );
      })}
      {/* <Text style={styles.moreText}>+2 more</Text> */}
      <View style={styles.footerContainer}>
        <Text numberOfLines={1} style={styles.placeText}>
          Ordered On:{' '}
          <Text style={styles.dateText}>
            {moment(data.order_date, 'ddd, DD MMM YYYY hh:mm:ss A').format(
              'DD-MM-YY',
            )}
          </Text>
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detailText}>View Details</Text>
          <AntDesign
            name="rightcircle"
            color={Colors.primarycolor}
            style={{ paddingTop: 3 }}
            size={14}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginVertical: 7,
  },
  statusText: {
    backgroundColor: 'grey',
    color: 'white',
    alignSelf: 'flex-end',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderTopRightRadius: 7,
    fontSize: 12,
    fontFamily: Fonts.Manrope500,
    position: 'absolute',
  },
  nameText: {
    fontSize: 13,
    fontFamily: Fonts.Manrope600,
    color: Colors.dark,
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  listName: {
    color: 'grey',
    fontSize: 13,
    paddingHorizontal: 25,
    fontFamily: Fonts.Manrope500,
  },
  moreText: {
    paddingHorizontal: 15,
    color: Colors.primarycolor,
    fontSize: 13,
    fontFamily: Fonts.Manrope500,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    marginTop: 5,
  },
  placeText: {
    color: 'black',
    fontSize: 12,
    fontFamily: Fonts.Manrope500,
    width: '65%',
  },
  dateText: {
    color: 'black',
    fontSize: 14,
    fontFamily: Fonts.Manrope600,
  },
  detailText: {
    // color: 'black',
    fontSize: 14,
    fontFamily: Fonts.Manrope800,
    paddingRight: 5,
    color: Colors.primarycolor,
  },
});
