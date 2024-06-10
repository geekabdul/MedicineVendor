import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Route from './src/navigation/route/Route';
import { LogBox, Platform } from 'react-native';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/notificationHelper';
import PushNotification from 'react-native-push-notification';
import SliderComp from './Sliders/SliderComp';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
    requestUserPermission();
    notificationListener();
  }, []);
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('APP is open', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });
  return (
    <>
      <Route />
      {/* <SliderComp /> */}
    </>
  );
};

export default App;
