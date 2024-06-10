import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import { Colors } from '../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appImages } from '../../assets/images';
import { APICall } from '../../helper/Helper';
import SalesCard from '../../components/SalesCard/SalesCard';
import Toast from 'react-native-simple-toast';

const tabData = ['Delivered Orders', 'Total sales', 'Average order value'];
const TotalSalesScreen = (props) => {
  const [insightData, setInsightData] = useState(null)
  // const [selectedTab, setSelectedTab] = useState(tabData[0]);
  useEffect(() => {
    getInsightData()
  }, [])
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
    APICall('post', 'update-status', params, onPassUpdate, onFailUpdate)
  }
  const onPassUpdate = (item) => {
    console.log("onPassUpdateonPassUpdateonPassUpdate", item)
    getInsightData()
    Toast.show(item?.message);
  }
  const onFailUpdate = (error) => {
    console.log("onFailUpdateonFailUpdate", error?.response?.data)
    if (error?.response?.data?.status == false) {
      Toast.show(error?.response?.data?.message);
    }
  }
  return (
    <>
      <BackHeader headerTitle={'Total Sales'} />
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
        data={insightData?.result?.sales}
        renderItem={({ item }) => {
          return (
            <SalesCard updateOrder={updateOrder} item={item} />
          )
        }}
      />
      {/* <ScrollView>
        <View style={styles.deliveredOrderTrend__container}>
          <Text>Delivered Order Trend</Text>
          <ScrollView
            horizontal
            style={{ marginVertical: 10, marginHorizontal: -10 }}
            showsHorizontalScrollIndicator={false}>
            {tabData.map((tab, index) => (
              <TouchableOpacity
                onPress={() => setSelectedTab(tab)}
                style={{
                  marginRight: 20,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    borderBottomWidth: selectedTab === tab ? 1.5 : 0,
                    paddingBottom: 5,
                    color: selectedTab === tab ? Colors.blue : Colors.grey,
                    borderBottomColor: Colors.blue,
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ color: Colors.blue, marginRight: 5 }}>Daily</Text>
              <AntDesign name="caretdown" color={Colors.blue} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={appImages.NoData}
                style={{ height: 300, width: 300, resizeMode: 'contain' }}
              />
              <Text style={{ marginVertical: 5 }}>
                No orders in this time period
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: 5,
            backgroundColor: Colors.white,
            padding: 10,
          }}>
          <Text>Distribution of your order</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Details from </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ color: Colors.blue, marginRight: 5 }}>
                24 Feb to 3 Mar 2021
              </Text>
              <AntDesign name="caretdown" color={Colors.blue} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={appImages.NoData}
              style={{ height: 300, width: 300, resizeMode: 'contain' }}
            />
            <Text style={{ marginVertical: 5 }}>
              No orders in this time period
            </Text>
          </View>
        </View>
      </ScrollView> */}
    </>
  );
};

export default TotalSalesScreen;

const styles = StyleSheet.create({
  deliveredOrderTrend__container: {
    backgroundColor: Colors.white,
    marginVertical: 5,
    padding: 10,
  },
});
