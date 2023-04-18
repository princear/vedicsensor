import React, {useContext, useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {RadialSlider} from 'react-native-radial-slider';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Map from '../components/Map';
import MyText from '../components/MyText';
import {Pressable} from 'react-native';
import {isEmailValid} from '../utils/validations';
import Boy from '../../assets/boy.svg';
import Girl from '../../assets/girl.svg';
import Statusbar from '../components/Statusbar';
import {AuthContext} from '../context';
import {
  getDataFromAsyncStorage,
  storeDataToAsyncStorage,
} from '../utils/asyncStorage';
import {BASE_URL, TOKEN} from '@env';
import {Toast} from 'native-base';
import {ActivityIndicator} from 'react-native';

const OnBoardingScreen = ({navigation, route}) => {
  const [onBoardingStep, setOnBoardingStep] = useState(1);
  const [onBoardingDetails, setOnBoardingDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    tob: '', // 24 hrs format
    pob: {
      latitude: 28.62243758781894,
      longitude: 77.2031226195395,
    },
    gender: '',
    height: {
      unit: 'ft/in',
      value: '5.7',
    },
    weight: {
      unit: 'kg',
      value: '70',
    },
    phone_number: '',
  });

  const [timeOfBirth, setTimeOfBirth] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [markerLatLng, setMarkerLatLng] = useState({
    latitude: 28.62243758781894,
    longitude: 77.2031226195395,
  });
  const [region, setRegion] = useState({
    latitude: 28.62243758781894,
    longitude: 77.2031226195395,
    latitudeDelta: 0.92,
    longitudeDelta: 0.851,
  });

  const [address, setAddress] = useState({
    city: '',
    state: '',
    country: '',
  });

  const [showStatusBar, setShowStatusBar] = useState(true);
  const [changeActiveEmail, setChangeActiveEmail] = useState(true);

  const getPhoneNumber = async () => {
    return await getDataFromAsyncStorage('phone_number');
  };
  useEffect(() => {
    if (route?.params?.showStatusBar != undefined) {
      setShowStatusBar(route?.params?.showStatusBar);
    }
    if (route?.params?.changeActiveEmail != undefined) {
      setChangeActiveEmail(route?.params?.changeActiveEmail);
    }

    getPhoneNumber().then(phone => {
      setOnBoardingDetails({
        ...onBoardingDetails,
        phone_number: `${phone}`,
      });
    });
  }, [route]);

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

  const renderOnBoadingSteps = () => {
    if (onBoardingStep == 1)
      return (
        <Step1
          route={route}
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
        />
      );
    else if (onBoardingStep == 2)
      return (
        <Step2
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
          timeOfBirth={timeOfBirth}
          setTimeOfBirth={setTimeOfBirth}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          markerLatLng={markerLatLng}
          setMarkerLatLng={setMarkerLatLng}
          region={region}
          setRegion={setRegion}
          address={address}
          setAddress={setAddress}
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
          changeActiveEmail={changeActiveEmail}
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
          changeActiveEmail={changeActiveEmail}
          onBoardingStep={onBoardingStep}
          setOnBoardingStep={setOnBoardingStep}
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
        />
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showStatusBar && onBoardingStep < 5 && (
        <View style={{marginBottom: 30}}>
          <Statusbar numberOfBars={5} completedBars={onBoardingStep + 1} />
        </View>
      )}
      {onBoardingStep > 1 && onBoardingStep < 5 && (
        <TouchableOpacity
          onPress={() => setOnBoardingStep(onBoardingStep - 1)}
          style={styles.arrow_back}>
          <MaterialIcons name="arrow-back" color="#1C1B1F" size={22} />
        </TouchableOpacity>
      )}
      {renderOnBoadingSteps()}
    </SafeAreaView>
  );
};

const Step1 = props => {
  const {setOnBoardingStep, onBoardingDetails, setOnBoardingDetails} = props;
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const ref_last_name = useRef();
  const ref_email = useRef();

  const handleChange = (k, v) => {
    setOnBoardingDetails({...onBoardingDetails, [k]: v});
  };

  useEffect(() => {
    if (
      onBoardingDetails?.email !== '' &&
      isEmailValid(onBoardingDetails?.email) === false
    ) {
      setError('Please provide a valid email');
    } else {
      setError(false);
    }
    if (
      onBoardingDetails?.first_name === '' ||
      onBoardingDetails?.last_name === '' ||
      onBoardingDetails?.email === '' ||
      isEmailValid(onBoardingDetails?.email) === false
    ) {
      setDisabled(true);
    } else setDisabled(false);
  }, [onBoardingDetails]);

  return (
    <>
      <View style={{flex: 1}}>
        <MyText style={styles.heading}>Enter your details</MyText>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={26} color="#1C1B1F" />
          <TextInput
            style={styles.textField}
            placeholder="First name"
            value={onBoardingDetails.first_name}
            onChangeText={val => handleChange('first_name', val)}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              ref_last_name?.current?.focus();
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref_last_name}
            style={styles.textField}
            placeholder="Last name"
            value={onBoardingDetails.last_name}
            onChangeText={val => handleChange('last_name', val)}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              ref_email?.current?.focus();
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <TextInput
            ref={ref_email}
            style={styles.textField}
            placeholder="E mail-id"
            value={onBoardingDetails.email}
            onChangeText={val => handleChange('email', val)}
          />
          {error && (
            <MyText
              style={{
                position: 'absolute',
                left: 40,
                bottom: -22,
                color: '#F94F41',
                fontSize: 12,
              }}>
              {error}
            </MyText>
          )}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={disabled ? styles.button_blue_disabled : styles.button_blue}
          onPress={() => {
            !disabled && setOnBoardingStep(2);
          }}>
          <MyText
            style={
              disabled
                ? styles.button_blue_text_disabled
                : styles.button_blue_text
            }>
            Continue
          </MyText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Step2 = props => {
  const {
    onBoardingStep,
    setOnBoardingStep,
    timeOfBirth,
    setTimeOfBirth,
    dateOfBirth,
    setDateOfBirth,
    markerLatLng,
    setMarkerLatLng,
    region,
    setRegion,
    onBoardingDetails,
    setOnBoardingDetails,
    address,
    setAddress,
  } = props;
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [isCalenderModalOpen, setIsCalenderModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (false) {
      setDisabled(true);
    } else setDisabled(false);
  }, [onBoardingDetails]);

  return (
    <>
      <View style={{flex: 1}}>
        <MyText style={styles.heading}>Enter your details</MyText>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="redeem" size={24} color="black" />
          <View style={{width: '95%'}}>
            <TextInput
              style={styles.textField}
              value={dateOfBirth}
              onChangeText={e => setDateOfBirth(e)}
              placeholder="Date of birth"
              onBlur={() => setIsCalenderModalOpen(false)}
              onFocus={() => setIsCalenderModalOpen(true)}
            />
            <MyText style={{marginLeft: 20, marginBottom: 20}}>
              dd/mm/yyyy
            </MyText>
            <TouchableOpacity
              onPress={() => setIsCalenderModalOpen(true)}
              style={{position: 'absolute', top: 11, right: 25}}>
              <MaterialIcons name="date-range" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={26}
            color="black"
          />
          <View style={{width: '95%'}}>
            <TextInput
              style={styles.textField}
              placeholder="Place of birth"
              value={`${address.city}${address.state}${address.country}`}
              onBlur={() => setIsMapModalOpen(false)}
              onFocus={() => setIsMapModalOpen(true)}
            />
            <MyText style={{marginLeft: 20, marginBottom: 20}}>
              Enter the place where you were born.
            </MyText>
            <TouchableOpacity
              onPress={() => setIsMapModalOpen(true)}
              style={{position: 'absolute', top: 11, right: 25}}>
              <Ionicons name="md-pin-sharp" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={26}
            color="black"
          />
          <View style={{width: '95%'}}>
            <TextInput
              value={timeOfBirth}
              onChangeText={val => setTimeOfBirth(val)}
              style={styles.textField}
              placeholder="Time of birth"
              onBlur={() => setIsTimeModalOpen(false)}
              onFocus={() => setIsTimeModalOpen(true)}
            />
            <MyText style={{marginLeft: 20}}>
              Enter if you are sure of the time.
            </MyText>
            <MyText style={{marginLeft: 20, marginBottom: 20}}>
              Note: Ask your parents.
            </MyText>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={disabled ? styles.button_blue_disabled : styles.button_blue}
          onPress={() => {
            setOnBoardingDetails({
              ...onBoardingDetails,
              dob: dateOfBirth,
              tob: timeOfBirth,
              pob: {
                latitude: markerLatLng.latitude,
                longitude: markerLatLng.longitude,
              },
            });
            setOnBoardingStep(3);
          }}>
          <MyText
            style={
              disabled
                ? styles.button_blue_text_disabled
                : styles.button_blue_text
            }>
            Continue
          </MyText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalenderModalOpen}
        onRequestClose={() => setIsCalenderModalOpen(false)}>
        <View style={{flex: 1, backgroundColor: '#00000099'}}>
          <View style={styles.modal_content}>
            <CalendarPicker
              weekdays={weekdays}
              months={months}
              previousComponent={
                <MaterialIcons name="chevron-left" size={28} color="black" />
              }
              nextComponent={
                <MaterialIcons name="chevron-right" size={28} color="black" />
              }
              selectedDayColor="#3460D7"
              selectedDayTextColor="#ffffff"
              todayTextStyle="#000000"
              value={dateOfBirth}
              onDateChange={event => {
                let date = moment(event).format('DD/MM/YYYY');
                setDateOfBirth(date);
              }}
            />
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 30,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => setIsCalenderModalOpen(false)}>
                <MyText style={{color: '#3460D7', fontWeight: '500'}}>
                  Cancel
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 40}}
                onPress={() => setIsCalenderModalOpen(false)}>
                <MyText style={{color: '#3460D7', fontWeight: '500'}}>
                  Ok
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isTimeModalOpen && (
        <RNDateTimePicker
          display="clock"
          mode="time"
          positiveButton={{label: 'Done'}}
          value={new Date()}
          onChange={(event, date) => {
            setTimeOfBirth(`${date.getHours()}:${date.getMinutes()}`);
            setIsTimeModalOpen(false);
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMapModalOpen}
        onRequestClose={() => setIsMapModalOpen(false)}>
        <View style={{flex: 1, backgroundColor: '#00000099'}}>
          <View
            style={[
              styles.modal_content,
              {height: 600, paddingTop: 0, overflow: 'hidden'},
            ]}>
            <Map
              height={600}
              markerLatLng={markerLatLng}
              setMarkerLatLng={setMarkerLatLng}
              region={region}
              setRegion={setRegion}
              setAddress={setAddress}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                backgroundColor: '#3460D7',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 16,
              }}
              onPress={() => setIsMapModalOpen(false)}>
              {/* <Ionicons name="close" size={24} color="black" /> */}
              <MyText style={{color: '#ffffff'}}> Done</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const Step3 = props => {
  const {
    onBoardingDetails,
    setOnBoardingDetails,
    onBoardingStep,
    setOnBoardingStep,
  } = props;

  const windowDimensions = Dimensions.get('window');
  const animation_male = useRef(null);
  const animation_female = useRef(null);

  useEffect(() => {
    animation_male?.current?.play();
    animation_female?.current?.play();
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <MyText style={styles.heading}>Hello Vikalp,</MyText>
        <MyText style={styles.subHeading}>Which one are you?</MyText>

        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            style={[
              styles.box_outside,
              {
                marginRight: 8,
                borderColor:
                  onBoardingDetails.gender == 'male' ? '#3460D7' : '#6750A40D',
              },
            ]}
            onPress={() =>
              setOnBoardingDetails({...onBoardingDetails, gender: 'male'})
            }>
            <View style={styles.box_inside}>
              <LottieView
                style={styles.gender_animation}
                ref={animation_male}
                autoplay={true}
                loop={true}
                source={assets.lottieFiles.male}
              />
              <MyText style={styles.gender_text}>Male</MyText>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              setOnBoardingDetails({...onBoardingDetails, gender: 'female'})
            }
            style={[
              styles.box_outside,
              {
                marginLeft: 8,
                borderColor:
                  onBoardingDetails.gender == 'female'
                    ? '#3460D7'
                    : '#6750A40D',
              },
            ]}>
            <View style={styles.box_inside}>
              <LottieView
                style={styles.gender_animation}
                ref={animation_female}
                autoplay={true}
                loop={true}
                source={assets.lottieFiles.female}
              />
              <MyText style={styles.gender_text}>Female</MyText>
            </View>
          </Pressable>
        </View>
        <View style={{alignItems: 'center', marginTop: 22}}>
          <MyText
            style={{
              paddingHorizontal: 30,
              textAlign: 'center',
              fontWeight: '500',
              width: '98%',
              letterSpacing: 1,
            }}>
            To give you customized experience we need to know your gender.
          </MyText>
        </View>
      </View>

      <TouchableOpacity
        style={
          onBoardingDetails.gender === ''
            ? styles.button_blue_disabled
            : styles.button_blue
        }
        onPress={() => onBoardingDetails.gender !== '' && setOnBoardingStep(4)}>
        <MyText
          style={
            onBoardingDetails.gender === ''
              ? styles.button_blue_text_disabled
              : styles.button_blue_text
          }>
          Continue
        </MyText>
      </TouchableOpacity>
    </>
  );
};

const Step4 = props => {
  const {
    changeActiveEmail,
    onBoardingStep,
    setOnBoardingStep,
    onBoardingDetails,
    setOnBoardingDetails,
  } = props;

  const [unit, setUnit] = useState({
    height: 'ft/in',
    weight: 'kg',
  });

  const [heightInteger, setHeightInteger] = useState(5);
  const [heightDecimal, setHeightDecimal] = useState(7);
  const [weight, setWeight] = useState(60);
  const [loading, setLoading] = useState(false);
  const len = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const postOnBoardingDetails = async () => {
    setLoading(true);
    setOnBoardingDetails({
      ...onBoardingDetails,
      height: {
        unit: unit.height,
        value: `${heightInteger}.${heightDecimal}`,
      },
      weight: {unit: unit.weight, value: weight},
    });

    const url = `${BASE_URL}/v1/api/add-user-health-info`;
    const firebase_token = await getDataFromAsyncStorage('token');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(onBoardingDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKEN,
      },
    })
      .then(resp => {
        setLoading(false);
        setOnBoardingStep(5);
        console.log(onBoardingDetails);
        console.log(resp);
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          description: 'Something went wrong',
          duration: 2000,
        });
      });
  };

  return (
    <>
      <View style={{flex: 1}}>
        <MyText style={styles.heading}>Hello Vikalp,</MyText>
        <MyText style={styles.subHeading}>
          We need your height and weight.
        </MyText>

        <View style={{alignItems: 'center'}}>
          <TextInput
            style={styles.tab_text}
            keyboardType="numeric"
            placeholder="-"
            value={`${heightInteger}.${heightDecimal}`}
            editable={false}
            selectTextOnFocus={false}
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
              <MyText
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Ft/in
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnit({...unit, height: 'cm'})}
              style={[
                styles.tab,
                {
                  backgroundColor: unit.height == 'cm' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <MyText
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Cm
              </MyText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.slider_container}>
          <View style={styles.slider_left_contianer}>
            <Slider
              style={styles.slider_left}
              step={1}
              minimumValue={0}
              maximumValue={12}
              value={heightInteger}
              onValueChange={val => setHeightInteger(val)}
              thumbTintColor="#FF8B8B"
              minimumTrackTintColor="#DCDCDC"
              maximumTrackTintColor="#DCDCDC"
            />

            {len.map((item, idx) => (
              <>
                <View
                  key={Math.random() * idx}
                  style={[styles.dash_sm_left, {left: 26.5 + idx * 22}]}
                />
                <View
                  key={idx}
                  style={[styles.dash_left, {left: 15.5 + idx * 22}]}
                />
              </>
            ))}
          </View>
          <View>
            {onBoardingDetails.gender == 'male' ? (
              <Boy width={200} height={240} />
            ) : (
              <Girl
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
              step={1}
              minimumValue={0}
              maximumValue={12}
              thumbTintColor="#FF8B8B"
              minimumTrackTintColor="#DCDCDC"
              maximumTrackTintColor="#DCDCDC"
              value={heightDecimal}
              onValueChange={val => setHeightDecimal(val)}
            />
            {len.map((_, idx) => (
              <>
                <View
                  key={idx}
                  style={[styles.dash_right, {left: 15.5 + idx * 22}]}
                />
                <View
                  key={Math.random() + idx + Math.random()}
                  style={[styles.dash_sm_right, {left: 26.5 + idx * 22}]}
                />
              </>
            ))}
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: 20,
          height: 160,
        }}>
        <RadialSlider
          isHideLines={true}
          isHideMarkerLine={true}
          isHideButtons={true}
          isHideCenterContent={true}
          isHideTailText={true}
          sliderTrackColor="#D9D9D9"
          sliderWidth={16}
          thumbRadius={12}
          thumbColor="#FF8B8B"
          thumbBorderWidth={2}
          //  linearGradient={{offset: '0%', color: '#ffaca6'}}
          value={weight}
          min={0}
          max={200}
          radius={80}
          markerCircleColor="#FF8B8B"
          onChange={wt => setWeight(wt)}
        />

        <View style={{alignItems: 'center', position: 'absolute', bottom: 20}}>
          <TextInput
            style={styles.tab_text}
            keyboardType="numeric"
            placeholder="-"
            value={`${weight}`}
            editable={false}
            selectTextOnFocus={false}
          />
          <View
            style={{
              backgroundColor: '#DCDCDC',
              flexDirection: 'row',
              borderRadius: 16,
            }}>
            <TouchableOpacity
              onPress={() => setUnit({...unit, weight: 'kg'})}
              style={[
                styles.tab,
                {
                  backgroundColor: unit.weight == 'kg' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <MyText
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Kg
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnit({...unit, weight: 'lbs'})}
              style={[
                styles.tab,
                {
                  backgroundColor: unit.weight == 'lbs' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <MyText
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Lbs
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={loading ? styles.button_blue_disabled : styles.button_blue}
        onPress={() => {
          if (changeActiveEmail) {
            storeDataToAsyncStorage('active_email', onBoardingDetails.email);
          }
          if (!loading) postOnBoardingDetails();
        }}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#3460D7" />
          </>
        ) : (
          <MyText style={styles.button_blue_text}>Done</MyText>
        )}
      </TouchableOpacity>
    </>
  );
};

const Step5 = props => {
  const {
    navigation,
    changeActiveEmail,
    onBoardingStep,
    setOnBoardingStep,
    onBoardingDetails,
    setOnBoardingDetails,
  } = props;
  const authContext = useContext(AuthContext);

  const animation = useRef();

  useEffect(() => {
    animation?.current?.play();
  }, []);

  return (
    <>
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
        <MyText
          style={{
            fontSize: 20,
            color: '#323232',
            fontWeight: '700',
            marginBottom: 6,
          }}>
          Great!
        </MyText>
        <MyText
          style={{
            fontSize: 18,
            color: '#323232',
            fontWeight: '500',
            width: 240,
            textAlign: 'center',
          }}>
          We are happy to welcome you onboard.
        </MyText>
      </View>
      <TouchableOpacity
        style={[styles.button_blue]}
        onPress={() => {
          if (!changeActiveEmail) navigation.navigate('Health');
          authContext?.authenticate();
        }}>
        <MyText style={styles.button_blue_text}>Continue</MyText>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modal_content: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 450,
    paddingTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dash_left: {
    width: 1,
    height: 20,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 18,
  },
  dash_sm_left: {
    width: 1,
    height: 12,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    top: 18,
  },
  dash_right: {
    width: 1,
    height: 20,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    left: 37.5,
    bottom: 18,
  },
  dash_sm_right: {
    width: 1,
    height: 12,
    backgroundColor: '#d9d9d9',
    position: 'absolute',
    bottom: 18,
  },
  arrow_back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  slider_container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    height: 300,
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
    flexGrow: 1,
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
    paddingTop: 55,
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
    alignItems: 'center',
  },
  textField: {
    borderColor: '#49454F',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 14,
    paddingLeft: 10,
    width: '90%',
  },
});

export default OnBoardingScreen;
