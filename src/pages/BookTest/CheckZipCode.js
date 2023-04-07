import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const CheckZipCode = ({navigation, route}) => {
  React.useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>CheckZipCode</Text>
    </View>
  );
};

export default CheckZipCode;

const styles = StyleSheet.create({});
