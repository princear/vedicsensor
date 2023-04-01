import React, {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../utils/permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';

const Map = props => {
  const {height, markerLatLng, setMarkerLatLng, region, setRegion, setAddress} =
    props;
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

  const getAddress = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAP_API_KEY}&address=` +
        `${markerLatLng.latitude}` +
        ',' +
        `${markerLatLng.longitude}`,
    )
      .then(res => res.json())
      .then(response => {
        const city = getCityName(response) + ', ';
        const state = getStateName(response) + ' ';
        const country = getCountryName(response);

        setAddress({city, state, country});
      });
  };

  const getCityName = data => {
    const cityComponent = data.results[0].address_components.find(component => {
      return component.types.includes('locality');
    });
    const city = cityComponent ? cityComponent.long_name : '';
    return city;
  };

  const getStateName = data => {
    const stateComponent = data.results[0].address_components.find(
      component => {
        return component.types.includes('administrative_area_level_1');
      },
    );
    const state = stateComponent ? stateComponent.long_name : '';

    return state;
  };

  const getCountryName = data => {
    const countryComponent = data.results[0].address_components.find(
      component => {
        return component.types.includes('country');
      },
    );

    const country = countryComponent ? countryComponent.long_name : '';

    return country;
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <View style={styles.map_container}>
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={{position: 'absolute', bottom: 52, right: 24, zIndex: 10}}>
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

      <MaterialIcons
        name="location-pin"
        size={50}
        color="#DC1D23"
        style={{position: 'absolute', top: '42.5%', zIndex: 1}}
      />
      <MapView
        style={{height, width, zIndex: -1}}
        region={region}
        onRegionChange={e => {
          setMarkerLatLng({
            latitude: e.latitude,
            longitude: e.longitude,
          });
        }}
        onRegionChangeComplete={() => {
          getAddress();
        }}>
        {/* <Marker coordinate={markerLatLng} /> */}
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
    bottom: 30,
    width: '94%',
    padding: 8,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 12,
    zIndex: 10,
  },
  text_input: {
    borderWidth: 1,
    borderColor: '#dfdfdf',
    paddingRight: 40,
    zIndex: 10,
  },
});
