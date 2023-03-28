import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import assets from '../../assets';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
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

const HealthScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="#1C1B1F" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeviceListScreen')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Devices style={{marginRight: 8}} height={17} width={17} />
            <Text style={{color: '#3460D7', fontWeight: '500'}}>
              Connect device
            </Text>
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
            <Text style={{color: '#3460D7', fontSize: 10, fontWeight: '500'}}>
              TUESDAY 21 FEB
            </Text>
          </View>
          <Text style={{color: '#323232', fontWeight: '700', fontSize: 20}}>
            Hello Vikalp,
          </Text>

          <View
            style={[
              styles.container_blue,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                width: 140,
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
                <Text
                  style={{fontWeight: '400', fontSize: 12, color: '#323232'}}>
                  Your Score
                </Text>
                <Text
                  style={{
                    fontWeight: '800',
                    marginTop: -5,
                    fontSize: 15,
                    color: '#323232',
                  }}>
                  80
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text style={{width: 200, fontWeight: '400'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor..
              </Text>
              <TouchableOpacity style={{marignTop: 20}}>
                <Text
                  style={{color: '#3460D7', fontWeight: '500', marginTop: 10}}>
                  View More
                </Text>
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
            <Text style={{fontWeight: '400', color: '#323232', width: 180}}>
              Last Nadi collection time was at 06:14 am, today
            </Text>
            <TouchableOpacity style={{marignTop: 20}}>
              <Text style={{color: '#3460D7', fontWeight: '500'}}>
                Check Now
              </Text>
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
    </SafeAreaView>
  );
};

const Metrics = () => {
  const windowDimensions = Dimensions.get('window');
  return (
    <>
      <View
        style={{
          marginVertical: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: '700', color: '#323232'}}>
          Metrics
        </Text>
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
          marginBottom: 20,
        }}>
        <View style={[styles.square, {width: windowDimensions.width - 235}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={18}
              color="#E82927"
              style={{marginRight: 10}}
            />
            <Text style={{fontSize: 12, color: '#323232'}}>Heart</Text>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <HeartBeat width={120} height={50} />
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              92
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: '#323232',
                fontWeight: '500',
                position: 'absolute',
                left: 34,
                top: 4,
              }}>
              BPM
            </Text>
            <Text style={{fontSize: 10, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </Text>
          </View>
        </View>
        <View style={[styles.square, {width: windowDimensions.width - 235}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <O2 style={{marginRight: 10}} />
            <Text style={{fontSize: 12, color: '#323232'}}>Oxygen</Text>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <OxygenLevel width={120} height={50} />
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              95
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: '#323232',
                fontWeight: '500',
                position: 'absolute',
                left: 34,
                bottom: 20,
              }}>
              %
            </Text>
            <Text style={{fontSize: 10, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={[styles.square, {width: windowDimensions.width - 235}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <GlucosePoint style={{marginRight: 10}} />
            <Text style={{fontSize: 12, color: '#323232'}}>Blood glucose</Text>
          </View>
          <View style={{marginTop: 12, alignItems: 'center'}}>
            <Glucose width={110} height={40} style={{marginTop: 10}} />
          </View>
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              106
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: '#323232',
                fontWeight: '500',
                position: 'absolute',
                left: 48,
                top: 2,
              }}>
              mg/dl
            </Text>
            <Text style={{fontSize: 10, color: '#323232', fontWeight: '400'}}>
              Last updated 2 hours ago
            </Text>
          </View>
        </View>

        <View style={[styles.square, {width: windowDimensions.width - 235}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FootPrint style={{marginRight: 10}} />
            <Text style={{fontSize: 12, color: '#323232'}}>Steps</Text>
          </View>
          <View
            style={{
              marginTop: 12,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={{fontSize: 26, color: '#323232', fontWeight: '500'}}>
              9,586
            </Text>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 10,
              color: '#323232',
              fontWeight: '400',
            }}>
            Last updated 2 hours ago
          </Text>
        </View>
      </View>
    </>
  );
};

const Card = ({title, details, Svg}) => {
  return (
    <View style={styles.container_blue}>
      <Text style={styles.container_blue_heading}>{title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 90,
          }}>
          <Svg />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{width: 200, fontWeight: '400'}}>{details}</Text>
          <TouchableOpacity style={{marignTop: 20}}>
            <Text
              style={{
                color: '#3460D7',
                fontWeight: '500',
                marginTop: 10,
              }}>
              View More
            </Text>
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
    marginLeft: 30,
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
    height: 180,
  },
});
export default HealthScreen;
