import {StyleSheet} from 'react-native';
import {Colors} from '../../../assets/colors';
import Fonts from '../../../assets/fonts/Fonts';
// import {Colors} from '../../assets/Color';
// import Fonts from '../../assets/fonts/Fonts';
export default StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    paddingTop: '15%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.Manrope700,
    color: 'black',
    marginTop: '5%',
    paddingBottom: 2,
    alignSelf: 'center',
  },
  details: {
    fontSize: 14,
    fontFamily: Fonts.Manrope400,
    color: 'grey',
  },
  heading: {
    fontSize: 12,
    fontFamily: Fonts.Manrope800,
    color: Colors.primarycolor,
    marginTop: 15,
  },
  numberText: {
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
    color: 'black',
    fontFamily: Fonts.Poppins600,
    borderLeftWidth: 1,
    borderColor: 'lightgrey',
    width: '85%',
  },
  numberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  codeText: {
    fontSize: 14,
    fontFamily: Fonts.Poppins600,
    paddingRight: 10,
    color: 'black',
  },
  versionText: {
    fontSize: 12,
    fontFamily: Fonts.Manrope600,
    textAlign: 'center',
    marginVertical: 10,
  },
  policiesText: {
    fontSize: 12,
    fontFamily: Fonts.Manrope500,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 35,
  },
});
