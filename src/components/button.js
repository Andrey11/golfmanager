'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class button extends Component {

  render(){
    return (
      <View style={[localstyles.button_wrapper, this.props.style]}>
        <TouchableHighlight
          underlayColor={'rgba(0, 77, 27, 0.5)'}
          disabled={this.props.disabled}
          onPress={this.props.onpress}
          style={this.props.button_styles}>
          <View style={localstyles.text_wrapper}>
              <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const localstyles = StyleSheet.create({
  button_wrapper: {
    // width: '100%'
    flex: 1,
  },

  text_wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('button', () => button);
