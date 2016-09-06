/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';
import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text,
  // View,
  Navigator,
  // AsyncStorage
} from 'react-native';

// import Signup from './src/pages/signup';
// import Login from './src/pages/login';
// import Account from './src/pages/account';
import StartPage from './src/pages/appContainer';

// import Header from './src/components/header';
import styles from './src/styles/basestyles.js';

const firebaseApp = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

class golfmanager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: StartPage
    };
  }

  render() {
    return (
      <Navigator
        initialRoute={{component: this.state.component}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if(route.component){
            return React.createElement(route.component, { navigator, firebaseApp });
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('golfmanager', () => golfmanager);
