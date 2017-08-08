'use strict';

import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';

import StartPage from './src/pages/appContainer';

import styles from './src/styles/basestyles.js';

const firebaseApp = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

class golfmanager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: StartPage
    };
  }

  render () {
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
