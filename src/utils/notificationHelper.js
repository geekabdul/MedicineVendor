import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}
async function getFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('FCMToken==>', fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('FCMToken==>', fcmtoken);
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error, 'errorinfcmtoken');
    }
  }
}
export const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('remoteMessageremoteMessageremoteMessage', remoteMessage);
    if (Platform.OS == 'android') {
      PushNotification.localNotification({
        channelId: 'channel-id',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        data: remoteMessage.data,
      });
    } else {
      // PushNotificationIOS.addNotificationRequest({
      //     message: remoteMessage.notification.body,
      //     title: remoteMessage.notification.title,
      //     bigPictureUrl: remoteMessage.notification.android.imageUrl,
      //     smallIcon: remoteMessage.notification.android.imageUrl,
      //     data: remoteMessage.data,
      // });
    }
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Open from background', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('APP are in quit', remoteMessage);
    });
};
