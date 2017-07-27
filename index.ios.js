'use strict';
import * as FirebaseKeys from './config/firebaseKeys';
import * as Firebase from 'firebase';
import * as NavBar from './src/navigation/navigationBar';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Image
} from 'react-native';

// import AuthControl from './src/scenes/authControl';

import Tester from './src/scenes/tester';

import styles from './src/styles/basestyles.js';

const firebaseApp = Firebase.initializeApp(FirebaseKeys.getFirebaseConfig());

class golfmanager extends Component {

  /**
   * ROUTE DEFINITION:
   * {
   *    component: <COMPONENT_NAME>
   *    sceneType: <DEFAULT | UP_SWIPE | DOWN_SWIPE>
   *    showLeftNavButton: <true | false>
   *    showRightNavButton: <true | false>
   *    navHeaderTitle: <String>
   *    sceneBackgroundImage: <require('path_to_image')>
   *    passProps: {
   *      custom properties to pass to the component
   *    }
   * }
   */

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Tester,
          title: 'Here goes nothing'
          passProps: {
              foo: 'bar'
          }
        }}


        // configureScene={(route) => {
        //   if (route && route.passProps) {
        //     if (route.passProps.sceneType === 'UP_SWIPE') {
        //       return Navigator.SceneConfigs.VerticalUpSwipeJump;
        //     } else if (route.passProps.sceneType === 'DOWN_SWIPE') {
        //       return Navigator.SceneConfigs.VerticalDownSwipeJump;
        //     }
        //     // DEFAULT
        //     return Navigator.SceneConfigs.PushFromRight;
        //   }
        // }}
        // renderScene={(route, navigator) => {
        //   let bgImageSource = route.sceneBackgroundImage || require('./src/images/golf_bg_1.jpg');
        //   return (
        //     <Image style={styles.background_image} source={bgImageSource}>
        //       <route.component navigator={navigator} firebaseApp={firebaseApp} {...route.passProps} />
        //     </Image>
        //   );
        //
        // }}
        // navigationBar={
        //   <Navigator.NavigationBar style={styles.navBar} routeMapper={NavBar.navigationBarRouteMapper} />
        // }
      />
    );
  }
}

AppRegistry.registerComponent('golfmanager', () => golfmanager);
