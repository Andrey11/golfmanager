import React, { Component } from 'react';
import {
  AppRegistry,
  Picker,
  View
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class courseTypePicker extends Component {
  render() {
    return (
      <View style={styes.picker_android}>
        <Picker
          selectedValue={this.props.courseTypeValues[this.props.defaultValue]}
          onValueChange={(type) => {this.props.onValueChange(this.props.courseTypeValues.indexOf(type))}}>
          <Picker.Item label={thos.props.courseTypeValues[0]} value={thos.props.courseTypeValues[0]} />
          <Picker.Item label={thos.props.courseTypeValues[1]} value={thos.props.courseTypeValues[1]} />
          <Picker.Item label={thos.props.courseTypeValues[2]} value={thos.props.courseTypeValues[2]} />
          <Picker.Item label={thos.props.courseTypeValues[3]} value={thos.props.courseTypeValues[3]} />
        </Picker>
      </View>
    );
  }
}

AppRegistry.registerComponent('courseTypePicker', () => courseTypePicker);
