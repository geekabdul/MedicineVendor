import {StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../components/BackHeader/BackHeader';
import {APICall} from '../../helper/Helper';

const HealthReportsScreen = () => {
  const [healthReportData, setHealthReportsData] = useState(null);

  const getHealthReports = async () => {
    APICall(
      'get',
      'health-reports',
      {},
      gethealthReportsSuccess,
      gethealthReportsFail,
    );
  };

  const gethealthReportsSuccess = res => {
    console.log(res?.data, 'gethealthReportssuccessful');
    setHealthReportsData(res?.data);
  };

  const gethealthReportsFail = error => {
    console.log(error.response.data, 'Error gethealthReports');
  };

  useEffect(() => {
    getHealthReports();
  }, []);
  return (
    <>
      <BackHeader headerTitle="Health Reports" />
      <Text>HealthReportsScreen</Text>
    </>
  );
};

export default HealthReportsScreen;

const styles = StyleSheet.create({});
