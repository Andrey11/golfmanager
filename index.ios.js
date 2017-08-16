import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

// Scenes
import AuthControl from './src/scenes/authControl';
import Login from './src/scenes/login';
import CentralHub from './src/scenes/centralHub';
import SettingsView from './src/scenes/settingsView';
import ResetPassword from './src/scenes/resetPassword';
import Signup from './src/scenes/signup';

import basestyles from './src/styles/basestyles.js';

const firebase = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

class golfmanager extends React.Component {

  constructor(props){
		super(props);

    this._navigator = StackNavigator({
      Home: { screen: AuthControl },
      Login: { screen: Login },
      ResetPassword: { screen: ResetPassword },
      Signup: { screen: Signup },
      CentralHub: { screen: CentralHub },
      SettingsView: { screen: SettingsView },
    });
	}

  render() {
    let Navigator = this._navigator;

    let props = {
      firebase: firebase
    };

    return ( <Navigator screenProps={props} {...this.props} /> );
  }
}



AppRegistry.registerComponent('golfmanager', () => golfmanager);
