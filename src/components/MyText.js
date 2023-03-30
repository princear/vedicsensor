import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyText = props => {
  return (
    <Text style={[props.style, {fontFamily: 'Poppins'}]}>{props.children}</Text>
  );
};

export default MyText;
