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
        style={this.props.touchableHighlightStyle}
        underlayColor={this.props.underlayColor}
        onPress={() => { this.props.onButtonPressed() }}>
        <Image style={this.props.imageStyle} source={this.props.iconSource} />
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('iconButton', () => iconButton);
