import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../assets/colors';
import Fonts from '../../assets/fonts/Fonts';
import Button from '../../components/Button/Button';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import {appImages} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {APICall} from '../../helper/Helper';

const customerLatLong = {
  latitude: 26.924,
  longitude: 75.8267,
};
const MapScreen = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const MAX_DISTANCE_METERS = 500;
  const route = useRoute();
  const {data} = route.params;
  console.log(data.latitude, 'data for map');

  const [mLatLong, setMLatLong] = useState(null);
  const [isStart, setIsStart] = useState(false);
  // const [mapRegion, setMapRegion] = useState({
  //   latitude: customerLatLong.latitude,
  //   longitude: customerLatLong.longitude,
  //   latitudeDelta: 0.004,
  //   longitudeDelta: 0.004,
  // });
  // const [distance, setDistance] = useState(null);
  const [heading, setHeading] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        getCurrentLocation();
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  //FUNCTION FOR GET CURRENT LOCATION
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setMLatLong(position.coords);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        setMLatLong(position.coords);
        // console.log(position.coords.heading, 'kkkkkkkkkkkkkk');
        setHeading(position.coords.heading);
        updateCurrentLocation(position.coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Minimum distance for an update in meters
        interval: 5000, // Interval between updates in milliseconds
        fastestInterval: 2000, // Maximum time that can pass without an update in milliseconds
        heading: true,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  useEffect(() => {
    if ((mLatLong && heading !== null, isStart)) {
      const camera = {
        heading: heading,
        center: {
          latitude: mLatLong.latitude,
          longitude: mLatLong.longitude,
        },
      };

      mapRef.current.animateCamera(camera, {duration: 1000}); // Animate the camera with a duration of 1000ms
    }
  }, [mLatLong, heading, isStart]);

  // useEffect(() => {
  //   if (isStart && mLatLong) {
  //     setMapRegion({
  //       latitude: mLatLong.latitude,
  //       longitude: mLatLong.longitude,
  //       latitudeDelta: 0.004,
  //       longitudeDelta: 0.004,
  //     });

  //     const customerLocation = {
  //       latitude: customerLatLong.latitude,
  //       longitude: customerLatLong.longitude,
  //     };

  //     const userLocation = {
  //       latitude: mLatLong.latitude,
  //       longitude: mLatLong.longitude,
  //     };

  //     const distanceInMeters = haversine(customerLocation, userLocation) * 1000; // Convert to meters
  //     setDistance(distanceInMeters);
  //   }
  // }, [isStart, mLatLong]);

  const handleStart = () => {
    setIsStart(true);
    handleRegionChange();
    outForDelivery();
  };

  const handleRegionChange = () => {
    mapRef.current.animateToRegion(
      {
        latitude: mLatLong?.latitude,
        longitude: mLatLong?.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      },
      2000,
    ); // Duration in milliseconds
  };

  //API CALL

  const updateCurrentLocation = cords => {
    const param = {
      order_id: data['suborder-id'],
      lat: cords.latitude,
      long: cords.longitude,
      header: heading,
    };
    APICall(
      'post',
      'delivery-boys/current-location',
      param,
      onSuccessUpdateCurrentLocation,
      onFailUpdateCurrentLocation,
    );
  };

  const onSuccessUpdateCurrentLocation = res => {
    console.log(res, 'onSuccessUpdateCurrentLocation');
  };
  const onFailUpdateCurrentLocation = err => {
    console.log(err?.response?.data, 'onFailUpdateCurrentLocation');
  };

  const outForDelivery = () => {
    const param = {
      order_id: data['suborder-id'],
    };
    APICall(
      'post',
      'delivery-boys/out-for-delivery',
      param,
      onSuccessOutForDelivery,
      onFailOutForDelivery,
    );
  };

  const onSuccessOutForDelivery = res => {
    console.log(res, 'onSuccessOutForDelivery');
  };
  const onFailOutForDelivery = err => {
    console.log(err?.response?.data, 'onFailOutForDelivery');
  };

  if (!mLatLong) {
    return <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} />;
  }
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        style={{height: '70%', width: '100%'}}
        initialRegion={
          data.order_status == 6
            ? {
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }
            : {
                latitude: mLatLong.latitude,
                longitude: mLatLong.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }
        }>
        <Marker
          coordinate={{
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          }}
        />
        {mLatLong ? (
          <>
            <Marker
              coordinate={{
                latitude: mLatLong.latitude,
                longitude: mLatLong.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }}
              flat={true}
              anchor={{x: 0.5, y: 0.5}}
              rotation={heading ? heading : 0}>
              <Image source={appImages.bike} style={styles.mapMarker} />
            </Marker>

            <MapViewDirections
              origin={
                !!mLatLong
                  ? {
                      latitude: mLatLong.latitude,
                      longitude: mLatLong.longitude,
                    }
                  : {
                      latitude: Number(data.latitude),
                      longitude: Number(data.longitude),
                    }
              }
              destination={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
              apikey={'AIzaSyBmniloMXEznkrAL6k0VfoFsJJFAfcRBgg'} // insert your API Key here
              strokeWidth={4}
              strokeColor="blue"
              mode="WALKING" // Use the "walking" mode for better rotation
              optimizeWaypoints={true} // Optimize the direction line
              resetOnChange={false} // Prevent resetting the line on region changes
            />
          </>
        ) : null}
      </MapView>
      <View style={styles.orderItem}>
        <Text style={styles.orderText}>
          Order ID:
          <Text style={{color: Colors.grey}}>{data['suborder-id']}</Text>
        </Text>
        <Text style={styles.orderText}>
          Customer Name:{' '}
          <Text style={{color: Colors.grey}}> {data.customer_name}</Text>
        </Text>
        <Text style={styles.orderText}>
          Amount: <Text style={{color: Colors.grey}}>{data.amount}</Text>
        </Text>
        <Text style={styles.orderText}>
          Shipping Contact:{' '}
          <Text style={{color: Colors.grey}}>{data.address_mobile}</Text>
        </Text>
        <Text style={styles.orderText}>
          Address: <Text style={{color: Colors.grey}}>{data.address_name}</Text>
        </Text>

        {!isStart && data.order_status == 6 ? (
          <Button Width={'80%'} btnTxt={'Start'} submit={handleStart} />
        ) : (
          <Button
            Width={'80%'}
            btnTxt={'Reached'}
            submit={() => {
              navigation.navigate('VerifyOrderScreen', {data});
            }}
            // disabled={distance > MAX_DISTANCE_METERS}
          />
        )}
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: Colors.white,
    flex: 1,
    padding: 20,
  },
  orderText: {
    color: Colors.dark,
    fontSize: 16,
    marginBottom: 5,

    fontFamily: Fonts.Manrope600,
  },
  mapMarker: {width: 40, height: 40, resizeMode: 'contain'},
});
