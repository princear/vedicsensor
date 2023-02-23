import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Continue with phone</Text>

        <View style={{height: 350, width: '100%'}}>
          <LottieView
            autoplay={true}
            loop={true}
            source={assets.lottieFiles.usingMobile}
          />
        </View>

        <Text style={styles.infoText}>
          You’ll receive a 4 digit OTP to verify next
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={styles.input_small} value={'+91'} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Phone number"
          />
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.terms}>By continuing, you agree to our </Text>
          <Text style={styles.link}>Terms & conditions </Text>
          <Text style={styles.terms}>and </Text>
          <Text style={styles.link}>Privacy policy.</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button_blue_disabled}>
          <Text style={styles.button_blue_text_disabled}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {fontSize: 20, fontWeight: '700', marginBottom: 30, marginLeft: 20},
  terms: {fontSize: 10, fontWeight: '400', color: '#000000', marginTop: 6},
  link: {fontSize: 10, fontWeight: '400', color: '#3460D7', marginTop: 6},
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 14,
    marginBottom: 30,
    width: 200,
  },
  input_small: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderColor: '#3460D7',
    borderRadius: 4,
  },
  input: {
    padding: 10,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#3460D7',
    borderRadius: 4,
  },
  container: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  button_blue: {
    height: 40,
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#3460D7',
    justifyContent: 'center',
  },
  button_blue_disabled: {
    height: 40,
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(28, 27, 31, 0.12);',
    justifyContent: 'center',
  },
  button_blue_text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  button_blue_text_disabled: {
    color: '#1C1B1F',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
