'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';

import styles from '../styles/basestyles.js';

export default class splashScreen extends Component {

	constructor(props){
		super(props);
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

AppRegistry.registerComponent('splashScreen', () => splashScreen);
