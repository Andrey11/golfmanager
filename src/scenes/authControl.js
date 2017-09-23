'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ActivityIndicator,
  Image
} from 'react-native';

import BackgroundImage from '../components/backgroundImage';

import styles from '../styles/basestyles.js';

export default class authControl extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'TEST',
    // header: <View style={styles.teset}></View>
  });

	constructor (props) {
    super(props);
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.firebase = this.props.screenProps.firebase;
	}

  componentDidMount () {
    let fbAuth = this.firebase.auth();
    fbAuth.onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged (user) {

    let nav = this.props.navigation;

    // var route = {};
    // var routeStack = [];
    // var currentRoutesArray = this.props.navigator.getCurrentRoutes();
    // let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    // let currentSceneName = currentScene.component.name;
    //

    // if (user === null) {
    //   nav.navigate('Login');
    // } else {
    //   nav.navigate('CentralHub');
    // }

    // if (user !== null) {
    //   route = {
    //     component: CentralHub,
    //     passProps: {
    //       navHeaderTitle: 'Home',
    //       leftButton: false,
    //       rightButton: true
    //     }
    //   };
    //
    //   if (currentSceneName == 'authControl') {
    //     this.props.navigator.push(route);
    //   } else {
    //     this.props.navigator.replace(route);
    //   }
    //
    // } else {
    //   route = {
    //     component: Login,
    //     passProps: {
    //       navHeaderTitle: '',
    //       leftButton: false,
    //       rightButton: true,
    //       rightButtonName: 'LOGIN',
    //     }
    //   };
    //
    //   if (currentSceneName == 'settingsView') {
    //     routeStack.push(currentRoutesArray[0]);
    //     routeStack.push(route);
    //     this.props.navigator.immediatelyResetRouteStack(routeStack);
    //   } else {
    //     this.props.navigator.push(route);
    //   }
    // }
  }

  render () {
    // <Image style={styles.background_image} source={require('../images/golf_bg_1.jpg')}/>
    // <View style={styles.start_page__body}>
    // <ActivityIndicator size='large' />
    // </View>
    return (
      <BackgroundImage>
        <ActivityIndicator size='large' />
      </BackgroundImage>
    );
  }
}

AppRegistry.registerComponent('authControl', () => authControl);
