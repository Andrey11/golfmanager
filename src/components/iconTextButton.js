'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class iconTextButton extends Component {

  render(){
    return (
      <TouchableHighlight
        style={this.props.touchableHighlightStyle}
        underlayColor={this.props.underlayColor}
        onPress={() => { this.props.onButtonPressed() }}>
        <View style={styles.icon_text_button_layout}>
          <Image style={this.props.imageStyle} source={this.props.imageSource} />
          <Text style={this.props.buttonTextStyle}>{this.props.buttonText}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('iconTextButton', () => iconTextButton);
