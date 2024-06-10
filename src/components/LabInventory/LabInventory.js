import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import SelectOption from '../SelectOption/SelectOption';
import {APICall} from '../../helper/Helper';
import {Colors} from '../../assets/colors';
import InputField from '../InputField/InputField';
import CollectionTiming from '../CollectionTiming/CollectionTiming';
import MyMultiSelect from '../MyMultiSelect/MyMultiSelect';
import Button from '../Button/Button';
import Toast from 'react-native-simple-toast';

const collectionTypeData = [
  {label: 'Home Collection', value: 1},
  {label: 'Lab Collection', value: 2},
];
const LabInventory = () => {
  //LIST DATA STATE
  const [testListData, setTestListData] = useState(null);
  const [slotListData, setSlotListData] = useState(null);

  const [testName, setTestName] = useState(null);
  const [testAmout, setTestAmount] = useState(null);

  const [selectedCollectionType, setSelectedCollectionType] = useState([]);
  const [selectedHomeSlot, setSelectedHomeSlot] = useState([]);
  const [selectedLabSlot, setSelectedLabSlot] = useState([]);

  //functions

  //to get TestName  by id
  function getMrpById(id) {
    const item = testListData?.find(el => el.value === id);
    return item ? item.mrp : null;
  }
  //to get mrp  by id
  function getTestNameById(id) {
    const item = testListData?.find(el => el.value === id);
    return item ? item.label : null;
  }

  //GET TEST LIST
  const getTestList = async () => {
    APICall('get', 'test-list', {}, getTestListSuccess, getTestListFail);
  };
  const getTestListSuccess = res => {
    // console.log(res?.result, 'TestList fetch successful');
    const modifiedData = res?.result
      ? res.result.map(item => ({
          value: item.id,
          label: item.name,
          mrp: item.mrp,
        }))
      : [];
    setTestListData(modifiedData);
  };
  const getTestListFail = error => {
    console.log(error.response.data, 'Error fetching TestList');
  };
  //GET SLOT LIST
  const getSlotList = async () => {
    APICall('get', 'slot-list', {}, getSlotListSuccess, getSlotListFail);
  };
  const getSlotListSuccess = res => {
    // console.log(res?.data, 'SlotList fetch successful');
    const modifiedData = res?.data
      ? res.data.map(item => ({
          value: item.slot_id,
          label: item.timing,
        }))
      : [];
    setSlotListData(modifiedData);
  };
  const getSlotListFail = error => {
    console.log(error.response.data, 'Error fetching SlotList');
  };
  //ADD TEST
  const addTest = async () => {
    const param = {
      id: testName,
      testname: getTestNameById(testName),
      mrp: getMrpById(testName),
      price: testAmout,
      collection_type: collection,
    };
    console.log(param, 'param');
    APICall('post', 'add-test', param, addTestSuccess, addTestFail);
  };
  const addTestSuccess = res => {
    console.log(res?.message, 'add test successful');
    Toast.show(res?.message);
    setTestName(null);
    setTestAmount(null);
    setSelectedCollectionType([]);
    setSelectedHomeSlot([]);
    setSelectedLabSlot([]);
  };
  const addTestFail = error => {
    console.log(error.response.data, 'Error add test');
  };

  useEffect(() => {
    getTestList();
    getSlotList();
  }, []);

  const hasHome = selectedCollectionType.some(item => item.value === 1);
  const hasLab = selectedCollectionType.some(item => item.value === 2);

  const collection = {};

  selectedCollectionType.forEach(item1 => {
    collection[item1.value] = {};

    const slots = item1.value === 1 ? selectedHomeSlot : selectedLabSlot;

    slots.forEach(item2 => {
      collection[item1.value][item2.value] = item2.number;
    });
  });

  // const collection = selectedCollectionType.reduce((acc, item1) => {
  //   const slots = item1.value === 1 ? selectedHomeSlot : selectedLabSlot;
  //   acc[item1.value] = slots.reduce((obj, item2) => {
  //     obj[item2.value] = item2.number;
  //     return obj;
  //   }, {});
  //   return acc;
  // }, {});

  // console.log(collection, 'oooooooooooooooooo');

  // console.log(selectedCollectionType, 'selectedCollectionType');
  // console.log(selectedHomeSlot, 'selectedHomeSlot');
  // console.log(selectedLabSlot, 'selectedLabSlot');

  return (
    <>
      <Header headerTitle={'Inventory'} showSearch={true} />
      {testListData == null && slotListData == null ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          {testListData?.length > 0 && (
            <SelectOption
              label={'Test Name'}
              data={testListData}
              value={testName}
              setValue={setTestName}
            />
          )}
          <InputField
            label={'MRP(in Rs)'}
            placeholder={'Mrp'}
            value={getMrpById(testName)}
            isEditable={false}
          />
          <InputField
            label={'Amount(in Rs)'}
            placeholder={'Amount'}
            value={testAmout}
            setValue={setTestAmount}
            keyboardType={'numeric'}
          />
          <View>
            <MyMultiSelect
              label={'Collection Type'}
              data={collectionTypeData}
              value={selectedCollectionType}
              setValue={setSelectedCollectionType}
            />
          </View>

          {/* <SelectMultiOption
              label={'Collection Type'}
              data={collectionTypeData}
              value={selectedCollectionType}
              setValue={setSelectedCollectionType}
            /> */}

          {hasHome && (
            <View>
              <CollectionTiming
                label={'Home Collection Timing'}
                optionData={slotListData}
                optionValue={selectedHomeSlot}
                optionSetValue={setSelectedHomeSlot}
              />
            </View>
          )}
          {hasLab && (
            <View>
              <CollectionTiming
                label={'Lab Collection Timing'}
                optionData={slotListData}
                optionValue={selectedLabSlot}
                optionSetValue={setSelectedLabSlot}
              />
            </View>
          )}

          <View>
            <Button btnTxt={'Add Test'} Width={'100%'} submit={addTest} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default LabInventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
});
