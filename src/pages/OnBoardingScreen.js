import React, {useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {RadialSlider} from 'react-native-radial-slider';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Map from '../components/Map';

const OnBoardingScreen = ({navigation}) => {
  const [onBoardingStep, setOnBoardingStep] = useState(1);
  const [onBoardingDetails, setOnBoardingDetails] = useState({
    first_name: 'rohaan',
    last_name: 'ansari',
    email: 'rohaan@dataorc.in',
    dob: '10/07/2001',
    tob: '15:21', // 24 hrs format
    pob: {
      latitude: 28.62243758781894,
      longitude: 77.2031226195395,
    },
    gender: 'male',
    height: {
      unit: 'ft/in',
      value: '5.7',
    },
    weight: {
      unit: 'kg',
      value: '70',
    },
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
    latitudeDelta: 0.822,
    longitudeDelta: 0.621,
  });

  const renderOnBoadingSteps = () => {
    if (onBoardingStep == 1)
      return (
        <Step1
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
          onBoardingDetails={onBoardingDetails}
          setOnBoardingDetails={setOnBoardingDetails}
        />
      );
  };

  return <SafeAreaView>{renderOnBoadingSteps()}</SafeAreaView>;
};

const Step1 = props => {
  const {setOnBoardingStep, onBoardingDetails, setOnBoardingDetails} = props;
  const handleChange = (k, v) => {
    setOnBoardingDetails({...onBoardingDetails, [k]: v});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Enter your details</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={26} color="#1C1B1F" />
          <TextInput
            style={styles.textField}
            placeholder="First name"
            value={onBoardingDetails.first_name}
            onChangeText={val => handleChange('first_name', val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textField}
            placeholder="Last name"
            value={onBoardingDetails.last_name}
            onChangeText={val => handleChange('last_name', val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.textField}
            placeholder="E mail-id"
            value={onBoardingDetails.email}
            onChangeText={val => handleChange('email', val)}
          />
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
            <TextInput
              style={styles.textField}
              value={dateOfBirth}
              onChangeText={e => setDateOfBirth(e)}
              placeholder="Date of birth"
            />
            <Text style={{marginLeft: 20, marginBottom: 20}}>dd/mm/yyyy</Text>
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
              value={`Lat: ${markerLatLng.latitude.toFixed(
                4,
              )}, Lng: ${markerLatLng.longitude.toFixed(4)}`}
            />
            <Text style={{marginLeft: 20, marginBottom: 20}}>
              Enter the place where you were born.
            </Text>
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
              style={styles.textField}
              placeholder="Time of birth"
              onBlur={() => setIsTimeModalOpen(false)}
              onFocus={() => setIsTimeModalOpen(true)}
            />
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
          <Text style={styles.button_blue_text}>Continue</Text>
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
                <Text style={{color: '#3460D7', fontWeight: '500'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 40}}
                onPress={() => setIsCalenderModalOpen(false)}>
                <Text style={{color: '#3460D7', fontWeight: '500'}}>Ok</Text>
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
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 12, right: 16}}
              onPress={() => setIsMapModalOpen(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  const {
    onBoardingStep,
    setOnBoardingStep,
    onBoardingDetails,
    setOnBoardingDetails,
  } = props;

  const [unit, setUnit] = useState({
    height: 'ft/in',
    weight: 'kg',
  });

  const [heightInteger, setHeightInteger] = useState(6);
  const [heightDecimal, setHeightDecimal] = useState(7);
  const [weight, setWeight] = useState(60);
  const len = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
                  key={`${idx}large`}
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
                  key={`${idx}small`}
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
        }}>
        <RadialSlider
          isHideLines={true}
          isHideMarkerLine={true}
          isHideButtons={true}
          isHideCenterContent={true}
          isHideTailText={true}
          sliderTrackColor="#D9D9D9"
          sliderWidth={30}
          thumbRadius={18}
          thumbColor="#FF8B8B"
          thumbBorderWidth={2}
          //  linearGradient={{offset: '0%', color: '#ffaca6'}}
          value={weight}
          min={0}
          max={200}
          radius={110}
          markerCircleColor="#FF8B8B"
          onChange={wt => setWeight(wt)}
        />

        <View style={{alignItems: 'center', position: 'absolute', bottom: 60}}>
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
              <Text
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Kg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUnit({...unit, weight: 'lbs'})}
              style={[
                styles.tab,
                {
                  backgroundColor: unit.weight == 'lbs' ? '#FF8B8B' : '#DCDCDC',
                },
              ]}>
              <Text
                style={{textAlign: 'center', color: '#323232', fontSize: 12}}>
                Lbs
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button_blue]}
        onPress={() => {
          setOnBoardingDetails({
            ...onBoardingDetails,
            height: {
              unit: unit.height,
              value: `${heightInteger}.${heightDecimal}`,
            },
            weight: {unit: unit.weight, value: weight},
          });
          setOnBoardingStep(5);
        }}>
        <Text style={styles.button_blue_text}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Step5 = props => {
  const {
    navigation,
    onBoardingStep,
    setOnBoardingStep,
    onBoardingDetails,
    setOnBoardingDetails,
  } = props;
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
    fontSize: 20,
    color: '#1C1B1F',
    position: 'absolute',
    top: -35,
    left: -4,
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
