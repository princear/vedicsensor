import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
//import getTheme from './native-base-theme/components';
//import platform from './native-base-theme/variables/platform';
import ConnectionScreen from './../connection/ConnectionScreen';
import DeviceListScreen from './../device-list/DeviceListScreen';
import HealthScreen from './../pages/HealthScreen.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen.js';
import IntroScreen from './IntroScreen.js';
import OnBoardingScreen from './OnBoardingScreen';
import Questionnaire from './Questionnaire';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedin: false,
      device: undefined,
      bluetoothEnabled: true,
    };
  }

  /**
   * Sets the current device to the application state.  This is super basic
   * and should be updated to allow for things like:
   * - multiple devices
   * - more advanced state management (redux)
   * - etc
   *
   * @param device the BluetoothDevice selected or connected
   */
  selectDevice = device => {
    console.log('App::selectDevice() called with: ', device);
    this.setState({device});
  };

  /**
   * On mount:
   *
   * - setup the connect and disconnect listeners
   * - determine if bluetooth is enabled (may be redundant with listener)
   */
  async componentDidMount() {
    console.log(
      'App::componentDidMount adding listeners: onBluetoothEnabled and onBluetoothDistabled',
    );
    console.log(
      'App::componentDidMount alternatively could use onStateChanged',
    );
    this.enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(event =>
      this.onStateChanged(event),
    );
    this.disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(event =>
      this.onStateChanged(event),
    );

    this.checkBluetootEnabled();
  }

  /**
   * Performs check on bluetooth being enabled.  This removes the `setState()`
   * from `componentDidMount()` and clears up lint issues.
   */
  async checkBluetootEnabled() {
    try {
      console.log('App::componentDidMount Checking bluetooth status');
      let enabled = await RNBluetoothClassic.isBluetoothEnabled();

      console.log(`App::componentDidMount Status: ${enabled}`);
      this.setState({bluetoothEnabled: enabled});
    } catch (error) {
      console.log('App::componentDidMount Status Error: ', error);
      this.setState({bluetoothEnabled: false});
    }
  }

  /**
   * Clear subscriptions
   */
  componentWillUnmount() {
    console.log(
      'App:componentWillUnmount removing subscriptions: enabled and distabled',
    );
    console.log(
      'App:componentWillUnmount alternatively could have used stateChanged',
    );
    this.enabledSubscription.remove();
    this.disabledSubscription.remove();
  }

  /**
   * Handle state change events.
   *
   * @param stateChangedEvent event sent from Native side during state change
   */
  onStateChanged(stateChangedEvent) {
    console.log(
      'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled',
    );

    this.setState({
      bluetoothEnabled: stateChangedEvent.enabled,
      device: stateChangedEvent.enabled ? this.state.device : undefined,
    });
  }

  //   NutritionStack
  // Notification
  // Profile
  tabBarIcon(route, {focused, color, size}) {
    let iconName;
    if (route.name === 'HomeStack') {
      iconName = focused ? 'home-variant' : 'home-outline';
    } else if (route.name === 'ActivityStack') {
      iconName = 'run-fast';
    } else if (route.name === 'NutritionStack') {
      iconName = focused ? 'food-apple' : 'food-apple-outline';
    } else if (route.name === 'Notification') {
      iconName = focused ? 'bell' : 'bell-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
      return <Ionicons name={iconName} size={size} color={color} />;
    }
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  }

  renderHealthScreen() {
    return (
      <DeviceListScreen
        bluetoothEnabled={this.state.bluetoothEnabled}
        selectDevice={this.selectDevice}
      />
    );
  }

  renderSettingsScreen() {
    return (
      <ConnectionScreen
        device={this.state.device}
        onBack={() => this.setState({device: undefined})}
      />
    );
  }

  HealthStack() {
    return (
      <Stack.Navigator
        initialRouteName="Health"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Health" component={HealthScreen} />
      </Stack.Navigator>
    );
  }

  ManageStack() {
    return (
      <Stack.Navigator
        initialRouteName="Manage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Manage" component={HealthScreen} />
      </Stack.Navigator>
    );
  }

  tabStack() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: props => this.tabBarIcon(route, props),
          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 60,
          },
          tabBarItemStyle: {
            margin: 6,
            borderRadius: 10,
          },
        })}>
        <Tab.Screen
          name="HomeStack"
          component={this.HealthStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="ActivityStack"
          component={this.HealthStack}
          options={{
            tabBarLabel: 'Activity',
            title: 'Activity',
          }}
        />
        <Tab.Screen
          name="NutritionStack"
          component={this.ManageStack}
          options={{
            tabBarLabel: 'Nutrition',
            title: 'Nutrition',
          }}
        />
        <Tab.Screen
          name="Notification"
          component={this.ManageStack}
          options={{
            tabBarLabel: 'Notification',
            title: 'Notification',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={this.ManageStack}
          options={{
            tabBarLabel: 'Profile',
            title: 'Profile',
          }}
        />
      </Tab.Navigator>
    );
  }

  authStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
      </Stack.Navigator>
    );
  }

  render() {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          {!this.state.signedin ? this.tabStack() : this.authStack()}
        </NavigationContainer>
      </NativeBaseProvider>
    );
    return (
      <NativeBaseProvider>
        <Box>
          {!this.state.device ? (
            <DeviceListScreen
              bluetoothEnabled={this.state.bluetoothEnabled}
              selectDevice={this.selectDevice}
            />
          ) : (
            <ConnectionScreen
              device={this.state.device}
              onBack={() => this.setState({device: undefined})}
            />
          )}
        </Box>
      </NativeBaseProvider>
    );
  }
}
