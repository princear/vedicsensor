import React, {useEffect, useRef, useState} from 'react';
import MyText from '../components/MyText';
import {Animated, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Image} from 'react-native';

const data = [
  {id: 1, name: 'Navdeep', email: 'navdeep@dataorc.in'},
  {id: 2, name: 'Mayur', email: 'mj@dataorc.in'},
  {id: 3, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 4, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 5, name: 'Navdeep', email: 'navdeep@dataorc.in'},
  {id: 6, name: 'Mayur', email: 'mj@dataorc.in'},
  {id: 7, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 8, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 9, name: 'Navdeep', email: 'navdeep@dataorc.in'},
  {id: 10, name: 'Mayur', email: 'mj@dataorc.in'},
  {id: 11, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 12, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 13, name: 'Navdeep', email: 'navdeep@dataorc.in'},
  {id: 14, name: 'Mayur', email: 'mj@dataorc.in'},
  {id: 15, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 16, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 17, name: 'Navdeep', email: 'navdeep@dataorc.in'},
  {id: 18, name: 'Mayur', email: 'mj@dataorc.in'},
  {id: 19, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 20, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 21, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 22, name: 'Abhilash', email: 'abhilash@dataorc.in'},
  {id: 23, name: 'Rohaan', email: 'rohaan@dataorc.in'},
  {id: 24, name: 'Rohaan', email: 'rohaan@dataorc.in'},
];

const VirtualProfilesList = ({navigation, route}) => {
  const [accounts, setAccounts] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

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

  const _height = 70;
  const HEIGHT = _height - 1;
  return (
    <>
      {accounts.length === 0 ? (
        <View
          style={{
            paddingHorizontal: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <MyText style={{color: '#323232', fontSize: 20, textAlign: 'center'}}>
            Nothing here, create a profile now
          </MyText>
          <TouchableOpacity
            style={[styles.button_blue, {marginTop: 20}]}
            onPress={() =>
              navigation.navigate('OnBoarding', {
                showStatusBar: false,
                changeActiveEmail: false,
              })
            }>
            <MyText style={{color: '#ffffff', fontSize: 12}}>
              Add a new account
            </MyText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              opacity: 0.9,
              transform: [],
            }}
            blurRadius={6}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Rrx4rWt7UYv5xFbyvg9XbWsg2w2SPTfXenFWns3ftPfTFwWFzexCXDzXt6-fINLVHNQ&usqp=CAU',
            }}
          />

          <Animated.FlatList
            data={accounts}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {
                useNativeDriver: true,
              },
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingHorizontal: 12,
            }}
            renderItem={({item, index}) => {
              const inputRange = [-1, 0, index * HEIGHT, (index + 2) * HEIGHT];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              return (
                <Animated.View
                  style={[
                    styles.profile_container,
                    {height: 70, transform: [{scale}]},
                  ]}
                  key={item.id}>
                  <View>
                    <MyText
                      style={{
                        color: '#323232',
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {item.name}
                    </MyText>
                    <MyText style={{color: '#323232', fontSize: 12}}>
                      {item.email}
                    </MyText>
                  </View>
                  <TouchableOpacity style={styles.button_blue}>
                    <MyText style={styles.button_blue_text}>Select</MyText>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </>
      )}
    </>
  );
};

export default VirtualProfilesList;

const styles = StyleSheet.create({
  profile_container: {
    //  marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //  borderWidth: 1,
    //  borderColor: 'rgba(0, 0, 0, 0.2)',
    borderColor: '#3460D799',
    borderRadius: 8,
    borderBottomWidth: 0,
    //  backgroundColor: 'red',
  },
  button_blue: {
    height: 34,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#3460D7',
    justifyContent: 'center',
  },
  button_blue_text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
});
