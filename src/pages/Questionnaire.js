import React, {useEffect, useState} from 'react';
import SittingSvg from '../../assets/sitting.svg';
import WalkingDog from '../../assets/walking_my_dog.svg';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const ques = [
  {
    answered: false,
    bgColor: '#3259CB',
    question: 'How many hours a day do you spend sitting?',
    helperText: 'Like sitting on a chair etc',
    svg: <SittingSvg width={'100%'} height={'100%'} />, // or svg_url
    type: 'slider',
    min: {value: 0, label: '< 2 Hours'},
    max: {value: 4, label: '5+ Hours'},
    values: [
      'Less than 2 hours',
      '2-3 Hours',
      '3-4 Hours',
      '4-5 Hours',
      '5 Hours +',
    ],
  },
  {
    answered: false,
    bgColor: '#087C53',
    question: 'How much physical activity is required by your job?',
    helperText: 'Like gym or cycling',
    svg: <WalkingDog width={'100%'} height={'100%'} />, // or svg_url
    type: 'slider',
    min: {value: 0, label: 'Not much'},
    max: {value: 4, label: 'Intense'},
    values: ['Not much', 'Moderate', 'Average', 'Intense', 'Very intense'],
  },
];

const ans = [
  {
    question: 'How many hours a day do you spend sitting?',
    answer: '3-4 Hours',
    valueIndex: 1,
  },
  {
    question: 'How much physical activity is required by your job?',
    answer: 'Intense',
    valueIndex: 2,
  },
];

const Questionnaire = ({navigation}) => {
  const [answers, setAnswers] = useState(ans);
  const [questions, setQuestions] = useState(ques);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [sliderValue, setSliderValue] = useState(0);
  const offset = useSharedValue(0.8);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(offset.value)}],
    };
  });

  useEffect(() => {
    if (answers[questionIndex].valueIndex == 0) offset.value = 0.8;
    else if (answers[questionIndex].valueIndex == 1) offset.value = 1.3;
    else if (answers[questionIndex].valueIndex == 2) offset.value = 1.8;
    else if (answers[questionIndex].valueIndex == 3) offset.value = 2.3;
    else if (answers[questionIndex].valueIndex == 4) offset.value = 2.8;
  }, [answers[questionIndex].valueIndex]);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View
        style={[
          styles.blue_curve,
          {backgroundColor: questions[questionIndex].bgColor},
        ]}>
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
          {/* <Text>Progress bar</Text> */}
        </View>
        <View style={{width: '50%'}}>
          <Text style={styles.question}>
            {questions[questionIndex].question}
          </Text>
          <Text style={styles.info}>
            {questions[questionIndex]?.helperText}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Animated.View style={[{width: 100, height: 100}, animatedStyles]}>
          {/* <SittingSvg width={'100%'} height={'100%'} /> */}
          {questions[questionIndex]?.svg}
        </Animated.View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 80}}>
          <Text
            style={{
              color: '#3259CB',
              fontWeight: '700',
              fontFamily: 'Poppins',
            }}>
            {questions[questionIndex]?.values[sliderValue]}
          </Text>
          <View style={{width: '80%', alignItems: 'center'}}>
            <Slider
              style={{width: '80%'}}
              step={1}
              minimumValue={questions[questionIndex]?.min?.value}
              maximumValue={4}
              value={answers[questionIndex]?.valueIndex}
              onValueChange={val => {
                setAnswers(
                  answers.map(item =>
                    item.question === questions[questionIndex].question
                      ? {...item, valueIndex: val}
                      : item,
                  ),
                );
                //   setAnswers([{...answers, answers[questionIndex]["valueIndex"]: val}])
                //   setAnswers([...answers, answers[questionIndex].valueIndex: val]);
              }}
              thumbTintColor="#67160F"
              minimumTrackTintColor="#F94F41"
              maximumTrackTintColor="#67160F"
            />
            <Text style={styles.label_left}>
              {questions[questionIndex]?.min?.label}
            </Text>
            <Text style={styles.label_right}>
              {questions[questionIndex]?.max?.label}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.bottom_buttons,
          {justifyContent: questionIndex == 0 ? 'flex-end' : 'space-between'},
        ]}>
        {questionIndex > 0 && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setQuestionIndex(0)}>
            <MaterialIcons name="chevron-left" size={28} color="black" />
            <Text style={{color: '#1C1B1F', fontWeight: '500'}}>Previous</Text>
          </TouchableOpacity>
        )}

        {questionIndex < questions.length - 1 && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setQuestionIndex(1);
            }}>
            <Text style={{color: '#1C1B1F', fontWeight: '500'}}>Next</Text>
            <MaterialIcons name="chevron-right" size={28} color="black" />
          </TouchableOpacity>
        )}
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
  },
  svg: {marginTop: 0},
  label_left: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Poppins',
    position: 'absolute',
    left: 20,
    bottom: -20,
  },
  label_right: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Poppins',
    position: 'absolute',
    right: 20,
    bottom: -20,
  },
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
