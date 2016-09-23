'use strict';
import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import * as NavBar from './src/navigation/navigationBar';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Navigator,
  Image
} from 'react-native';

import AuthControl from './src/scenes/authControl';
import Button from './src/components/button';
import IconButton from './src/components/iconButton';

import styles from './src/styles/basestyles.js';

const firebaseApp = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

class golfmanager extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{
          component: AuthControl,
          passProps: {
            navHeaderTitle: '',
            leftButton: false,
            rightButton: false
          }
        }}
        configureScene={(route) => {
          if (route && route.passProps && route.passProps.sceneType) {
            // 'SETTINGS' : {
              return Navigator.SceneConfigs.VerticalDownSwipeJump;
            //}
          } else {
            return Navigator.SceneConfigs.PushFromRight;
          }
        }}
        renderScene={(route, navigator) => {
          let bgImageSource = require('./src/images/golf_bg_1.jpg');

          if (route.passProps && route.passProps.bgImageSource) {
            bgImageSource = route.passProps.bgImageSource;
          }

          return (
            <Image style={styles.background_image} source={bgImageSource}>
              <route.component navigator={navigator} firebaseApp={firebaseApp} {...route.passProps} />
            </Image>
          );

        }}
        navigationBar={
          <Navigator.NavigationBar style={styles.navBar} routeMapper={NavBar.navigationBarRouteMapper} />
        }
      />
    );
  }
}

AppRegistry.registerComponent('golfmanager', () => golfmanager);
