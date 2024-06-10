import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {Colors} from '../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../assets/fonts/Fonts';

const AssignedOrderCard = ({data}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      //   onPress={() =>
      // navigation.navigate('OrderDetailsScreen', {order_id: data.sub_order_id})
      //   }
      style={styles.container}>
      {/* <Text style={styles.statusText}>
        {data.order_status == 'delivered' && type == 2
          ? 'Completed'
          : data.order_status}
      </Text> */}
      <Text style={styles.nameText}>
        <Text style={{fontFamily: Fonts.Manrope700}}>OrderId: </Text>
        {data['order-id']}
      </Text>
      <Text style={styles.nameText}>
        <Text style={{fontFamily: Fonts.Manrope700}}>Customer Name: </Text>
        {data.customer_name}
      </Text>
      <Text style={styles.nameText}>
        <Text style={{fontFamily: Fonts.Manrope700}}>Amount: </Text>
        {data.amount}
      </Text>
      <Text style={styles.nameText}>
        <Text style={{fontFamily: Fonts.Manrope700}}>Contact: </Text>
        {data.customer_mobile}
      </Text>
      {data?.product_list.map((item, i) => {
        if (i <= 1) {
          return (
            <Text
              numberOfLines={1}
              style={[styles.listName, {paddingTop: 5}]}
              key={i}>
              {'\u2B24  '}
              {item?.name}
            </Text>
          );
        }
      })}
      {data?.product_list.length - 2 > 0 ? (
        <Text style={styles.moreText}>{`+${
          data?.product_list.length - 2
        } more`}</Text>
      ) : null}
      <View style={styles.footerContainer}>
        <Text numberOfLines={1} style={styles.placeText}>
          Ordered On:{' '}
          <Text style={styles.dateText}>
            {moment(data.created_at).format('DD-MM-YY')}
          </Text>
        </Text>
        <Text numberOfLines={1} style={styles.placeText}>
          Amount: <Text style={styles.dateText}>{data.amount}</Text>
        </Text>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.detailText}>View Details</Text>
          <AntDesign
            name="rightcircle"
            color={Colors.primarycolor}
            style={{paddingTop: 3}}
            size={14}
          />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default AssignedOrderCard;

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
    fontFamily: Fonts.Manrope400,
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
