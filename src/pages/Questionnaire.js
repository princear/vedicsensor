import React from 'react';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

const Questionnaire = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#C65267', '#B05376', '#9B5483', '#805696', '#6F57A2']}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <MaterialIcons name="arrow-back" style={styles.arrow_back} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.ques_container}>
            <Text style={styles.ques_no}>1</Text>
          </View>
          <Text style={styles.heading}>
            My skin remains rough most of the time.
          </Text>
          <Text style={styles.subHeading}>
            Questionnaire subheading extra info
          </Text>
          <View style={{position: 'relative', marginTop: 30, marginBottom: 60}}>
            <Slider
              style={{width: 400, height: 40, marginTop: 20}}
              minimumValue={0}
              maximumValue={4}
              step={1}
              minimumTrackTintColor="rgba(52, 96, 215, 0.5)"
              maximumTrackTintColor="#E6EAF3"
            />
          </View>

          <TouchableOpacity style={styles.option}>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#ffffff'}}>
              I usually have 0 skin dryness.
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btn_text}>Done</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  arrow_back: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  btn: {
    height: 40,
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  btn_text: {textAlign: 'center', color: '#6D56A1', fontWeight: '500'},
  btn_disabled: {},
  btn_text_disabled: {},
  ques_container: {
    marginTop: 40,
    height: 50,
    width: 50,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ques_no: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  heading: {
    width: 300,
    marginTop: 30,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  subHeading: {
    color: '#D3A9BD',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  option: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Questionnaire;
