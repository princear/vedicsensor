import React, {useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import SittingSvg from '../../assets/sitting.svg';
import WalkingDog from '../../assets/walking_my_dog.svg';
import StruggleSvg from '../../assets/struggle.svg';
import Eyes from '../../assets/eyes.svg';
import HairsLess from '../../assets/hairs_dense.svg';
import Slider from '@react-native-community/slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import MyText from '../components/MyText';
import {callGetApi} from '../utils/axios';

// question types - slider, tap, yes/no, select, multi select,

const ques = [
  {
    bg_color: '#3259CB',
    question_text: 'Do you regularly enagage in physical activities?',
    helperText: '',
    svg: false,
    animationName: 'basketBallPlaying',
    type: 'yes/no',
    options: [
      {
        option_value: 1,
        option_dosha: 'v',
        option_weight: 1.07,
        option_label: 'yes',
      },
      {
        option_value: 2,
        option_dosha: '',
        option_weight: 0,
        option_label: 'no',
      },
    ],
  },
  //   {
  //     answered: false,
  //     bgColor: '#3259CB',
  //     question: 'How many hours a day do you spend sitting?',
  //     helperText: false,
  //     helperSvg: false,
  //     svg: <SittingSvg width={'100%'} height={'100%'} />, // or svg_url
  //     type: 'slider',
  //     min: {value: 0, label: '< 2 Hours'},
  //     max: {value: 4, label: '5+ Hours'},
  //     values: [
  //       'Less than 2 hours',
  //       '2-3 Hours',
  //       '3-4 Hours',
  //       '4-5 Hours',
  //       '5 Hours +',
  //     ],
  //   },
  //   {
  //     answered: false,
  //     bgColor: '#087C53',
  //     question: 'How much physical activity is required by your job?',
  //     helperText: 'Like gym or cycling',
  //     svg: <WalkingDog width={'100%'} height={'100%'} />,
  //     type: 'slider',
  //     min: {value: 0, label: 'Not much'},
  //     max: {value: 4, label: 'Intense'},
  //     values: ['Not much', 'Moderate', 'Average', 'Intense', 'Very intense'],
  //   },
  //   {
  //     answered: false,
  //     bgColor: '#3259CB',
  //     question: 'How much effort do you believe you normally put in?',
  //     helperText: '(1 means very little while 5 means great deal of effort)',
  //     svg: <StruggleSvg width={60} height={60} />,
  //     type: 'scale',
  //     min: {value: 0, label: 'Not much'},
  //     max: {value: 4, label: 'Intense'},
  //     values: ['Not much', 'Moderate', 'Average', 'Intense', 'Very intense'],
  //   },

  //   {
  //     answered: false,
  //     bgColor: '#087C53',
  //     question: 'What eye size do you possess?',
  //     helperText: '',
  //     svg: <Eyes height={100} width={100} />,
  //     type: 'select',
  //     options: [
  //       {
  //         label: 'Small eyes',
  //         value: 'Small eyes',
  //         img: false,
  //       },
  //       {
  //         label: 'Medium eyes',
  //         value: 'Medium eyes',
  //         img: false,
  //       },
  //       {
  //         label: 'Big eyes',
  //         value: 'Big eyes',
  //         img: false,
  //       },
  //     ],
  //   },
  //   {
  //     answered: false,
  //     bgColor: '#087C53',
  //     question: 'What color is the white part of your eye?',
  //     helperText: '',
  //     svg: false,
  //     type: 'select',
  //     options: [
  //       {
  //         label: 'Dull or dusky',
  //         value: 'Dull or dusky',
  //         image_url:
  //           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35CdN_4kgwnFEp7p9j-MOqyTZ7vpvcQtCwg&usqp=CAU',
  //       },
  //       {
  //         label: 'Coppery eyes',
  //         value: 'Coppery eyes',
  //         image_url:
  //           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS39nMxRdl2Xu8fK0FmH1HfsRVcjdb2mOSyyw&usqp=CAU',
  //       },
  //       {
  //         label: 'Milky white eyes',
  //         value: 'Milky white eyes',
  //         image_url:
  //           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT41Scnys7uiVc_vtDPtx2bC9aMmacKlHYwwQ&usqp=CAU',
  //       },
  //     ],
  //   },
  //   {
  //     answered: false,
  //     bgColor: '#087C53',
  //     question:
  //       'Choose the appropriate options for your hair type and condition.',
  //     helperText: '',
  //     svg: false,
  //     type: 'multi-select',
  //     options: [
  //       {
  //         label: 'Less dense hair',
  //         value: 'Less dense hair',
  //         image_url: <HairsLess />,
  //       },
  //       {
  //         label: 'Dense hair',
  //         value: 'Dense hair',
  //         image_url: <HairsLess />,
  //       },
  //       {
  //         label: 'Curly hair',
  //         value: 'Curly hair',
  //         image_url: <HairsLess />,
  //       },
  //       {
  //         label: 'Grey hair before 35 years',
  //         helper_label: '(more than 20%)',
  //         value: 'Grey hair before 35 years',
  //         image_url: <HairsLess />,
  //       },
  //     ],
  //   },
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

const Questionnaire = ({navigation, route}) => {
  const windowDimensions = Dimensions.get('window');
  const [answers, setAnswers] = useState(ans);
  const [questions, setQuestions] = useState(ques);
  const [questionIndex, setQuestionIndex] = useState(1);

  const animation = useRef(null);

  const offset = useSharedValue(0.8);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(offset?.value)}],
    };
  });

  const getAllQuestions = async () => {
    const url = `/v1/api/get-questions`;
    const res = await callGetApi(url);
    setQuestions(res.data);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {backgroundColor: '#ffffff', height: 60},
      });
    };
  }, [navigation, route]);

  useEffect(() => {
    animation?.current?.play();
  }, [questionIndex]);

  //   useEffect(() => {
  //     if (questions[questionIndex].type !== 'slider') return;
  //     if (answers[questionIndex].valueIndex == 0) offset.value = 0.8;
  //     else if (answers[questionIndex].valueIndex == 1) offset.value = 1.3;
  //     else if (answers[questionIndex].valueIndex == 2) offset.value = 1.8;
  //     else if (answers[questionIndex].valueIndex == 3) offset.value = 2.3;
  //     else if (answers[questionIndex].valueIndex == 4) offset.value = 2.8;
  //   }, [answers[questionIndex]?.valueIndex]);

  const renderQuestion = question => {
    if (question['question_type'] === 'yes_and_no') {
      const handleChange = value => {
        const selected_answer = question.options.filter(
          option => option.option_label === value,
        );
        console.warn(selected_answer);
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
              onPress={() => handleChange('no')}>
              <MaterialIcons name="close" size={24} color="#ffffff" />
              <MyText style={styles.yes_no_text}>No</MyText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yes}
              onPress={() => handleChange('yes')}>
              <MaterialIcons name="check" size={24} color="#ffffff" />
              <MyText style={styles.yes_no_text}>Yes</MyText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    //  if (question_type === 'slider') {
    //    return (
    //      <View style={styles.content}>
    //        <View>
    //          <Animated.View style={[{width: 100, height: 100}, animatedStyles]}>
    //            {questions[questionIndex]?.svg}
    //          </Animated.View>
    //        </View>
    //        <View style={{width: '100%', alignItems: 'center', marginTop: 80}}>
    //          <MyText
    //            style={{
    //              color: '#3259CB',
    //              fontWeight: '700',
    //              fontFamily: 'Poppins',
    //              textTransform: 'uppercase',
    //            }}>
    //            {
    //              questions[questionIndex]?.values[
    //                answers[questionIndex]?.valueIndex
    //              ]
    //            }
    //          </MyText>
    //          <View style={{width: '80%', alignItems: 'center'}}>
    //            <Slider
    //              style={{width: '80%'}}
    //              step={1}
    //              minimumValue={questions[questionIndex]?.min?.value}
    //              maximumValue={4}
    //              value={answers[questionIndex]?.valueIndex}
    //              onValueChange={val => {
    //                setAnswers(
    //                  answers.map(item =>
    //                    item.question === questions[questionIndex].question
    //                      ? {
    //                          ...item,
    //                          answer: questions[questionIndex]?.values[val],
    //                          valueIndex: val,
    //                        }
    //                      : item,
    //                  ),
    //                );
    //              }}
    //              thumbTintColor="#67160F"
    //              minimumTrackTintColor="#F94F41"
    //              maximumTrackTintColor="#67160F"
    //            />
    //            <MyText style={styles.label_left}>
    //              {questions[questionIndex]?.min?.label}
    //            </MyText>
    //            <MyText style={styles.label_right}>
    //              {questions[questionIndex]?.max?.label}
    //            </MyText>
    //          </View>
    //        </View>
    //      </View>
    //    );
    //  } else if (question_type === 'scale') {
    //    let value = answers[questionIndex].answer;
    //    const handleChange = newValue => {
    //      setAnswers(
    //        answers.map(item =>
    //          item.question === questions[questionIndex].question
    //            ? {...item, answer: newValue}
    //            : item,
    //        ),
    //      );
    //    };
    //    return (
    //      <View style={styles.content}>
    //        <StruggleSvg width={100} height={100} />
    //        <View
    //          style={{
    //            marginTop: 30,
    //            flexDirection: 'row',
    //            paddingHorizontal: 10,
    //            justifyContent: 'center',
    //          }}>
    //          <Pressable
    //            style={[
    //              styles.left_rounded_box,
    //              {
    //                width: windowDimensions.width - 300,
    //                backgroundColor: value >= 1 ? '#FFB8B2' : '#D9D9D9',
    //              },
    //            ]}
    //            onPress={() => handleChange(1)}>
    //            <MyText
    //              style={[
    //                styles.box_text,
    //                {
    //                  color: value >= 1 ? '#3259CB' : '#BFBFBF',
    //                },
    //              ]}>
    //              1
    //            </MyText>
    //          </Pressable>
    //          <Pressable
    //            style={[
    //              styles.square_box,
    //              {
    //                width: windowDimensions.width - 300,
    //                backgroundColor: value >= 2 ? '#FF9D95' : '#D9D9D9',
    //              },
    //            ]}
    //            onPress={() => handleChange(2)}>
    //            <MyText
    //              style={[
    //                styles.box_text,
    //                {
    //                  color: value >= 2 ? '#3259CB' : '#BFBFBF',
    //                },
    //              ]}>
    //              2
    //            </MyText>
    //          </Pressable>
    //          <Pressable
    //            style={[
    //              styles.square_box,
    //              {
    //                width: windowDimensions.width - 300,
    //                backgroundColor: value >= 3 ? '#FF857B' : '#D9D9D9',
    //              },
    //            ]}
    //            onPress={() => handleChange(3)}>
    //            <MyText
    //              style={[
    //                styles.box_text,
    //                {
    //                  color: value >= 3 ? '#3259CB' : '#BFBFBF',
    //                },
    //              ]}>
    //              3
    //            </MyText>
    //          </Pressable>
    //          <Pressable
    //            style={[
    //              styles.square_box,
    //              {
    //                width: windowDimensions.width - 300,
    //                backgroundColor: value >= 4 ? '#FF6D61' : '#D9D9D9',
    //              },
    //            ]}
    //            onPress={() => handleChange(4)}>
    //            <MyText
    //              style={[
    //                styles.box_text,
    //                {color: value >= 4 ? '#3259CB' : '#BFBFBF'},
    //              ]}>
    //              4
    //            </MyText>
    //          </Pressable>
    //          <Pressable
    //            style={[
    //              styles.right_rounded_box,
    //              {
    //                width: windowDimensions.width - 300,
    //                backgroundColor: value >= 5 ? '#F94F41' : '#D9D9D9',
    //              },
    //            ]}
    //            onPress={() => handleChange(5)}>
    //            <MyText
    //              style={[
    //                styles.box_text,
    //                {color: value >= 5 ? '#3259CB' : '#BFBFBF'},
    //              ]}>
    //              5
    //            </MyText>
    //          </Pressable>
    //        </View>
    //      </View>
    //    );
    //  } else if (question_type === 'yes/no') {
    //    const handleChange = value => {
    //      console.warn(value);
    //      //   setQuestionIndex(questionIndex + 1);
    //      //   setAnswers(
    //      //     answers.map(item =>
    //      //       item.question === questions[questionIndex].question
    //      //         ? {
    //      //             ...item,
    //      //             answer: value,
    //      //           }
    //      //         : item,
    //      //     ),
    //      //   );
    //    };
    //    return (
    //      <View style={styles.content}>
    //        {!questions[questionIndex].svg ? (
    //          <View style={{height: 150, width: 150}}>
    //            <LottieView
    //              ref={animation}
    //              autoplay={true}
    //              loop={true}
    //              source={
    //                assets.lottieFiles[questions[questionIndex].animationName]
    //              }
    //            />
    //          </View>
    //        ) : (
    //          <View style={{height: 150, width: 100}}>
    //            {questions[questionIndex]?.svg}
    //          </View>
    //        )}
    //        <View style={styles.yes_no_container}>
    //          <TouchableOpacity
    //            style={styles.no}
    //            onPress={() => handleChange('No')}>
    //            <MaterialIcons name="close" size={24} color="#ffffff" />
    //            <MyText style={styles.yes_no_text}>No</MyText>
    //          </TouchableOpacity>
    //          <TouchableOpacity
    //            style={styles.yes}
    //            onPress={() => handleChange('Yes')}>
    //            <MaterialIcons name="check" size={24} color="#ffffff" />
    //            <MyText style={styles.yes_no_text}>Yes</MyText>
    //          </TouchableOpacity>
    //        </View>
    //      </View>
    //    );
    //  } else if (question_type === 'select') {
    //    const handleChange = value => {
    //      setAnswers(
    //        answers.map(item =>
    //          item.question === questions[questionIndex].question
    //            ? {
    //                ...item,
    //                answer: value,
    //              }
    //            : item,
    //        ),
    //      );
    //    };
    //    return (
    //      <View style={[styles.content, {paddingTop: 10}]}>
    //        {questions[questionIndex]?.svg && (
    //          <View style={{marginVertical: 20}}>
    //            {questions[questionIndex]?.svg}
    //          </View>
    //        )}
    //        <View
    //          style={{
    //            marginTop: 30,
    //            paddingLeft: 20,
    //            width: '100%',
    //          }}>
    //          {questions[questionIndex]?.options?.map((item, idx) => (
    //            <View style={styles.radio_row} key={idx}>
    //              <TouchableOpacity
    //                style={styles.radio}
    //                onPress={() => handleChange(item.value)}>
    //                {answers[questionIndex].answer === item.value && (
    //                  <View style={styles.radio_selected} />
    //                )}
    //              </TouchableOpacity>
    //              <Pressable
    //                onPress={() => handleChange(item.value)}
    //                style={[
    //                  styles.radio_text,
    //                  {width: item?.image_url ? '30%' : '63%'},
    //                ]}>
    //                <MyText>{item?.label}</MyText>
    //              </Pressable>
    //              {item?.image_url && (
    //                <Image
    //                  style={{width: 100, height: 50, borderRadius: 10}}
    //                  source={{
    //                    uri: item.image_url,
    //                  }}
    //                />
    //              )}
    //            </View>
    //          ))}
    //        </View>
    //      </View>
    //    );
    //  } else if (question_type === 'multi-select') {
    //    const handleChange = (question, newValue) => {
    //      const index = answers.findIndex(obj => obj.question === question);
    //      const foundObj = answers[index];
    //      const foundItemIndex = foundObj.answer.indexOf(newValue);
    //      if (foundItemIndex === -1) {
    //        const updatedItems = [...foundObj.answer, newValue];
    //        const updatedObj = {...foundObj, answer: updatedItems};
    //        const updatedAnswer = [...answers];
    //        updatedAnswer[index] = updatedObj;
    //        setAnswers(updatedAnswer);
    //      } else {
    //        const updatedItems = foundObj.answer.filter(i => i !== newValue);
    //        const updatedObj = {...foundObj, answer: updatedItems};
    //        const updatedAnswer = [...answers];
    //        updatedAnswer[index] = updatedObj;
    //        setAnswers(updatedAnswer);
    //      }
    //    };
    //    const windowHeight = Number.parseInt(windowDimensions.height);
    //    return (
    //      <View
    //        style={[
    //          styles.content,
    //          {paddingHorizontal: 20, paddingTop: 0, marignTop: 0},
    //        ]}>
    //        <View
    //          style={{
    //            marginTop: 40,
    //            width: '100%',
    //            justifyContent: 'flex-end',
    //            height: '78%',
    //          }}>
    //          <ScrollView>
    //            {questions[questionIndex]?.options.map((item, idx) => {
    //              return (
    //                <Pressable
    //                  key={idx}
    //                  style={[
    //                    styles.select_option,
    //                    {height: windowHeight * 0.0971},
    //                  ]}
    //                  onPress={() => {
    //                    handleChange(
    //                      questions[questionIndex].question,
    //                      item.value,
    //                    );
    //                  }}>
    //                  {item.image_url && (
    //                    <View style={{marginRight: 14}}>{item.image_url}</View>
    //                  )}
    //                  <View style={{flex: 1, justifyContent: 'center'}}>
    //                    <MyText style={styles.select_option_text}>
    //                      {item?.label}
    //                    </MyText>
    //                    {item.helper_label && (
    //                      <MyText
    //                        style={[styles.select_option_text, {fontSize: 14}]}>
    //                        {item?.helper_label}
    //                      </MyText>
    //                    )}
    //                  </View>
    //                  {!answers[questionIndex]?.answer?.includes(item?.value) ? (
    //                    <View
    //                      style={{
    //                        backgroundColor: '#3259CB',
    //                        borderRadius: 50,
    //                        padding: 4,
    //                      }}>
    //                      <MaterialIcons name="add" size={18} color="#C8EBFF" />
    //                    </View>
    //                  ) : (
    //                    <View
    //                      style={{
    //                        backgroundColor: '#087c52',
    //                        borderRadius: 50,
    //                        padding: 4,
    //                      }}>
    //                      <MaterialIcons name="check" size={18} color="#f2f2f2" />
    //                    </View>
    //                  )}
    //                </Pressable>
    //              );
    //            })}
    //          </ScrollView>
    //        </View>
    //      </View>
    //    );
    //  }
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View
        style={[
          styles.blue_curve,
          {backgroundColor: questions[questionIndex]?.bg_color},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'center',
          }}>
          <MyText
            style={{color: 'white', fontWeight: '600', fontFamily: 'poppins'}}>
            Physical Activity
          </MyText>
          <TouchableOpacity
            onPress={() => {
              console.log(answers[questionIndex]);
            }}
            style={{position: 'absolute', right: 10}}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 0, marginBottom: 40}}>
          {/* <MyText>Progress bar</MyText> */}
        </View>
        <View style={{width: '60%'}}>
          <MyText style={styles.question}>
            {questions[questionIndex]?.question_text}
          </MyText>
          {questions[questionIndex]?.question_info && (
            <MyText style={styles.info}>
              {questions[questionIndex]?.helperText}
            </MyText>
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
          {justifyContent: questionIndex === 1 ? 'flex-end' : 'space-between'},
        ]}>
        {questionIndex > 1 && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: questionIndex > 1 ? 1 : 0,
            }}
            onPress={() => {
              if (questionIndex > 1) setQuestionIndex(questionIndex - 1);
            }}>
            <MaterialIcons name="chevron-left" size={28} color="black" />
            <MyText style={{color: '#1C1B1F', fontWeight: '500'}}>
              Previous
            </MyText>
          </TouchableOpacity>
        )}

        {/* Object.keys(questions).length */}
        {/* {console.warn(Object.keys(questions).length)} */}

        {questionIndex < Object.keys(questions).length && (
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setQuestionIndex(questionIndex + 1);
            }}>
            <MyText style={{color: '#1C1B1F', fontWeight: '500'}}>Next</MyText>
            <MaterialIcons name="chevron-right" size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  blue_curve: {
    width: '120%',
    height: 250,
    backgroundColor: '#3259CB',
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    alignItems: 'center',
    paddingTop: 20,
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
    height: 60,
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

export default Questionnaire;
