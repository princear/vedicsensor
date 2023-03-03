import React, {useState, useEffect, useRef} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const LoginScreen = () => {
  const animation = useRef(null);
  const inputRef = useRef(null);
  const [isAnimationHidden, setIsAnimationHidden] = useState(false);

  const [step, setStep] = useState(1);

  useEffect(() => {
    animation?.current?.play();
  }, [step]);

  const renderSteps = () => {
    if (step == 1) {
      return (
        <Step1
          inputRef={inputRef}
          animation={animation}
          isAnimationHidden={isAnimationHidden}
          setIsAnimationHidden={setIsAnimationHidden}
          setStep={setStep}
        />
      );
    } else if (step == 2) {
      return (
        <Step2
          inputRef={inputRef}
          animation={animation}
          isAnimationHidden={isAnimationHidden}
          setIsAnimationHidden={setIsAnimationHidden}
          setStep={setStep}
        />
      );
    } else if (step == 3) {
      return <Step3 setStep={setStep} />;
    } else if (step == 4) {
      return <Step4 setStep={setStep} />;
    }
  };

  return <SafeAreaView>{renderSteps()}</SafeAreaView>;
};

const Step1 = props => {
  const {
    inputRef,
    animation,
    isAnimationHidden,
    setIsAnimationHidden,
    setStep,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Continue with phone</Text>

        <View
          style={{
            height: 350,
            width: '100%',
            display: isAnimationHidden ? 'none' : 'flex',
          }}>
          <LottieView
            ref={animation}
            autoplay={true}
            loop={true}
            source={assets.lottieFiles.usingMobile}
          />
        </View>

        <Text style={styles.infoText}>
          You’ll receive a 4 digit OTP to verify next
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View ref={inputRef} style={styles.input_small}>
            <Text>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Phone number"
            onBlur={() => setIsAnimationHidden(false)}
            onFocus={() => setIsAnimationHidden(true)}
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
        <TouchableOpacity
          style={styles.button_blue_disabled}
          onPress={() => setStep(2)}>
          <Text style={styles.button_blue_text}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Step2 = props => {
  const {
    inputRef,
    animation,
    isAnimationHidden,
    setIsAnimationHidden,
    setStep,
  } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Verify phone</Text>
        <Text style={styles.subHeading}>Code is sent to 9877777645</Text>

        <View
          style={{
            height: 350,
            width: '100%',
            display: isAnimationHidden ? 'none' : 'flex',
          }}>
          <LottieView
            ref={animation}
            autoplay={true}
            loop={true}
            source={assets.lottieFiles.sms}
          />
        </View>
        <OTPInputView code="123" pinCount={4} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flex: 1,
            borderRadius: 50,
            borderWidth: 1,
            marginRight: 10,
          }}
          onPress={() => setStep(1)}>
          <Text style={{color: '#3460D7', textAlign: 'center'}}>
            Edit number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button_blue_disabled, {flex: 1}]}
          onPress={() => setStep(3)}>
          <Text style={styles.button_blue_text_disabled}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Step3 = props => {
  const {setStep} = props;
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
        <TouchableOpacity style={styles.button_blue} onPress={() => setStep(4)}>
          <Text style={styles.button_blue_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Step4 = props => {
  const {setStep} = props;
  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.button_blue} onPress={() => setStep(4)}>
          <Text style={styles.button_blue_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
    color: '#323232',
  },
  subHeading: {
    color: '#323232',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
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
    cursor: 'none',
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
  edit_btn: {
    border: '1px',
    height: 10,
    width: 40,
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

export default LoginScreen;
