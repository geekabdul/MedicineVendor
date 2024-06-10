import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

const Thumb = ({name, value}) => {
  return (
    <View style={name === 'high' ? styles.rootHigh : styles.rootLow}>
      <View
        style={{
          backgroundColor: 'black',
          width: THUMB_RADIUS_LOW / 1,
          height: THUMB_RADIUS_LOW / 1,
          borderRadius: THUMB_RADIUS_LOW,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 1,
    backgroundColor: 'orange',
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
  },
});

export default memo(Thumb);
