import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

// import Test from './src/scenes/tester';
// import AuthControl from './src/scenes/authControl';
import Login from './src/scenes/login';

// import basestyles from './src/styles/basestyles.js';

const firebase = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

// export default class golfmanager extends Component {
//
//   render() {
//     return (
//       <NavigatorIOS
//         style={styles.navContainer}
//         initialRoute={{
//           component: Login,
//           title: 'ttt',
//           backButtonTitle: 'Back'
//         }}/>
//
//     );
//   }
// }

// var styles = StyleSheet.create({
//   navContainer: {
//     flex: 1
//   },
//   container: {
//     flex: 1,
//     padding: 30,
//     marginTop: 65,
//     alignItems: 'stretch'
//   },
// });
//
// class Tester extends Component {
//
//   render () {
//     return (
//         // <View>
//         //   <Text>Loading</Text>
//         // </View>
//         <Test />
//     );
//   }
// }

const golfmanager = StackNavigator({
  Home: { screen: Login },
  // Search: { screen: Search },
  // MessageViewer: { screen: MessageViewer }
});

AppRegistry.registerComponent('golfmanager', () => golfmanager);
