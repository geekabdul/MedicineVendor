import {StyleSheet} from 'react-native';
import Fonts from '../../../assets/fonts/Fonts';
import {Colors} from '../../../assets/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.Poppins700,
    alignSelf: 'center',
    color: Colors.primarycolor,
    marginTop: 35,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  title1: {
    fontSize: 14,
    fontFamily: Fonts.Manrope600,
    alignSelf: 'center',
  },
  title3: {
    marginTop: 27,
    fontSize: 17,
    fontFamily: Fonts.Poppins600,
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title4: {
    fontSize: 14,
    fontFamily: Fonts.Manrope600,
    marginVertical: 15,
  },
});
