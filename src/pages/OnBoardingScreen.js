import React, {useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';

const OnBoardingScreen = ({navigation}) => {
  const [onBoardingStep, setOnBoardingStep] = useState(1);
  const [onBoardingDetails, setOnBoardingDetails] = useState({
    gender: 'male',
  });

  const renderOnBoadingSteps = () => {
    if (onBoardingStep == 1)
      return (
        <Step1
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
        />
      );
    else if (onBoardingStep == 2)
      return (
        <Step2
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
        />
      );
    else if (onBoardingStep == 3)
      return (
        <Step3
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
        />
      );
    else if (onBoardingStep == 4)
      return (
        <Step4
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
        />
      );
    else
      return (
        <Step5
          navigation={navigation}
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
        />
      );
  };

  return <SafeAreaView>{renderOnBoadingSteps()}</SafeAreaView>;
};

const Step1 = props => {
  const {setOnBoardingStep} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Enter your details</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={26} color="#1C1B1F" />
          <TextInput style={styles.textField} placeholder="First name" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textField} placeholder="Last name" />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <TextInput style={styles.textField} placeholder="E mail-id" />
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button_blue}
          onPress={() => setOnBoardingStep(2)}>
          <Text style={styles.button_blue_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Step2 = props => {
  const {onBoardingStep, setOnBoardingStep} = props;
  return (
    <SafeAreaView style={styles.container}>
      {onBoardingStep > 1 && (
        <TouchableOpacity onPress={() => setOnBoardingStep(onBoardingStep - 1)}>
          <MaterialIcons name="arrow-back" style={styles.arrow_back} />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Enter your details</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="redeem" size={24} color="black" />
          <View style={{width: '95%'}}>
            <TextInput style={styles.textField} placeholder="Date of birth" />
            <Text style={{marginLeft: 20, marginBottom: 20}}>dd/mm/yyyy</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={26}
            color="black"
          />
          <View style={{width: '95%'}}>
            <TextInput style={styles.textField} placeholder="Place of birth" />
            <Text style={{marginLeft: 20, marginBottom: 20}}>
              Enter the place where you were born.
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={26}
            color="black"
          />
          <View style={{width: '95%'}}>
            <TextInput style={styles.textField} placeholder="Time of birth" />
            <Text style={{marginLeft: 20}}>
              Enter if you are sure of the time.
            </Text>
            <Text style={{marginLeft: 20, marginBottom: 20}}>
              Note: Ask your parents.
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button_blue}
          onPress={() => setOnBoardingStep(3)}>
          <Text style={styles.button_blue_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Step3 = props => {
  const {
    onBoardingDetails,
    setOnBoardingDetails,
    onBoardingStep,
    setOnBoardingStep,
  } = props;

  const animation = useRef(null);

  useEffect(() => {
    animation?.current?.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {onBoardingStep > 1 && (
        <TouchableOpacity onPress={() => setOnBoardingStep(onBoardingStep - 1)}>
          <MaterialIcons name="arrow-back" style={styles.arrow_back} />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Hello Vikalp,</Text>
        <Text style={styles.subHeading}>Which one are you?</Text>

        <TouchableOpacity
          onPress={() =>
            setOnBoardingDetails({...onBoardingDetails, gender: 'male'})
          }
          style={{marginTop: 16, flexDirection: 'row'}}>
          <View
            style={[
              styles.box_outside,
              {
                borderColor:
                  onBoardingDetails.gender == 'male' ? '#3460D7' : '#6750A40D',
              },
            ]}>
            <View style={styles.box_inside}>
              <LottieView
                style={styles.gender_animation}
                ref={animation}
                autoplay={true}
                loop={true}
                source={assets.lottieFiles.male}
              />
              <Text style={styles.gender_text}>Male</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              setOnBoardingDetails({...onBoardingDetails, gender: 'female'})
            }
            style={[
              styles.box_outside,
              {
                borderColor:
                  onBoardingDetails.gender == 'female'
                    ? '#3460D7'
                    : '#6750A40D',
              },
            ]}>
            <View style={styles.box_inside}>
              <LottieView
                style={styles.gender_animation}
                ref={animation}
                autoplay={true}
                loop={true}
                source={assets.lottieFiles.female}
              />
              <Text style={styles.gender_text}>Female</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 22}}>
          <Text
            style={{
              paddingHorizontal: 30,
              textAlign: 'center',
              fontWeight: '500',
              width: '98%',
              letterSpacing: 1,
            }}>
            To give you customized experience we need to know your gender.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button_blue]}
        onPress={() => setOnBoardingStep(4)}>
        <Text style={styles.button_blue_text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Step4 = props => {
  const {onBoardingStep, setOnBoardingStep, onBoardingDetails} = props;

  const [unit, setUnit] = useState({
    height: 'ft/in', // [ft/in, cm]
    weight: 'kg', // [kg, lbs]
  });

  return (
    <SafeAreaView style={styles.container}>
      {onBoardingStep > 1 && (
        <TouchableOpacity onPress={() => setOnBoardingStep(onBoardingStep - 1)}>
          <MaterialIcons name="arrow-back" style={styles.arrow_back} />
        </TouchableOpacity>
      )}
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Hello Vikalp,</Text>
        <Text style={styles.subHeading}>We need your height and weight.</Text>

        <View style={{alignItems: 'center'}}>
          <TextInput
            style={styles.tab_text}
            keyboardType="numeric"
            placeholder="-"
          />
          <View
            style={{
              backgroundColor: '#DCDCDC',
              flexDirection: 'row',
              borderRadius: 16,
            }}>
            <TouchableOpacity
              onPress={() => setUnit({...unit, height: 'ft/in'})}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    unit.height == 'ft/in' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <Text
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Ft/in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnit({...unit, height: 'cm'})}
              style={[
                styles.tab,
                {
                  backgroundColor: unit.height == 'cm' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <Text
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Cm
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'relative',
            height: 300,
          }}>
          <View style={styles.slider_left_contianer}>
            <Slider
              style={styles.slider_left}
              step={0.1}
              minimumValue={0}
              maximumValue={12}
              value={12}
              minimumTrackTintColor="#DCDCDC"
              maximumTrackTintColor="#DCDCDC"
            />
          </View>
          <View>
            {onBoardingDetails.gender == 'male' ? (
              <Image
                source={assets.png.boy}
                style={{
                  width: 115,
                  height: 265,
                }}
              />
            ) : (
              <Image
                source={assets.png.girl}
                style={{
                  width: 100,
                  height: 250,
                }}
              />
            )}
          </View>
          <View style={styles.slider_right_container}>
            <Slider
              style={styles.slider_right}
              step={0.1}
              minimumValue={0}
              maximumValue={12}
              value={1}
              minimumTrackTintColor="#DCDCDC"
              maximumTrackTintColor="#DCDCDC"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button_blue]}
        onPress={() => setOnBoardingStep(5)}>
        <Text style={styles.button_blue_text}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Step5 = props => {
  const {navigation, onBoardingStep, setOnBoardingStep} = props;
  const animation = useRef();

  useEffect(() => {
    animation?.current?.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View>
          <LottieView
            source={assets.lottieFiles.rollingCheck}
            style={{width: 200}}
            ref={animation}
            autoplay={false}
            loop={false}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: '#323232',
            fontWeight: '700',
            marginBottom: 6,
          }}>
          Great!
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#323232',
            fontWeight: '500',
            width: 240,
            textAlign: 'center',
          }}>
          We are happy to welcome you onboard.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button_blue]}
        onPress={() => navigation.navigate('Questionnaire')}>
        <Text style={styles.button_blue_text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrow_back: {
    fontSize: 20,
    color: '#1C1B1F',
    position: 'absolute',
    top: -35,
    left: -4,
  },
  slider_left_contianer: {
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    left: -120,
  },
  slider_left: {
    width: 300,
    backgroundColor: '#D9D9D9',
  },
  slider_right_container: {
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    right: -120,
  },
  slider_right: {
    width: 300,
    backgroundColor: '#D9D9D9',
  },
  tab: {
    paddingVertical: 4,
    borderRadius: 16,
    width: 45,
  },
  tab_text: {
    alignItems: 'center',
    textAlign: 'center',
    height: 40,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#323232',
  },
  box_outside: {
    marginRight: 20,
    alignItems: 'center',
    width: 170,
    height: 190,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#6750A40D',
    backgroundColor:
      'background: linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFFFF',
  },
  box_inside: {
    height: '90%',
    width: '98%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gender_animation: {
    position: 'absolute',
    width: 200,
  },
  gender_text: {
    position: 'absolute',
    bottom: -10,
    fontSize: 16,
    fontWeight: '500',
    color: '#323232',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#323232',
  },
  subHeading: {
    color: '#323232',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#f2f2f2',
    height: '100%',
    paddingTop: 50,
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
  inputContainer: {
    height: 45,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  textField: {
    borderColor: '#49454F',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 20,
    paddingLeft: 10,
    width: '90%',
  },
});

export default OnBoardingScreen;
