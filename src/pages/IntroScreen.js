import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [
  {
    heading: 'The Health Connoisseur',
    subHeading:
      'We help by recommending you better ways to lead a healthy life.',
  },
  {
    heading: 'Understand your Body’s language',
    subHeading:
      'Know different metrics of your body with the help of a designed questionnaire.',
  },
  {
    heading: 'Easy Solution to your problems',
    subHeading:
      'We will help you diagnose any unfriendly exceptions within your system.',
  },
];

const IntroScreen = ({navigation}) => {
  const basePath = '../../assets/';
  const [introStep, setIntroStep] = useState(1);

  return (
    <View style={{height: '100%'}}>
      <View style={styles.imageContainer}>
        {introStep > 1 && (
          <TouchableOpacity onPress={() => setIntroStep(introStep - 1)}>
            <MaterialIcons name="arrow-back" style={styles.arrow_back} />
          </TouchableOpacity>
        )}
        <Image
          style={styles.cloud}
          source={require(basePath + 'bg-blue.png')}
        />
        {/* <Image style={styles.yoga} source={require(basePath + 'fruits.png')} /> */}
      </View>
      <View style={styles.content}>
        <View style={styles.alignCenter}>
          <Text style={styles.title}>{data[introStep - 1].heading}</Text>
          <Text style={styles.subtitle}>{data[introStep - 1].subHeading}</Text>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 40}}>
            {[1, 2, 3].map((item, i) => {
              let activeIdx = introStep - 1;
              return (
                <View
                  key={i}
                  style={
                    activeIdx == i
                      ? styles.active__bluedot
                      : styles.inactive__bluedot
                  }
                />
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.footer_container}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontWeight: '300', color: '#000000'}}>Skip</Text>
        </TouchableOpacity>
        {introStep < 3 && (
          <TouchableOpacity onPress={() => setIntroStep(introStep + 1)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontWeight: '400', color: '#000000', marginBottom: 3}}>
                Next
              </Text>
              <Entypo
                name="chevron-thin-right"
                style={{
                  fontSize: 30,
                  marginLeft: 10,
                  color: '#1C1B1F',
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        {introStep == 3 && (
          <TouchableOpacity
            style={styles.button_blue}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.button_blue_text}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginVertical: 50,
  },
  arrow_back: {
    fontSize: 20,
    color: '#1C1B1F',
    position: 'absolute',
    top: -24,
    left: 10,
  },
  cloud: {
    width: '100%',
    height: 330,
  },
  yoga: {
    position: 'absolute',
  },
  alignCenter: {alignItems: 'center'},
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#323232',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    width: 200,
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
  footer_container: {
    position: 'absolute',
    width: '100%',
    height: 30,
    bottom: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button_blue: {
    height: 40,
    width: 130,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#3460D7',
    justifyContent: 'center',
  },
  button_blue_text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default IntroScreen;
