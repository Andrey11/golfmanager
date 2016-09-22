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
      <TouchableHighlight
        style={this.props.buttonStyle}
        underlayColor={'rgba(255, 255, 255, 0.0)'}
        onPress={() => { this.props.onButtonPressed() }}>
        <Image style={styles.icon_button} source={this.props.icon} />
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('iconButton', () => iconButton);
