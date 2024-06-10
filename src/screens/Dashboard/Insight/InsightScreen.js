import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../../assets/fonts/Fonts';
import { APICall } from '../../../helper/Helper';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import SalesCard from '../../../components/SalesCard/SalesCard';
import useUserProfile from '../../../hooks/useUserProfile';
const InsightScreen = () => {
  const navigation = useNavigation();
  const userData = useUserProfile();
  console.log('userDatauserData', userData?.basic_details?.type)
  const [insightData, setInsightData] = useState(null)
  useEffect(() => {
    if (!!userData && userData?.basic_details?.type == 1) {
      getInsightData()
    }
  }, [userData])
  const getInsightData = () => {
    APICall('get', 'commission-details', {}, onPassData, onFailData)
  }
  const onPassData = (item) => {
    setInsightData(item)
  }
  const onFailData = (error) => {
    console.log("errorerrorerrorerror", error)
  }
  const updateOrder = (item) => {
    const params = {
      "order_id": item?.order_id,
      "status": item?.status
    }
    console.log("sdfasdfasdfasdfsadfsdf", params, item)
    APICall('post', 'update-status', params, onPassUpdate, onFailUpdate)

  }
  const onPassUpdate = (item) => {
    console.log("onPassUpdateonPassUpdateonPassUpdate", item)
    Toast.show(item?.message);
    getInsightData()
  }
  const onFailUpdate = (error) => {
    console.log("onFailUpdateonFailUpdate", error?.response?.data)
    if (error?.response?.data?.status == false) {
      Toast.show(error?.response?.data?.message);
    }
  }
  return (
    <>
      <Header headerTitle={'Insight'} />
      <ScrollView style={{ flexGrow: 1 }}>
        {!!insightData &&
          (<>
            <View style={styles.InsightOrders__card}>
              {/* <View style={styles.cardTop__container}> */}
              <Text style={[styles.cardMain__heading, { paddingBottom: 10 }]}>Delivered Orders</Text>
              {/* <TouchableOpacity
            style={styles.seeMoreIcon__container}
            onPress={() => navigation.navigate('TotalSalesScreen')}>
            <Text style={styles.seeMoreText}>See more</Text>
            <AntDesign name="caretright" color={'blue'} />
          </TouchableOpacity> */}
              {/* </View> */}
              {/* <View style={styles.deliveredOrders__subContainer}>
          <View>
            <Text>Today</Text>
            <Text style={styles.deliveredOrder__amount}>₹0</Text>
            <Text>0 order</Text>
          </View>
          <View style={styles.whiteHorizontalLine} />
          <View style={styles.subCard__bottomContainer}>
            <View style={{flex: 1}}>
              <Text>This Week: 01-07 Mar</Text>
              <Text style={styles.deliveredOrder__amount}>₹0</Text>
              <Text>0 order</Text>
            </View>
            <View style={styles.whiteVerticalLine} />
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text>This Week: 01-07 Mar</Text>
              <Text style={styles.deliveredOrder__amount}>₹0</Text>
              <Text>0 order</Text>
            </View>
          </View>
        </View> */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: '47%', borderRadius: 7, elevation: 5, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primarycolor, justifyContent: 'center', alignItems: 'center', height: 120 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 26, color: Colors.dark, fontFamily: Fonts.Manrope800, textAlign: 'center' }}>Total Orders</Text>
                  <Text style={{ fontSize: 16, lineHeight: 26, color: Colors.dark, fontFamily: Fonts.Manrope800, textAlign: 'center' }}>{insightData?.result?.sales_details?.total_orders}</Text>
                </View>
                <View style={{ width: '47%', borderRadius: 7, elevation: 5, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primarycolor, justifyContent: 'center', alignItems: 'center', height: 120 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', lineHeight: 26, color: Colors.dark, fontFamily: Fonts.Manrope800, textAlign: 'center' }}>Total Sales</Text>
                  <Text style={{ fontSize: 16, lineHeight: 26, color: Colors.dark, fontFamily: Fonts.Manrope800, textAlign: 'center' }}>{insightData?.result?.sales_details?.total_sales}</Text>
                </View>
              </View>
            </View>
            <View style={styles.InsightOrders__card}>
              <View style={styles.cardTop__container}>
                {/* <View> */}
                <Text style={styles.cardMain__heading}>Total Sales</Text>
                {/* <Text style={{ fontWeight: '400', color: 'black' }}>
              Lost sale from order rejected by you
            </Text> */}
                {/* </View> */}
                {insightData?.result?.sales?.length > 2 ?
                  <TouchableOpacity
                    style={styles.seeMoreIcon__container}
                    onPress={() => navigation.navigate('TotalSalesScreen')}>
                    <Text style={styles.seeMoreText}>See more</Text>
                    <AntDesign name="caretright" color={'blue'} />
                  </TouchableOpacity> : null}
              </View>
              <FlatList
                data={insightData?.result?.sales}
                renderItem={({ item }) => {
                  return (
                    <SalesCard updateOrder={updateOrder} item={item} />
                  )
                }}
              />
              {/* <View style={styles.rejectedOrderSubContainer}>
          <View>
            <Text>Today</Text>
            <Text style={styles.rejectedOrder__amount}>₹0</Text>
            <Text>0 order</Text>
          </View>
          <View style={styles.greyHorizontalLine} />
          <View style={styles.subCard__bottomContainer}>
            <View style={{ flex: 1 }}>
              <Text>This Week: 01-07 Mar</Text>
              <Text style={styles.rejectedOrder__amount}>₹0</Text>
              <Text>0 order</Text>
            </View>
            <View style={styles.greyVerticalLine} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text>This Week: 01-07 Mar</Text>
              <Text style={styles.rejectedOrder__amount}>₹0</Text>
              <Text>0 order</Text>
            </View>
          </View>
        </View> */}
            </View>
          </>)}
      </ScrollView>
    </>
  );
};

export default InsightScreen;

const styles = StyleSheet.create({
  InsightOrders__card: {
    backgroundColor: Colors.white,
    marginVertical: 5,
    padding: 10,
  },
  cardTop__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardMain__heading: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
  },
  seeMoreIcon__container: { flexDirection: 'row', alignItems: 'center' },
  seeMoreText: { marginHorizontal: 5, color: Colors.primarycolor, fontSize: 12 },
  deliveredOrders__subContainer: {
    backgroundColor: Colors.primarycolor,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  whiteHorizontalLine: {
    height: 0.5,
    width: '110%',
    backgroundColor: Colors.white,
    marginVertical: 10,
    alignSelf: 'center',
  },
  whiteVerticalLine: {
    width: 0.5,
    height: '135%',
    backgroundColor: Colors.white,
  },
  rejectedOrderSubContainer: {
    borderWidth: 0.5,
    borderColor: Colors.lightgrey,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  subCard__bottomContainer: { flexDirection: 'row', alignItems: 'center' },
  greyHorizontalLine: {
    height: 0.5,
    width: '110%',
    backgroundColor: Colors.lightgrey,
    marginVertical: 10,
    alignSelf: 'center',
  },
  greyVerticalLine: {
    width: 0.5,
    height: '135%',
    backgroundColor: Colors.lightgrey,
  },
  deliveredOrder__amount: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 20,
  },
  rejectedOrder__amount: {
    color: Colors.dark,
    fontWeight: '700',
    fontSize: 20,
  },
});
