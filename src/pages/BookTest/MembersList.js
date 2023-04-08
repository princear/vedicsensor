import React, {useEffect} from 'react';
import MyText from '../../components/MyText';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const members = [
  {name: 'Rohaan', gender: 'male', age: 21, relation: 'self'},
  {name: 'Navdeep', gender: 'male', age: 23, relation: 'senior'},
];

const MembersList = ({navigation, route}) => {
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

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
      }}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <TouchableOpacity
            style={{width: 20}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color="#1C1B1F" size={24} />
          </TouchableOpacity>
          <MyText
            style={{
              fontWeight: '700',
              fontSize: 18,
              color: '#323232',
              textAlign: 'center',
              flex: 1,
              marginRight: 22,
            }}>
            Book your Test
          </MyText>
        </View>

        <View style={{flexShrink: 1}}>
          <View style={{position: 'absolute', right: 0, zIndex: 1}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="add-circle" size={24} color="#3259CB" />
              <MyText
                style={{color: '#3259CB', marginLeft: 8, fontWeight: '500'}}>
                Add Member
              </MyText>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {members.map(item => {
              return (
                <TouchableOpacity style={{marginBottom: 10}}>
                  <MyText style={{color: '#323232', fontWeight: '600'}}>
                    {item.name}
                  </MyText>
                  <MyText style={{color: '#323232', fontWeight: '600'}}>
                    ({item.relation})
                  </MyText>
                  <MyText style={{color: '#323232', fontWeight: '600'}}>
                    {item.gender}, {item.age}
                  </MyText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 8,
            elevation: 1,
            marginVertical: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <MyText
              style={{
                width: '70%',
                marginBottom: 4,
                color: '#323232',
                fontSize: 12,
              }}>
              Healthy India 2023 Full Body Checkup With Vitamin Screening
            </MyText>
            <MaterialIcons name="info-outline" size={20} color="black" />
          </View>
          <MyText style={{color: '#959595', fontSize: 10}}>
            Parameters (89)
          </MyText>
        </View>

        <View
          style={{
            backgroundColor: '#faf0bf',
            flexDirection: 'row',
            borderRadius: 8,
            height: 60,
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <View
            style={{
              backgroundColor: '#E74749',
              height: 28,
              width: 28,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              marginRight: 16,
            }}>
            <Entypo name="info" size={15} color="#faf0bf" />
          </View>
          <MyText
            style={{
              color: '#E74749',
              fontSize: 12,
              fontWeight: '500',
              width: '90%',
            }}>
            Do not eat or drink anything (except water) 12 hours before the test
          </MyText>
        </View>
      </View>
      <View style={{marginVertical: 20}}>
        <TouchableOpacity style={styles.button_blue} onPress={() => {}}>
          <MyText style={styles.button_blue_text}>Continue</MyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MembersList;

const styles = StyleSheet.create({
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
});
