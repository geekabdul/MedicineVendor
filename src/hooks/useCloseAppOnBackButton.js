import {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';

const useCloseAppOnBackButton = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true; // Return true to prevent default behavior (navigation back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default useCloseAppOnBackButton;
