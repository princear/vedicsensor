import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../utils/permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';

const Map = props => {
  const {height, markerLatLng, setMarkerLatLng, region, setRegion} = props;
  const {width} = Dimensions.get('window');

  const getCurrentLocation = () => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        // latitude: 28.679079,
        // longitude: 77.06971,
        setMarkerLatLng({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.map_container}>
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={{position: 'absolute', bottom: 40, right: 24, zIndex: 2}}>
        <MaterialIcons name="my-location" size={20} color="#3460D7" />
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        styles={{
          container: styles.search_container,
          textInput: styles.text_input,
        }}
        fetchDetails={true}
        placeholder="Search"
        onPress={(data, details = null) => {
          setMarkerLatLng({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
          });
          setRegion({
            ...region,
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
          });
        }}
        query={{
          key: GOOGLE_MAP_API_KEY,
          language: 'en',
        }}
      />

      <MapView
        style={{height, width, zIndex: -1}}
        region={region}
        onRegionChange={e => {
          setMarkerLatLng({
            latitude: e.latitude,
            longitude: e.longitude,
          });
        }}>
        <Marker coordinate={markerLatLng} />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map_container: {
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  search_container: {
    position: 'absolute',
    bottom: 16,
    width: '98%',
    padding: 8,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 12,
  },
  text_input: {borderWidth: 1, borderColor: '#dfdfdf', paddingRight: 40},
});
