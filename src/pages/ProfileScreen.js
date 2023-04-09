import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import MyText from '../components/MyText';
import assets from '../../assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.arrow_back}
        onPress={() => navigation.navigate('Health')}>
        <MaterialIcons name="arrow-back" color="#1C1B1F" size={24} />
      </TouchableOpacity>
      <MyText style={{marginTop: 20}}>Profile Page</MyText>
      <TouchableOpacity
        onPress={() => navigation.navigate('LocateMe')}
        style={{
          marginTop: 10,
          backgroundColor: '#3259CB',
          width: 100,
          padding: 8,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText style={{color: '#ffffff'}}>Book a test</MyText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  arrow_back: {
    width: 30,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  empty_screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  empty_heading: {
    fontWeight: '700',
    fontSize: 18,
    color: '#323232',
    marginTop: -20,
    marginBottom: 10,
  },
  empty_subheading: {
    fontWeight: '300',
    fontSize: 14,
    color: '#323232',
    textAlign: 'center',
    width: '70%',
  },
});
