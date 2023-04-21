import React, {useState, useContext, useRef, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import assets from '../../assets';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import HeartBeat from '../../assets/heart-beat.svg';
import O2 from '../../assets/o2-drop.svg';
import OxygenLevel from '../../assets/oxygen-level.svg';
import Glucose from '../../assets/glucose.svg';
import GlucosePoint from '../../assets/glucose-point.svg';
import FootPrint from '../../assets/footprint.svg';
import Fire from '../../assets/fire.svg';
import Air from '../../assets/air.svg';
import Waves from '../../assets/waves.svg';
import SunMoon from '../../assets/sun-moon.svg';
import Calender from '../../assets/calender.svg';
import Devices from '../../assets/devices.svg';
import MyText from '../components/MyText';
import WebView from 'react-native-webview';
import BackgroundTimer from 'react-native-background-timer';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainContext} from '../context';
import LottieView from 'lottie-react-native';
import {getUserInfo} from '../utils/user';

const HealthScreen = ({navigation}) => {
  const mainContext = useContext(MainContext);
  const {isVirtualProfileModalOpen} = mainContext;

  const animation = useRef(null);
  const [virtualProfileModalSteps, setVirtualProfileModalSteps] = useState(0);
  const width = Dimensions.get('window').width;

  const [user, setUser] = useState();
  useEffect(() => {
    getUserInfo(mainContext.activeEmail).then(res => {
      setUser(res.data);
    });
  }, [mainContext.activeEmail]);

  useEffect(() => {
    animation?.current?.play();
  }, [virtualProfileModalSteps]);

  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startService = () => {
    const id = BackgroundTimer.setInterval(() => {
      console.log('Triggering service');
      // try calling perform read here
    }, 1000);
    console.log('Started service with interval ID:', id);
    setIntervalId(id);
    setIsRunning(true);
  };

  const stopService = () => {
    console.log('Stopping service with interval ID:', intervalId);
    BackgroundTimer.clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  };

  const renderModalAnimation = index => {
    animation?.current?.play();
    let source =
      index === 0 ? assets.lottieFiles.friends : assets.lottieFiles.quiz;
    return (
      <View
        style={{
          height: 150,
          width: '100%',
          marginBottom: 10,
        }}>
        <LottieView
          ref={animation}
          autoplay={true}
          loop={true}
          source={source}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <View
        style={{
          flexDirection: 'row',
          marginVertical: 30,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => startService()}
          style={{marginRight: 30, backgroundColor: 'lightblue', padding: 6}}>
          <MyText>START</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => stopService()}
          style={{marginRight: 30, backgroundColor: 'lightblue', padding: 6}}>
          <MyText>STOP</MyText>
        </TouchableOpacity>
      </View> */}
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="#1C1B1F" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeviceListScreen');
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Devices style={{marginRight: 8}} height={17} width={17} />
            <MyText style={{color: '#3460D7', fontWeight: '500'}}>
              Connect device
            </MyText>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}>
            <Feather
              name="sun"
              size={12}
              color="#C4B000"
              style={{marginRight: 6}}
            />
            <MyText style={{color: '#3460D7', fontSize: 10, fontWeight: '500'}}>
              TUESDAY 21 FEB
            </MyText>
          </View>
          <MyText style={{color: '#323232', fontWeight: '700', fontSize: 20}}>
            Hello {user?.first_name},
          </MyText>

          <View
            style={[
              styles.container_blue,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                width: 120,
                height: 130,
              }}>
              <View style={styles.radial_container}>
                <RadialSlider
                  variant={'radial-circle-slider'}
                  isHideLines={true}
                  isHideMarkerLine={true}
                  isHideButtons={true}
                  isHideCenterContent={true}
                  isHideTailText={true}
                  sliderTrackColor="#D9D9D9"
                  sliderWidth={6}
                  thumbRadius={0}
                  thumbColor="#FF8B8B"
                  value={80}
                  min={0}
                  max={100}
                  radius={45}
                  markerCircleColor="#FF8B8B"
                  //  onChange={wt => setWeight(wt)}
                />
                <Fire style={{position: 'absolute', left: 13, bottom: 15}} />
                <Air
                  width={40}
                  height={40}
                  style={{position: 'absolute', top: 8, right: 10}}
                />
                <Waves
                  width={20}
                  height={20}
                  style={{position: 'absolute', bottom: 12, right: 16}}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: -2,
                }}>
                <MyText
                  style={{fontWeight: '400', fontSize: 12, color: '#323232'}}>
                  Your Score
                </MyText>
                <MyText
                  style={{
                    fontWeight: '800',
                    marginTop: -5,
                    fontSize: 15,
                    color: '#323232',
                  }}>
                  80
                </MyText>
              </View>
            </View>
            <View style={{justifyContent: 'center', flex: 1}}>
              <MyText style={{width: '90%', fontWeight: '400'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </MyText>
              <TouchableOpacity style={{marignTop: 20}}>
                <MyText
                  style={{color: '#3460D7', fontWeight: '500', marginTop: 10}}>
                  View More
                </MyText>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MyText style={{fontWeight: '400', color: '#323232', width: 180}}>
              Last Nadi collection time was at 06:14 am, today
            </MyText>
            <TouchableOpacity style={{marignTop: 20}}>
              <MyText style={{color: '#3460D7', fontWeight: '500'}}>
                Check Now
              </MyText>
            </TouchableOpacity>
          </View>

          <Metrics />
          <Card
            title="Dosha clock"
            details="Eat your largest meal of the day as digestion strongest..."
            link=""
            Svg={SunMoon}
          />
          <Card
            title="Healthy seasonal tips"
            details="Try avoiding deep fried and very spicy foods..."
            link=""
            Svg={Calender}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVirtualProfileModalOpen}
        onRequestClose={() =>
          mainContext.setState({isVirtualProfileModalOpen: false})
        }>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-end',
          }}>
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              mainContext.setState({isVirtualProfileModalOpen: false})
            }
          />
          <View
            style={{
              height: 320,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}>
            <GestureHandlerRootView>
              <Carousel
                loop={false}
                autoPlay={false}
                width={width}
                data={[1, 2]}
                scrollAnimationDuration={100}
                onSnapToItem={index => {
                  setVirtualProfileModalSteps(index);
                  animation?.current?.play();
                }}
                renderItem={({index, item}) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      {renderModalAnimation(index)}
                      <MyText
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#323232',
                          width: '50%',
                          textAlign: 'center',
                        }}>
                        {index === 0
                          ? 'Recommend healthier lifestyles to friends & family.'
                          : 'A quiz can reveal their physical metrics.'}
                      </MyText>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        {[1, 2].map((_, i) => {
                          return (
                            <View
                              key={i}
                              style={
                                virtualProfileModalSteps == i
                                  ? styles.active__bluedot
                                  : styles.inactive__bluedot
                              }
                            />
                          );
                        })}
                      </View>
                    </View>
                  );
                }}
              />
            </GestureHandlerRootView>
            <View style={styles.modalBottomContainer}>
              <TouchableOpacity
                onPress={() => {
                  mainContext.setState({isVirtualProfileModalOpen: false});
                  navigation.navigate('OnBoarding', {
                    showStatusBar: false,
                    showBottomTabs: false,
                    changeActiveEmail: false,
                  });
                }}>
                <MyText
                  style={{
                    color: '#3460D7',
                    fontWeight: '500',
                    marginRight: 20,
                  }}>
                  Add Account
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  mainContext.setState({isVirtualProfileModalOpen: false});
                  navigation.navigate('VirtualProfilesList');
                }}>
                <MyText style={{color: '#3460D7', fontWeight: '500'}}>
                  Choose existing
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Metrics = () => {
  return (
    <>
      <View style={{height: 200, flexGrow: 1, marginVertical: 20}}>
        <WebView
          source={{
            uri: 'http://grafana.madmachines.in/d-solo/vtJmaDhVk/nadi-monitoring?orgId=1&from=1681131684285&to=1681139825402&var-device_name=device1&panelId=2',
          }}
          style={{flex: 1}}
        />
      </View>
      <View
        style={{
          marginVertical: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <MyText style={{fontSize: 18, fontWeight: '700', color: '#323232'}}>
          Metrics
        </MyText>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="#1c1b1f"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View style={styles.square}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={18}
              color="#E82927"
              style={{marginRight: 10}}
            />
            <MyText style={{fontSize: 12, color: '#323232'}}>Heart</MyText>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <HeartBeat width={120} height={50} />
          </View>
          <View style={{marginTop: 10}}>
            <MyText style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              92
            </MyText>
            <MyText
              style={{
                fontSize: 9,
                color: '#323232',
                fontWeight: '500',
                position: 'absolute',
                left: 34,
                top: 4,
              }}>
              BPM
            </MyText>
            <MyText style={{fontSize: 8, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </MyText>
          </View>
        </View>
        <View style={styles.square}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <O2 style={{marginRight: 10}} />
            <MyText style={{fontSize: 12, color: '#323232'}}>Oxygen</MyText>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <OxygenLevel width={120} height={50} />
          </View>
          <View style={{marginTop: 10}}>
            <MyText style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              99
              <MyText
                style={{
                  fontSize: 9,
                  color: '#323232',
                  fontWeight: '500',
                  position: 'absolute',
                  left: 34,
                  bottom: 20,
                }}>
                %
              </MyText>
            </MyText>
            <MyText style={{fontSize: 8, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </MyText>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.square}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <GlucosePoint style={{marginRight: 10}} />
            <MyText style={{fontSize: 12, color: '#323232'}}>
              Blood glucose
            </MyText>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <Glucose width={110} height={40} style={{marginTop: 10}} />
          </View>
          <View style={{marginTop: 10}}>
            <MyText style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              106
            </MyText>
            <MyText
              style={{
                fontSize: 9,
                color: '#323232',
                fontWeight: '500',
                position: 'absolute',
                left: 48,
                top: 2,
              }}>
              mg/dl
            </MyText>
            <MyText style={{fontSize: 8, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </MyText>
          </View>
        </View>

        <View style={styles.square}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootPrint style={{marginRight: 10}} />
            <MyText style={{fontSize: 12, color: '#323232'}}>Steps</MyText>
          </View>
          <View
            style={{
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <MyText style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              9,586
            </MyText>
          </View>
          <MyText
            style={{
              marginTop: 16,
              fontSize: 8,
              color: '#323232',
              fontWeight: '400',
            }}>
            Last updated 2 hours ago
          </MyText>
        </View>
      </View>
    </>
  );
};

const Card = ({title, details, Svg}) => {
  return (
    <View style={styles.container_blue}>
      <MyText style={styles.container_blue_heading}>{title}</MyText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 90,
          }}>
          <Svg />
        </View>
        <View style={{justifyContent: 'center'}}>
          <MyText style={{width: 200, fontWeight: '400'}}>{details}</MyText>
          <TouchableOpacity style={{marignTop: 20}}>
            <MyText
              style={{
                color: '#3460D7',
                fontWeight: '500',
                marginTop: 10,
              }}>
              View More
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#bcbcbc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  container_blue: {
    height: 150,
    backgroundColor: '#DDE6FF',
    marginTop: 20,
    borderRadius: 16,
  },
  container_blue_heading: {
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#323232',
  },
  radial_container: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 10,
  },
  square: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 0.2,
    borderRadius: 12,
    borderColor: '#323232',
    height: 170,
    flex: 1,
    flexGrow: 1,
    marginRight: 8,
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'red',
    height: 380,
    width: '100%',
  },
  modalBottomContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#818181',

    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  active__bluedot: {
    width: 12,
    height: 8,
    backgroundColor: '#3460D7',
    borderRadius: 4,
    marginRight: 6,
  },
  inactive__bluedot: {
    width: 8,
    height: 8,
    backgroundColor: '#bfbfbf',
    borderRadius: 4,
    marginRight: 6,
  },
});
export default HealthScreen;
