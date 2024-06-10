import {
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Colors } from '../../assets/colors';
import { APICall } from '../../helper/Helper';
import MedicineInventoryCard from '../MedicineInventoryCard/MedicineInventoryCard';
import ProductInventoryCard from '../ProductInventoryCard/ProductInventoryCard';
import Header from '../Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectOption from '../SelectOption/SelectOption';
import Button from '../Button/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
// import * as XLSX from 'xlsx';
// import RNFS from 'react-native-fs';

const tabsData = ['Product', 'Medicine'];

const catData = [
  { label: 'Baby Product', value: '1' },
  { label: 'Beauty Product', value: '2' },
  { label: 'Supplementary Products', value: '3' },
  { label: 'Medical Devices', value: '4' },
];
const sortData = [
  { label: 'Ascending Order', value: '1' },
  { label: 'Descending Order', value: '2' },
];
const stockData = [
  { label: 'inStock', value: '1' },
  { label: 'out of stock', value: '2' },
];

const NoDataComponent = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No data available</Text>
    </View>
  );
};
const StoreInventory = () => {
  const flatListRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState('Product');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  //filter state
  const [search, setSearch] = useState('');
  const [salt_name, setSalt_name] = useState('');
  const [category, setCategory] = useState(null);
  const [sort_by, setSort_by] = useState(null);
  const [in_stock, setIn_stock] = useState('');
  const [page, setPage] = useState(1);

  const renderInventoryItem = ({ item }) => {
    return selectedTab === 'Product' ? (
      <ProductInventoryCard data={item} />
    ) : (
      <MedicineInventoryCard data={item} />
    );
  };

  const handleSearch = val => {
    setSearch(val);
    if (selectedTab === 'Product') {
      getProductInventory();
    } else if (selectedTab === 'Medicine') {
      getMedicineInventory();
    }
  };

  const handleApplyFilter = () => {
    setPage(1);
    setHasMoreData(true);
    if (selectedTab === 'Product') {
      getProductInventory();
    } else if (selectedTab === 'Medicine') {
      getMedicineInventory();
    }
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setCategory(null);
    setIn_stock(null);
    setSort_by(null);
    setSalt_name('');
  };

  const loadMoreData = () => {
    if (hasMoreData) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx], // Specify the types of files you want to allow (e.g., Excel files)
      });
      const formData = new FormData();
      formData.append('excel_file', {
        uri: res[0].uri,
        name: res[0].name,
        type: res[0].type,
      });
      importProductMedicine(formData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
        console.log('User canceled the picker');
      } else {
        // Error occurred
        console.log('Error occurred: ', err);
      }
    }
  };

  const handlExport = () => {
    openURL();
  };
  const openURL = async () => {
    let endpoint =
      selectedTab === 'Product' ? 'export-products' : 'export-medicines';
    let url = `http://143.110.244.110/medicine-app/api/${endpoint}?vendor_id=${userDetails?.basic_details?.id}`;
    try {
      const supported = await Linking.openURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  //API CALL
  // GET PRODUCT
  const getProductInventory = async () => {
    setLoading(true);
    const productqueryParams = {
      search,
      category,
      sort_by,
      in_stock,
      page,
    };
    APICall(
      'get',
      'product-inventory',
      productqueryParams,
      onSuccessProductInventory,
      onFailureProductInventory,
    );
  };

  const onSuccessProductInventory = res => {
    if (res?.result.length === 0) {
      setHasMoreData(false);
    }
    if (page == 1) {
      setProductData(res?.result);
    } else {
      setProductData(prev => [...prev, ...res?.result]);
    }
    setLoading(false);
  };
  const onFailureProductInventory = err => {
    setLoading(false);
  };

  // GET MEDICINE
  const getMedicineInventory = async () => {
    setLoading(true);
    const medicinequeryParams = {
      search,
      salt_name,
      sort_by,
      in_stock,
      page,
    };

    APICall(
      'get',
      'medicine-inventory',
      medicinequeryParams,
      onSuccessMedicineInventory,
      onFailureMedicineInventory,
      true,
    );
  };

  const onSuccessMedicineInventory = res => {
    if (res?.result?.length === 0) {
      setHasMoreData(false);
    }
    if (page == 1) {
      setMedicineData(res?.result);
    } else {
      setMedicineData(prev => [...prev, ...res?.result]);
    }

    setLoading(false);
  };
  const onFailureMedicineInventory = err => {
    setLoading(false);
  };

  //GET PROFILE

  const getProfile = async () => {
    APICall('get', 'user-profile', {}, getProfileSuccess, getProfileFail);
  };

  const getProfileSuccess = res => {
    setUserDetails(res?.result || null);
  };

  const getProfileFail = error => {
  };

  // IMPORT PRODUCT/MEDICINE API

  const importProductMedicine = async fileUri => {
    const endPoint =
      selectedTab === 'Product' ? 'import-products' : 'import-medicines';
    APICall('post', endPoint, fileUri, onImportSuccess, onImportError, true);
  };
  const onImportSuccess = res => {
    Toast.show(res.message);
  };
  const onImportError = err => {
    Toast.show(err.response.data.message);
  };

  useEffect(() => {
    getProfile();
    if (selectedTab === 'Product') {
      getProductInventory();
    } else if (selectedTab === 'Medicine') {
      getMedicineInventory();
    }
  }, [selectedTab, page]);

  return (
    <>
      <Header headerTitle={'Inventory'} />
      <View style={styles.container}>
        <View activeOpacity={0.9} style={styles.searchContainer}>
          <FontAwesome name="search" color={Colors.primarycolor} size={20} />
          <TextInput
            style={styles.searchText}
            placeholder="Search"
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        <View style={styles.top__container}>
          <View style={styles.tabs_mainContainer}>
            {tabsData?.map((tab, id) => (
              <TouchableOpacity
                key={id}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      selectedTab === tab ? Colors.lightPrimary : Colors.white,
                  },
                ]}
                onPress={() => {
                  setSelectedTab(tab);
                  scrollToTop();
                  setCategory(null);
                  setIn_stock(null);
                  setSort_by(null);
                  setSalt_name('');
                  setSearch('');
                  setPage(1);
                  setHasMoreData(true);
                }}>
                <Text
                  style={{
                    color: selectedTab === tab ? 'black' : Colors.grey,
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="filter" size={24} color={Colors.primarycolor} />
            <Text style={{ color: Colors.primarycolor }}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <>
            <Button
              btnTxt={`Import ${selectedTab}`}
              customStyle={{ paddingHorizontal: 10 }}
              submit={pickDocument}
            />
            <Button
              btnTxt={`Export ${selectedTab}`}
              customStyle={{ paddingHorizontal: 10 }}
              submit={handlExport}
            />
          </>
        </View>

        <FlatList
          ref={flatListRef} // Set ref
          data={selectedTab === 'Product' ? productData : medicineData}
          renderItem={renderInventoryItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onEndReachedThreshold={0.1}
          // onResponderEnd={loadMoreData}
          onEndReached={loadMoreData}
          // onMomentumScrollEnd={loadMoreData}
          ListEmptyComponent={<NoDataComponent />}
        />
        <View>{loading ? <ActivityIndicator /> : null}</View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => {
          setShowFilterModal(!showFilterModal);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52,52,52,0.8)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flex: 1 / 2,
              backgroundColor: Colors.white,
              padding: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => setShowFilterModal(false)}>
              <AntDesign name="close" size={20} />
            </TouchableOpacity>

            <View>
              <Text style={{ color: Colors.primarycolor }}>Filter</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              {selectedTab === 'Product' ? (
                <SelectOption
                  label={'Category'}
                  data={catData}
                  value={category}
                  setValue={setCategory}
                />
              ) : null}
              <SelectOption
                label={'Sort By'}
                data={sortData}
                value={sort_by}
                setValue={setSort_by}
              />
              <SelectOption
                label={'Stock'}
                data={stockData}
                value={in_stock}
                setValue={setIn_stock}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:
                  category || sort_by || in_stock ? 'space-between' : 'center',
                position: 'absolute',
                bottom: 10,
                left: 20,
                width: '100%',
              }}>
              <Button
                btnTxt={'Apply'}
                Width={'45%'}
                submit={handleApplyFilter}
              />
              {category || sort_by || in_stock ? (
                <Button
                  btnTxt={'Reset'}
                  Width={'45%'}
                  submit={handleResetFilter}
                />
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default StoreInventory;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: Colors.white,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 7,
    backgroundColor: 'white',
  },
  searchText: {
    width: '95%',
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 15,
    justifyContent: 'center',
    color: Colors.primarycolor,
  },
  top__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  tabs_mainContainer: {
    backgroundColor: Colors.white,

    flexDirection: 'row',
  },
  tab: {
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderColor: Colors.grey,
  },
  horizontalLine: {
    backgroundColor: Colors.lightgrey,
    height: 1,
    width: '100%',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: Colors.primarycolor,
  },
});
