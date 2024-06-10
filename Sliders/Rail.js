import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const Rail = ({min, max, high, low}) => {
  const step = 0.5; // Set your desired step
  const breakpoints = [];
  for (let i = min; i <= max; i += step) {
    breakpoints.push(i);
  }
  return (
    <View style={styles.root}>
      {breakpoints.map((breakpoint, index) => {
        console.log(breakpoints[index] < low, breakpoint);
        return (
          <View
            key={index}
            style={[
              styles.breakpoint,
              {opacity: breakpoints[index] < low ? 0 : 1},
            ]}
          />
        );
      })}
    </View>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 2,
    backgroundColor: '#C7C7C7',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  breakpoint: {
    height: 8,
    width: 8,
    backgroundColor: '#C7C7C7',
    borderRadius: 99,
  },
});
