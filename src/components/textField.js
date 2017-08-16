'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  PixelRatio
} from 'react-native';

export default class textField extends Component {

  render () {
    return (
      <View style={localstyles.text_field_wrapper}>
        <Text
          style={localstyles.field_label}>
          {this.props.fieldLabel}
        </Text>
        <TextInput
          style={localstyles.text_input}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

const localstyles = StyleSheet.create({
  text_field_wrapper: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 3,
    borderWidth: 1 / PixelRatio.get()
  },

  text_input: {
    fontSize: 14,
    flex: 2,
    // paddingLeft: 10,
    // paddingRight: 10,
    borderWidth: 0,
    fontFamily: 'ArialRoundedMTBold',
  },

  field_label: {
    fontSize: 14,
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    borderWidth: 0,
    color: 'rgba(140, 140, 140, 1)',
    fontFamily: 'ArialRoundedMTBold',
  },
});


AppRegistry.registerComponent('textField', () => textField);
