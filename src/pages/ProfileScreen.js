import React, {useContext, useEffect, useRef, useState} from 'react';
import assets from '../../assets';
import MyText from '../components/MyText';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Dimensions,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {MainContext} from '../context';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const mainContext = useContext(MainContext);
  const {isVirtualProfileModalOpen} = mainContext;

  const width = Dimensions.get('window').width;
  const animation = useRef(null);
  const [virtualProfileModalSteps, setVirtualProfileModalSteps] = useState(0);

  useEffect(() => {
    animation?.current?.play();
  }, [virtualProfileModalSteps]);

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.arrow_back}
        onPress={() => navigation.navigate('Health')}>
        <MaterialIcons name="arrow-back" color="#1C1B1F" size={24} />
      </TouchableOpacity>
      <MyText style={{marginTop: 20}}>Profile Page</MyText>
      <TouchableOpacity
        onPress={() => navigation.navigate('CheckZipCode')}
        style={{
          marginTop: 10,
          backgroundColor: '#3259CB',
          width: 100,
          padding: 8,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText style={{color: '#ffffff'}}>Book a test</MyText>
      </TouchableOpacity>
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
              height: 300,
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
                scrollAnimationDuration={160}
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
              <TouchableOpacity>
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

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'red',
    height: 300,
    width: '100%',
  },
  modalBottomContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#818181',

    position: 'absolute',
    bottom: 0,
    height: 65,
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
    marginRight: 4,
  },
  inactive__bluedot: {
    width: 8,
    height: 8,
    backgroundColor: '#bfbfbf',
    borderRadius: 4,
    marginRight: 4,
  },
  arrow_back: {
    width: 30,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  empty_screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  empty_heading: {
    fontWeight: '700',
    fontSize: 18,
    color: '#323232',
    marginTop: -20,
    marginBottom: 10,
  },
  empty_subheading: {
    fontWeight: '300',
    fontSize: 14,
    color: '#323232',
    textAlign: 'center',
    width: '70%',
  },
});
