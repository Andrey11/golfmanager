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
          <Navigator.NavigationBar style={styles.navBar} routeMapper={NavigationBarRouteMapper} />
        }
      />
    );
  }
}

AppRegistry.registerComponent('golfmanager', () => golfmanager);

// TODO: This really shout live somewhere else, so where?
var NavigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    if(route.passProps.leftButton) {
      return (
        <IconButton
          icon={require('./src/images/ic_arrow_back.png')}
          onButtonPressed={() => { navigator.pop() }}>
        </IconButton>
      );

    } else {
      return null;
    }
  },
  RightButton (route, navigator, index, navState) {
    if (route.passProps.rightButton) {
      if (route.passProps.rightButtonName) {
        return (
          <Button
            text={route.passProps.rightButtonName}
            onpress={() => route.passProps.onRightButtonPress()}
            button_styles={styles.login_button}
            button_text_styles={styles.login_button_text} />
        );
      } else {
        return (
          <IconButton
            icon={require('./src/images/ic_settings.png')}
            onButtonPressed={() => route.passProps.onRightButtonPress()}>
          </IconButton>
        );
      }
    } else {
      return null;
    }
  },
  Title (route, navigator, index, navState) {
    return <Text style={ styles.navTitle }>{route.passProps.navHeaderTitle}</Text>
  }
};
