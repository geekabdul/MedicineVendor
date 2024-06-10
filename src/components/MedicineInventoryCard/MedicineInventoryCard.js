import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../assets/colors';
import {Switch} from 'react-native-switch';

const MedicineInventoryCard = ({data}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    if (data?.seller_stock > 0) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderColor: 'lightgrey',
      }}>
      <View>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png',
          }}
          style={{height: 80, width: 80}}
        />
      </View>
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.titleRateText} numberOfLines={1}>
          {data?.medicine_name}
        </Text>
        <Text style={styles.titleRateText}>₹99</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            disabled={false}
            circleSize={20}
            activeText={''}
            inActiveText={''}
            barHeight={15}
            backgroundActive={Colors.lightgrey}
            backgroundInactive={Colors.lightgrey}
            circleActiveColor={Colors.green}
            circleInActiveColor={Colors.grey}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}} // style for inner animated circle for what you (may) be rendering inside the circle
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={2.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={2.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            circleBorderActiveColor={Colors.green}
            circleBorderInactiveColor={Colors.grey}
          />
          <Text style={{marginLeft: 10}}>out of Stock</Text>
        </View>
      </View>
    </View>
  );
};

export default MedicineInventoryCard;

const styles = StyleSheet.create({
  titleRateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});
