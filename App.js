/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NativeBaseProvider, Box, Center } from "native-base";
import AppBar from "./src/components/AppBar.js";
import AppFooter from "./src/components/AppFooter.js";
import SampleList from "./src/components/FlatList.js";
import Main from "./src/components/Main.js";
import staticImage from "./assets/icon.png";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    let myTimeout = setTimeout(() => {
      setAlign('flex-start'), setAlignsecond(true);
    }, 3000);
    return () => clearTimeout(myTimeout);
  }, []);

  return (!alignsecond ? (
      <View
        style={[
          styles.container,
          {justifyContent: align}
        ]}>
        <Image
          source={staticImage}
          style={{width: '100%', height: '100%'}}
          />
      </View>
  ) : <Main/>)

  // return (
  //   <NativeBaseProvider>
  //     <Center>
  //       <AppBar/>
  //     </Center>
  //     <SampleList/>
  //   </NativeBaseProvider>
  // );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
});

export default App;
