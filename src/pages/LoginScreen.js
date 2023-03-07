import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const animation = useRef(null);
  const inputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [isAnimationHidden, setIsAnimationHidden] = useState(false);

  //   const [phone, setPhone] = useState('9084112090');
  const [phone, setPhone] = useState('8445666963');
  const [confirmation, setConfirmation] = useState();

  useEffect(() => {
    animation?.current?.play();
  }, [step]);

  const renderSteps = () => {
    if (step == 1) {
      return (
        <Step1
          setStep={setStep}
          phone={phone}
          setPhone={setPhone}
          inputRef={inputRef}
          animation={animation}
          isAnimationHidden={isAnimationHidden}
          setIsAnimationHidden={setIsAnimationHidden}
          setConfirmation={setConfirmation}
        />
      );
    } else if (step == 2) {
      return (
        <Step2
          setStep={setStep}
          phone={phone}
          inputRef={inputRef}
          animation={animation}
          isAnimationHidden={isAnimationHidden}
          setIsAnimationHidden={setIsAnimationHidden}
          confirmation={confirmation}
          navigation={navigation}
        />
      );
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
    phone,
    setPhone,
    setConfirmation,
  } = props;

  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (phone.length == 10) {
      setLoading(true);
      try {
        const res = await auth().signInWithPhoneNumber(`+91 ${phone}`);
        setConfirmation(res);
        setStep(2);

        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
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
            value={phone}
            onChangeText={val => setPhone(val)}
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
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            style={
              phone.length == 10
                ? styles.button_blue
                : styles.button_blue_disabled
            }
            onPress={handleSignin}>
            <Text
              style={
                phone.length == 10
                  ? styles.button_blue_text
                  : styles.button_blue_text_disabled
              }>
              Get OTP
            </Text>
          </TouchableOpacity>
        )}
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
    phone,
    confirmation,
    navigation,
  } = props;

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState('1234');

  const interval = setInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }

    if (timer === 0) {
      clearInterval(interval);
    }
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (otp.length > 0) setIsAnimationHidden(true);
    else setIsAnimationHidden(false);
  }, [otp]);

  async function confirmCode() {
    try {
      setLoading(true);
      const res = await confirmation.confirm('123456');
      console.log(res);
      navigation.navigate('OnBoarding');
    } catch (error) {
      console.log('Invalid code.', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Verify phone</Text>
        <Text style={styles.subHeading}>Code is sent to {phone}</Text>

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
        <View
          onPress={() => setIsAnimationHidden(true)}
          style={{
            alignItems: 'center',
          }}>
          <OTPInputView
            code={otp}
            onCodeChanged={e => setOtp(e)}
            ref={inputRef}
            pinCount={4}
            style={{width: '80%', height: 60}}
            codeInputFieldStyle={{borderColor: '#49454F', color: '#323232'}}
            codeInputHighlightStyle={{borderColor: '#3460D7'}}
          />
          {timer == 0 ? (
            <TouchableOpacity onPress={() => setTimer(5)}>
              <Text
                style={{marginTop: 10, fontWeight: '500', color: '#3460D7'}}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{marginTop: 10, fontWeight: '500', color: '#828282'}}>
              RESEND OTP IN {timer} SECONDS
            </Text>
          )}
        </View>
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
          onPress={() => !loading && setStep(1)}>
          <Text style={{color: '#3460D7', textAlign: 'center'}}>
            Edit number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            otp.length < 4 || loading
              ? styles.button_blue_disabled
              : styles.button_blue,
            {flex: 1},
          ]}
          onPress={() => !loading && confirmCode()}>
          {loading ? (
            <ActivityIndicator color="#3460D7" />
          ) : (
            <Text
              style={
                otp.length == 4
                  ? styles.button_blue_text
                  : styles.button_blue_text_disabled
              }>
              Verify
            </Text>
          )}
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
