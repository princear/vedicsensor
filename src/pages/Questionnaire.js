import React, {useState} from 'react';
import SittingSvg from '../../assets/sitting.svg';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

const Questionnaire = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.blue_curve}>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: 'white', fontWeight: '600', fontFamily: 'poppins'}}>
            Physical Activity
          </Text>
          <TouchableOpacity style={{position: 'absolute', right: 10}}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 24, marginBottom: 60}}>
          <Text>Progress bar</Text>
        </View>
        <View style={{width: '50%'}}>
          <Text style={styles.question}>
            How many hours a day do you spend sitting?
          </Text>
          <Text style={styles.info}>
            (such as gardening, house cleaning etc)
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <SittingSvg style={styles.svg} width={200} height={150} />
      </View>
      <View style={styles.bottom_buttons}>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name="chevron-left" size={28} color="black" />
          <Text style={{color: '#1C1B1F', fontWeight: '500'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#1C1B1F', fontWeight: '500'}}>Next</Text>
          <MaterialIcons name="chevron-right" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const PurpleUi = () => {
  const [value, setValue] = useState(0);

  const renderValue = () => {
    if (value == 0) return 0;
    else if (value == 1) return 'low';
    else if (value == 2) return 'medium';
    else if (value == 3) return 'high';
  };
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
              maximumValue={3}
              step={1}
              thumbTintColor="#3460D7"
              minimumTrackTintColor="rgba(52, 96, 215, 0.5)"
              maximumTrackTintColor="#E6EAF3"
              value={value}
              onValueChange={val => setValue(val)}
            />
            <Text style={styles.zero}>0</Text>
            <Text style={styles.low}>Low</Text>
            <Text style={styles.medium}>Medium</Text>
            <Text style={styles.high}>High</Text>
          </View>

          <TouchableOpacity style={styles.option}>
            <Text style={{fontSize: 12, fontWeight: '500', color: '#ffffff'}}>
              I usually have {renderValue()} skin dryness.
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
  blue_curve: {
    width: '120%',
    height: 300,
    backgroundColor: '#3259CB',
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    alignItems: 'center',
    paddingTop: 30,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'poppins',
    textAlign: 'center',
  },
  info: {
    marginTop: 20,
    fontWeight: '500',
    color: '#FDC72E',
    fontFamily: 'poppins',
    textAlign: 'center',
  },
  content: {
    position: 'relative',
    //  backgroundColor: 'lightpink',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  svg: {marginTop: 40},
  bottom_buttons: {
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

// styles for purple UI
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   arrow_back: {
//     color: '#FFFFFF',
//     fontSize: 24,
//   },
//   btn: {
//     height: 40,
//     width: '100%',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 50,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//   },
//   btn_text: {textAlign: 'center', color: '#6D56A1', fontWeight: '500'},
//   btn_disabled: {},
//   btn_text_disabled: {},
//   ques_container: {
//     marginTop: 40,
//     height: 50,
//     width: 50,
//     borderWidth: 4,
//     borderRadius: 100,
//     borderColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ques_no: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   heading: {
//     width: 300,
//     marginTop: 30,
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   subHeading: {
//     color: '#D3A9BD',
//     marginTop: 20,
//     fontSize: 15,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   option: {
//     width: '100%',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.5)',
//   },
//   zero: {
//     fontWeight: '500',
//     color: '#ffffff',
//     position: 'absolute',
//     left: 16,
//     bottom: -20,
//   },
//   low: {
//     fontWeight: '500',
//     color: '#ffffff',
//     position: 'absolute',
//     left: 125,
//     bottom: -20,
//   },
//   medium: {
//     fontWeight: '500',
//     color: '#ffffff',
//     position: 'absolute',
//     right: 110,
//     bottom: -20,
//   },
//   high: {
//     fontWeight: '500',
//     color: '#ffffff',
//     position: 'absolute',
//     right: 5,
//     bottom: -20,
//   },
// });

export default Questionnaire;
