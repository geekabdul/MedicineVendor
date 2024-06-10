import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

const RailSelected = ({min, low, max}) => {
  const step = 0.5; // Set your desired step
  const breakpoints = [];
  for (let i = min; i <= low; i += step) {
    breakpoints.push(i);
  }

  return (
    <View style={styles.root}>
      {breakpoints.map((breakpoint, index) => (
        <View key={index} style={styles.breakpoint} />
      ))}
    </View>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakpoint: {
    height: 8,
    width: 8,
    backgroundColor: 'black',
    borderRadius: 99,
  },
});
