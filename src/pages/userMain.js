'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import Button from '../components/button';

import styles from '../styles/basestyles.js';

export default class usermain extends Component {

	constructor(props){
    super(props);
	}

  componentWillMount() {
    // this.setState({
    //   email: '',
    //   password: ''
    // });
  }

  render() {
    return (
      <View style={styles.body}>
        <Text>{'This is user main page'}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('usermain', () => usermain);
