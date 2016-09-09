import React, { Component } from 'react';
import {
  AppRegistry,
  SegmentedControlIOS,
  View
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class courseTypePicker extends Component {
  render () {
    return (
      <SegmentedControlIOS
        ref='courseTypePicker'
        values={this.props.courseTypeValues}
        selectedIndex={this.props.defaultValue}
        onChange={(event) => {this.props.onValueChange(event.nativeEvent.selectedSegmentIndex)}}/>
    );
  }
}

AppRegistry.registerComponent('courseTypePicker', () => courseTypePicker);
