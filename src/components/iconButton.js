'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class iconButton extends Component {

  render () {
    return (
      <TouchableHighlight onPress={this.props.onButtonPressed}>
        <Image style={styles.icon_button} source={this.props.icon} />
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('iconButton', () => iconButton);
