import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {ScrollView} from 'react-native';
import Slider from 'rn-range-slider';
import Rail from './Rail';
import Thumb from './Thumb';
import RailSelected from './RailSelected';
import Label from './Label';

const SliderComp = () => {
  const [min, setMin] = useState(5);
  const [max, setMax] = useState(6.5);
  const [low, setLow] = useState(min);
  const [high, setHigh] = useState(max);

  const renderThumb = useCallback(
    (name, value) => <Thumb name={name} value={value} />,

    [],
  );
  const renderRail = useCallback(
    () => <Rail min={min} max={max} high={high} low={low} />,
    [min, low, high, max],
  );
  const renderRailSelected = useCallback(
    () => <RailSelected min={min} low={low} max={max} />,
    [min, low, max],
  );
  // const renderLabel = useCallback(value => <Label text={value} />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  const step = 0.5; // Set your desired step
  const breakpoints = [];
  for (let i = min; i <= max; i += step) {
    breakpoints.push(i);
  }
  return (
    <View style={styles.root}>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={step}
        disableRange={true}
        floatingLabel={true}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        onValueChanged={handleValueChange}
      />
      <View style={styles.horizontalContainer}>
        {breakpoints.map((point, index) => (
          <Text key={index} style={styles.valueText}>
            +{point}Pts
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SliderComp;

const styles = StyleSheet.create({
  root: {
    padding: 12,
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    fontSize: 12,
  },
});
