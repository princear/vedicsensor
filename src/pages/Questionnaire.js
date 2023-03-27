import React, {useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import SittingSvg from '../../assets/sitting.svg';
import WalkingDog from '../../assets/walking_my_dog.svg';
import StruggleSvg from '../../assets/struggle.svg';
import Eyes from '../../assets/eyes.svg';
import HairsLess from '../../assets/hairs_dense.svg';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// question types - slider, tap, yes/no, select, multi select,

const ques = [
  {
    answered: false,
    bgColor: '#3259CB',
    question: 'How many hours a day do you spend sitting?',
    helperText: false,
    helperSvg: false,
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
    svg: <WalkingDog width={'100%'} height={'100%'} />,
    type: 'slider',
    min: {value: 0, label: 'Not much'},
    max: {value: 4, label: 'Intense'},
    values: ['Not much', 'Moderate', 'Average', 'Intense', 'Very intense'],
  },
  {
    answered: false,
    bgColor: '#3259CB',
    question: 'How much effort do you believe you normally put in?',
    helperText: '(1 means very little while 5 means great deal of effort)',
    svg: <StruggleSvg width={60} height={60} />,
    type: 'scale',
    min: {value: 0, label: 'Not much'},
    max: {value: 4, label: 'Intense'},
    values: ['Not much', 'Moderate', 'Average', 'Intense', 'Very intense'],
  },
  {
    answered: false,
    bgColor: '#3259CB',
    question: 'Do you regularly enagage in physical activities?',
    helperText: '',
    svg: false,
    animationName: 'basketBallPlaying',
    type: 'yes/no',
  },
  {
    answered: false,
    bgColor: '#087C53',
    question: 'What eye size do you possess?',
    helperText: '',
    svg: <Eyes height={100} width={100} />,
    type: 'select',
    options: [
      {
        label: 'Small eyes',
        value: 'Small eyes',
        img: false,
      },
      {
        label: 'Medium eyes',
        value: 'Medium eyes',
        img: false,
      },
      {
        label: 'Big eyes',
        value: 'Big eyes',
        img: false,
      },
    ],
  },
  {
    answered: false,
    bgColor: '#087C53',
    question: 'What color is the white part of your eye?',
    helperText: '',
    svg: false,
    type: 'select',
    options: [
      {
        label: 'Dull or dusky',
        value: 'Dull or dusky',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35CdN_4kgwnFEp7p9j-MOqyTZ7vpvcQtCwg&usqp=CAU',
      },
      {
        label: 'Coppery eyes',
        value: 'Coppery eyes',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39nMxRdl2Xu8fK0FmH1HfsRVcjdb2mOSyyw&usqp=CAU',
      },
      {
        label: 'Milky white eyes',
        value: 'Milky white eyes',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41Scnys7uiVc_vtDPtx2bC9aMmacKlHYwwQ&usqp=CAU',
      },
    ],
  },
  {
    answered: false,
    bgColor: '#087C53',
    question:
      'Choose the appropriate options for your hair type and condition.',
    helperText: '',
    svg: false,
    type: 'multi-select',
    options: [
      {
        label: 'Less dense hair',
        value: 'Less dense hair',
        image_url: <HairsLess />,
      },
      {
        label: 'Dense hair',
        value: 'Dense hair',
        image_url: <HairsLess />,
      },
      {
        label: 'Curly hair',
        value: 'Curly hair',
        image_url: <HairsLess />,
      },
      {
        label: 'Grey hair before 35 years',
        helper_label: '(more than 20%)',
        value: 'Grey hair before 35 years',
        image_url: <HairsLess />,
      },
    ],
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
  {
    question: 'How much effort do you believe you normally put in?',
    answer: 3,
  },
  {
    question: 'Do you regularly enagage in physical activities?',
    answer: 'Yes',
  },
  {
    question: 'What eye size do you possess?',
    answer: 'Medium eyes',
  },
  {
    question: 'What color is the white part of your eye?',
    answer: 'Milky white eyes',
  },
  {
    question:
      'Choose the appropriate options for your hair type and condition.',
    answer: ['Dense hair'],
  },
];

const Questionnaire = ({navigation}) => {
  const [answers, setAnswers] = useState(ans);
  const [questions, setQuestions] = useState(ques);
  const [questionIndex, setQuestionIndex] = useState(0);

  const animation = useRef(null);

  useEffect(() => {
    animation?.current?.play();
  }, [questionIndex]);

  const offset = useSharedValue(0.8);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(offset?.value)}],
    };
  });

  useEffect(() => {
    if (questions[questionIndex].type !== 'slider') return;
    if (answers[questionIndex].valueIndex == 0) offset.value = 0.8;
    else if (answers[questionIndex].valueIndex == 1) offset.value = 1.3;
    else if (answers[questionIndex].valueIndex == 2) offset.value = 1.8;
    else if (answers[questionIndex].valueIndex == 3) offset.value = 2.3;
    else if (answers[questionIndex].valueIndex == 4) offset.value = 2.8;
  }, [answers[questionIndex]?.valueIndex]);

  const targetIndex = answers.findIndex(
    item => item.question === questions[questionIndex].question,
  );

  //   console.warn(answers);

  const renderQuestion = question => {
    if (question.type === 'slider') {
      return (
        <View style={styles.content}>
          <View>
            <Animated.View style={[{width: 100, height: 100}, animatedStyles]}>
              {questions[questionIndex]?.svg}
            </Animated.View>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 80}}>
            <Text
              style={{
                color: '#3259CB',
                fontWeight: '700',
                fontFamily: 'Poppins',
                textTransform: 'uppercase',
              }}>
              {
                questions[questionIndex]?.values[
                  answers[questionIndex]?.valueIndex
                ]
              }
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
                        ? {
                            ...item,
                            answer: questions[questionIndex]?.values[val],
                            valueIndex: val,
                          }
                        : item,
                    ),
                  );
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
      );
    } else if (question.type === 'scale') {
      let value = answers[questionIndex].answer;
      const handleChange = newValue => {
        setAnswers(
          answers.map(item =>
            item.question === questions[questionIndex].question
              ? {...item, answer: newValue}
              : item,
          ),
        );
      };
      return (
        <View style={styles.content}>
          <StruggleSvg width={100} height={100} />
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <Pressable
              style={[
                styles.left_rounded_box,
                {
                  backgroundColor: value >= 1 ? '#FFB8B2' : '#D9D9D9',
                },
              ]}
              onPress={() => handleChange(1)}>
              <Text
                style={[
                  styles.box_text,
                  {
                    color: value >= 1 ? '#3259CB' : '#BFBFBF',
                  },
                ]}>
                1
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.square_box,
                {
                  backgroundColor: value >= 2 ? '#FF9D95' : '#D9D9D9',
                },
              ]}
              onPress={() => handleChange(2)}>
              <Text
                style={[
                  styles.box_text,
                  {
                    color: value >= 2 ? '#3259CB' : '#BFBFBF',
                  },
                ]}>
                2
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.square_box,
                {
                  backgroundColor: value >= 3 ? '#FF857B' : '#D9D9D9',
                },
              ]}
              onPress={() => handleChange(3)}>
              <Text
                style={[
                  styles.box_text,
                  {
                    color: value >= 3 ? '#3259CB' : '#BFBFBF',
                  },
                ]}>
                3
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.square_box,
                {backgroundColor: value >= 4 ? '#FF6D61' : '#D9D9D9'},
              ]}
              onPress={() => handleChange(4)}>
              <Text
                style={[
                  styles.box_text,
                  {color: value >= 4 ? '#3259CB' : '#BFBFBF'},
                ]}>
                4
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.right_rounded_box,
                {backgroundColor: value >= 5 ? '#F94F41' : '#D9D9D9'},
              ]}
              onPress={() => handleChange(5)}>
              <Text
                style={[
                  styles.box_text,
                  {color: value >= 5 ? '#3259CB' : '#BFBFBF'},
                ]}>
                5
              </Text>
            </Pressable>
          </View>
        </View>
      );
    } else if (question.type === 'yes/no') {
      const handleChange = value => {
        setAnswers(
          answers.map(item =>
            item.question === questions[questionIndex].question
              ? {
                  ...item,
                  answer: value,
                }
              : item,
          ),
        );
      };
      return (
        <View style={styles.content}>
          {!questions[questionIndex].svg ? (
            <View style={{height: 150, width: 150}}>
              <LottieView
                ref={animation}
                autoplay={true}
                loop={true}
                source={
                  assets.lottieFiles[questions[questionIndex].animationName]
                }
              />
            </View>
          ) : (
            <View style={{height: 150, width: 100}}>
              {questions[questionIndex]?.svg}
            </View>
          )}
          <View style={styles.yes_no_container}>
            <TouchableOpacity
              style={styles.no}
              onPress={() => handleChange('No')}>
              <MaterialIcons name="close" size={24} color="#ffffff" />
              <Text style={styles.yes_no_text}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yes}
              onPress={() => handleChange('Yes')}>
              <MaterialIcons name="check" size={24} color="#ffffff" />
              <Text style={styles.yes_no_text}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (question.type === 'select') {
      const handleChange = value => {
        setAnswers(
          answers.map(item =>
            item.question === questions[questionIndex].question
              ? {
                  ...item,
                  answer: value,
                }
              : item,
          ),
        );
      };
      return (
        <View style={[styles.content, {paddingTop: 10}]}>
          {questions[questionIndex]?.svg && (
            <View style={{marginVertical: 20}}>
              {questions[questionIndex]?.svg}
            </View>
          )}
          <View
            style={{
              marginTop: 30,
              paddingLeft: 20,
              width: '100%',
            }}>
            {questions[questionIndex]?.options?.map((item, idx) => (
              <View style={styles.radio_row} key={idx}>
                <TouchableOpacity
                  style={styles.radio}
                  onPress={() => handleChange(item.value)}>
                  {answers[questionIndex].answer === item.value && (
                    <View style={styles.radio_selected} />
                  )}
                </TouchableOpacity>
                <Pressable
                  onPress={() => handleChange(item.value)}
                  style={[
                    styles.radio_text,
                    {width: item?.image_url ? '30%' : '63%'},
                  ]}>
                  <Text>{item?.label}</Text>
                </Pressable>
                {item?.image_url && (
                  <Image
                    style={{width: 100, height: 50, borderRadius: 10}}
                    source={{
                      uri: item.image_url,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      );
    } else if (question.type === 'multi-select') {
      const handleChange = (question, newValue) => {
        const index = answers.findIndex(obj => obj.question === question);
        const foundObj = answers[index];
        const foundItemIndex = foundObj.answer.indexOf(newValue);
        if (foundItemIndex === -1) {
          const updatedItems = [...foundObj.answer, newValue];
          const updatedObj = {...foundObj, answer: updatedItems};
          const updatedAnswer = [...answers];
          updatedAnswer[index] = updatedObj;
          setAnswers(updatedAnswer);
        } else {
          const updatedItems = foundObj.answer.filter(i => i !== newValue);
          const updatedObj = {...foundObj, answer: updatedItems};
          const updatedAnswer = [...answers];
          updatedAnswer[index] = updatedObj;
          setAnswers(updatedAnswer);
        }
      };

      return (
        <View style={[styles.content, {paddingHorizontal: 20}]}>
          {questions[questionIndex]?.options.map((item, idx) => {
            return (
              <Pressable
                key={idx}
                style={styles.select_option}
                onPress={() => {
                  handleChange(questions[questionIndex].question, item.value);
                }}>
                {item.image_url && (
                  <View style={{marginRight: 14}}>{item.image_url}</View>
                )}
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={styles.select_option_text}>{item?.label}</Text>
                  {item.helper_label && (
                    <Text style={[styles.select_option_text, {fontSize: 14}]}>
                      {item?.helper_label}
                    </Text>
                  )}
                </View>
                {!answers[questionIndex]?.answer?.includes(item?.value) ? (
                  <View
                    style={{
                      backgroundColor: '#3259CB',
                      borderRadius: 50,
                      padding: 4,
                    }}>
                    <MaterialIcons name="add" size={18} color="#C8EBFF" />
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#087c52',
                      borderRadius: 50,
                      padding: 4,
                    }}>
                    <MaterialIcons name="check" size={18} color="#f2f2f2" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      );
    }
  };
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
          <TouchableOpacity
            onPress={() => {
              //   console.warn(questionIndex);
              console.log(answers[questionIndex]);
            }}
            style={{position: 'absolute', right: 10}}>
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
          {questions[questionIndex]?.helperText && (
            <Text style={styles.info}>
              {questions[questionIndex]?.helperText}
            </Text>
          )}
          {questions[questionIndex]?.helperSvg && (
            <View style={{alignItems: 'center', marginTop: 20}}>
              {questions[questionIndex]?.helperSvg}
            </View>
          )}
        </View>
      </View>
      {renderQuestion(questions[questionIndex])}
      <View
        style={[
          styles.bottom_buttons,
          {justifyContent: questionIndex == 0 ? 'flex-end' : 'space-between'},
        ]}>
        {questionIndex > 0 && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setQuestionIndex(questionIndex - 1)}>
            <MaterialIcons name="chevron-left" size={28} color="black" />
            <Text style={{color: '#1C1B1F', fontWeight: '500'}}>Previous</Text>
          </TouchableOpacity>
        )}

        {questionIndex < questions.length - 1 && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setQuestionIndex(questionIndex + 1);
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
    textTransform: 'uppercase',
  },
  label_right: {
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'Poppins',
    position: 'absolute',
    right: 20,
    bottom: -20,
    textTransform: 'uppercase',
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
  left_rounded_box: {
    backgroundColor: '#D9D9D9',
    height: 70,
    width: 70,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginRight: 4,
    alignItems: 'center',
  },
  square_box: {
    backgroundColor: '#D9D9D9',
    height: 70,
    width: 70,
    marginRight: 4,
    alignItems: 'center',
  },
  right_rounded_box: {
    backgroundColor: '#D9D9D9',
    height: 70,
    width: 70,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
  },
  box_text: {
    color: '#BFBFBF',
    fontFamily: 'Poppins',
    fontWeight: '700',
    position: 'absolute',
    bottom: -30,
  },
  yes_no_container: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  no: {
    backgroundColor: '#F64072',
    width: 50,
    height: 50,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  yes: {
    backgroundColor: '#71CD74',
    width: 50,
    height: 50,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  yes_no_text: {
    color: '#323232',
    fontWeight: '700',
    fontFamily: 'Poppins',
    position: 'absolute',
    bottom: -25,
  },
  radio_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#4789C7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio_selected: {
    backgroundColor: '#4789C7',
    height: '75%',
    width: '75%',
    borderRadius: 20,
  },
  radio_text: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 25,
    color: '#323232',
    width: '63%',
    marginHorizontal: 10,
  },
  select_option: {
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#C8EBFF',
    marginVertical: 4,
    height: 70,
  },
  select_option_text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#1C1B1F',
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
