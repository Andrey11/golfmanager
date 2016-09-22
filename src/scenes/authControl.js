'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image
} from 'react-native';

import CentralHub from './centralHub';
import Settings from './settings';
import Login from './login';

import GiftedSpinner from 'react-native-gifted-spinner';

import styles from '../styles/basestyles.js';

export default class authControl extends Component {

	constructor(props){
		super(props);

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
	}

  componentDidMount () {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();
    fbAuth.onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged (user) {
    let route = {};
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let currentSceneName = currentScene.component.name;

    if (user !== null) {
      route = {
        component: CentralHub,
        passProps: {
          navHeaderTitle: 'Central Hub',
          leftButton: false,
          rightButton: true
        }
      };

      if (currentSceneName == 'authControl') {
        this.props.navigator.push(route);
      } else {
        this.props.navigator.replace(route);
      }

    } else {
      route = {
        component: Login,
        passProps: {
          navHeaderTitle: '',
          leftButton: false,
          rightButton: true,
          rightButtonName: 'LOGIN',
        }
      }

      if (currentSceneName == 'settings') {
        this.props.navigator.replaceAtIndex(route, 1, ()=>{
          this.props.navigator.popToRoute(route);
        });
      } else {
        this.props.navigator.push(route);
      }
    }
  }

  render() {
    return (

        <View style={styles.start_page__body}>
          <Text style={styles.start_page__text}>Loading</Text>
          <GiftedSpinner />
        </View>

    );
  }
}

AppRegistry.registerComponent('authControl', () => authControl);
