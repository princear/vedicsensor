import React from 'react';
import {
  Box,
  Button,
  Text,
  Icon,
  Toast,
  HStack,
  StatusBar,
  IconButton,
  Center,
  ScrollView,
} from 'native-base';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  requestAccessFineLocationPermission,
  requestBluetoothPermission,
  requestBluetoothScanPermission,
} from '../utils/permissions';
import {BluetoothContext} from '../context';

export default class DeviceListScreen extends React.Component {
  static contextType = BluetoothContext;
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      accepting: false,
      discovering: false,
    };
  }

  componentDidMount() {
    this.getBondedDevices();
    requestBluetoothScanPermission();
  }

  componentWillUnmount() {
    if (this.state.accepting) {
      this.cancelAcceptConnections(false);
    }

    if (this.state.discovering) {
      this.cancelDiscovery(false);
    }
  }

  getBondedDevices = async unloading => {
    console.log('DeviceListScreen::getBondedDevices');
    let granted = await requestBluetoothPermission();

    if (!granted) {
      throw new Error('Bluetooth Access was not granted');
    }

    try {
      let bonded = await RNBluetoothClassic.getBondedDevices();
      console.log('DeviceListScreen::getBondedDevices found', bonded);

      if (!unloading) {
        this.setState({devices: bonded});
      }
    } catch (error) {
      this.setState({devices: []});

      Toast.show({
        description: error.message,
        duration: 5000,
      });
    }
  };

  acceptConnections = async () => {
    if (this.state.accepting) {
      Toast.show({
        description: 'Already accepting connections',
        duration: 5000,
      });

      return;
    }

    this.setState({accepting: true});

    try {
      let device = await RNBluetoothClassic.accept({delimiter: '\r'});
      if (device) {
        this.context.selectDevice(device);
      }
    } catch (error) {
      // If we're not in an accepting state, then chances are we actually
      // requested the cancellation.  This could be managed on the native
      // side but for now this gives more options.
      if (!this.state.accepting) {
        Toast.show({
          description: 'Attempt to accept connection failed.',
          duration: 5000,
        });
      }
    } finally {
      this.setState({accepting: false});
    }
  };

  cancelAcceptConnections = async () => {
    if (!this.state.accepting) {
      return;
    }

    try {
      let cancelled = await RNBluetoothClassic.cancelAccept();
      this.setState({accepting: !cancelled});
    } catch (error) {
      Toast.show({
        description: 'Unable to cancel accept connection',
        duration: 2000,
      });
    }
  };

  startDiscovery = async () => {
    try {
      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error('Access fine location was not granted');
      }

      this.setState({discovering: true});

      let devices = [...this.state.devices];

      try {
        let unpaired = await RNBluetoothClassic.startDiscovery();

        let index = devices.findIndex(d => !d.bonded);
        if (index >= 0) {
          devices.splice(index, devices.length - index, ...unpaired);
        } else {
          devices.push(...unpaired);
        }

        Toast.show({
          description: `Found ${unpaired.length} unpaired devices.`,
          duration: 2000,
        });
      } finally {
        this.setState({devices, discovering: false});
      }
    } catch (err) {
      Toast.show({
        description: err.message,
        duration: 2000,
      });
    }
  };

  cancelDiscovery = async () => {
    try {
    } catch (error) {
      Toast.show({
        description:
          'Error occurred while attempting to cancel discover devices',
        duration: 2000,
      });
    }
  };

  requestEnabled = async () => {
    try {
    } catch (error) {
      Toast.show({
        description: `Error occurred while enabling bluetooth: ${error.message}`,
        duration: 2000,
      });
    }
  };

  render() {
    let toggleAccept = this.state.accepting
      ? () => this.cancelAcceptConnections()
      : () => this.acceptConnections();

    let toggleDiscovery = this.state.discovering
      ? () => this.cancelDiscovery()
      : () => this.startDiscovery();

    return (
      <Box>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="violet.600" />
        <HStack
          bg="violet.800"
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%">
          <HStack alignItems="center">
            <IconButton
              icon={
                <Icon size="sm" as={MaterialIcons} name="menu" color="white" />
              }
            />
            <Text color="white" fontSize="20" fontWeight="bold">
              Devices
            </Text>
          </HStack>
          <HStack>
            {this.context.bluetoothEnabled && (
              <IconButton
                transparent
                onPress={() => {
                  this.getBondedDevices();
                  this.startDiscovery();
                }}
                icon={<Icon as={MaterialIcons} name="cached" />}></IconButton>
            )}
          </HStack>
        </HStack>
        <HStack bg="white" px="1" w="100%" minH="100%">
          <View>
            {this.context.bluetoothEnabled ? (
              <DeviceList
                devices={this.state.devices}
                onPress={this.context.selectDevice}
                navigation={this.props.navigation}
              />
            ) : (
              <View>
                <Center>
                  <Text>Bluetooth is OFF</Text>
                  <Button onPress={() => this.requestEnabled()}>
                    Enable Bluetooth
                  </Button>
                </Center>
              </View>
            )}
          </View>
        </HStack>
      </Box>
    );
  }
}

export const DeviceList = ({devices, onPress, onLongPress, navigation}) => {
  const renderItem = ({item}) => {
    return (
      <DeviceListItem
        device={item}
        onPress={() => onPress(item, navigation)}
        onLongPress={onLongPress}
      />
    );
  };

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={item => item.address}
    />
  );
};

const DeviceListItem = ({device, onPress, onLongPress}) => {
  let bgColor = device.connected ? '#0f0' : '#000';
  let icon = device.bonded ? 'ios-bluetooth' : 'ios-cellular';

  return (
    <TouchableOpacity
      style={styles.deviceListItem}
      onPress={() => onPress(device)}
      onLongPress={() => onLongPress(device)}>
      <View style={styles.deviceListItemIcon}>
        <Ionicons name={icon} color={bgColor} size={24} />
      </View>
      <View>
        <Text>{device.name}</Text>
        <Text note>{device.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  deviceListItemIcon: {
    paddingVertical: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
