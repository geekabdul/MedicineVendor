import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Switch } from 'react-native-switch';
import { Colors } from '../../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../../assets/fonts/Fonts';

const Header = ({
  toggleSwitch,
  isEnabled,
  headerTitle,
  // showSearch = false,
  // inputValue,
  // setInputValue,
  // handleSearch,
}) => {
  const navigation = useNavigation();
  const [showTextInput, setShowTextInput] = useState(false);
  return (
    <>
      <View style={styles.container}>
        {headerTitle ? (
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        ) : (
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            disabled={false}
            circleSize={22}
            activeText={'Online'}
            inActiveText={'Offline'}
            barHeight={30}
            backgroundActive={Colors.LIGHT_GREEN}
            backgroundInactive={Colors.red}
            circleActiveColor={Colors.white}
            circleInActiveColor={Colors.white}
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
            renderActiveText={true}
            renderInActiveText={true}
            switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={3.6} // multiplied by the `circleSize` prop to calculate total width of the Switch
            switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            circleBorderActiveColor={'white'}
            circleBorderInactiveColor={'white'}
            activeTextStyle={{ fontFamily: Fonts.Manrope600 }}
            inactiveTextStyle={{ fontFamily: Fonts.Manrope600 }}
          />
        )}
        <View style={styles.headerRight__container}>
          <View onTouchEnd={() => navigation.navigate('Notification')}>
            <Feather name={'bell'} size={20} color={'black'} />
          </View>
          {/* <View
            style={{marginLeft: 15}}
            onTouchEnd={() => {
              navigation.navigate('Settings');
            }}>
            <Feather name={'menu'} size={20} color={'black'} />
          </View> */}
        </View>
      </View>
    </>
  );
};

export default Header;

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 10,
    height: 50,
    width: '100%',
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
    fontFamily: Fonts.Manrope600,
  },
  headerRight__container: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});
