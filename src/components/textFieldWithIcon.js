'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput
} from 'react-native';

import basestyles from '../styles/basestyles.js';

export default class textFieldWithIcon extends Component {

  render () {
    return (
      <View style={basestyles.text_field_with_icon}>
        <Image style={basestyles.icon_button} source={this.props.iconSource} />
        <Text style={basestyles.field_label}>{this.props.fieldLabel}</Text>
        <TextInput
          ref="firstnameTextField"
          style={basestyles.textinput}
          keyboardType="default"
          placeholder={''}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('textFieldWithIcon', () => textFieldWithIcon);
