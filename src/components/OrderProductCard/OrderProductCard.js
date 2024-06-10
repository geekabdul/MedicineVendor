import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import Fonts from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/colors';

export default function OrderProductCard(props) {
  const item = props?.item;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      // onPress={props?.handleClick}
      style={styles.mainBox}>
      <Image
        source={{ uri: item?.image }}
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
      <View style={{ width: '79%' }}>
        <View>
          <Text numberOfLines={2} style={styles.nameText}>
            {item?.name}
          </Text>
          <Text style={styles.catName}>Sold By: {item?.sold_by}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>₹{item?.product_price}</Text>
          <Text style={styles.quantityText}>Qty: {item?.qty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  mainBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: 'lightgrey',
    paddingBottom: 3,
    paddingTop: 5,
  },
  nameText: {
    fontSize: 15,
    color: Colors.primarycolor,
    fontFamily: Fonts.Manrope600,
  },
  catName: {
    fontSize: 12,
    fontFamily: Fonts.Manrope600,
    paddingVertical: 2,
    color: Colors.dark,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.Manrope700,
    color: Colors.dark,
  },
  quantityText: {
    fontSize: 15,
    fontFamily: Fonts.Manrope500,
    color: Colors.dark,
  },
});
