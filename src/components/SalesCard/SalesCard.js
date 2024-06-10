import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../assets/colors'
import moment from 'moment'

export default function SalesCard({ updateOrder, item }) {
    return (
        <View
            style={{
                backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: Colors.primarycolor,
                marginBottom: 7,
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 5
            }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Order Id: <Text style={{ fontSize: 14, fontWeight: '400', }}>{item?.order_id}</Text></Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Order Date: <Text style={{ fontSize: 14, fontWeight: '400', }}>{moment(item?.order_date).format(`DD-MM-YYYY`)} at {moment(item?.order_date).format(`hh:mm A`)}</Text></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Pay Amount: <Text style={{ fontSize: 14, fontWeight: '400', }}>{item?.to_pay}</Text></Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Receive Amount: <Text style={{ fontSize: 14, fontWeight: '400', }}>{item?.to_receive}</Text></Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Total Amount:<Text style={{ fontSize: 14, fontWeight: '400', }}>{item?.tot_amt}</Text></Text>
            <Text style={{ fontSize: 14, fontWeight: '700', fontStyle: 'italic', color: Colors.dark, position: 'absolute', right: 0, backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 4, paddingHorizontal: 10, color: Colors.primarycolor, borderBottomLeftRadius: 5 }}>{item?.balance_settlement == '1' ? 'Pending' : item?.balance_settlement == '2' ? 'Paid' : 'Received'}</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.dark, lineHeight: 23 }}>Payment Method: <Text style={{ fontSize: 14, fontWeight: '400', }}>{item?.payment_method == '0' ? 'COD' : 'Online'}</Text></Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => updateOrder(item)}
                style={{
                    backgroundColor: Colors.primarycolor,
                    paddingVertical: 4,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    margin: 10
                }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.white }}>UPDATE</Text>
            </TouchableOpacity>
        </View>
    )
}