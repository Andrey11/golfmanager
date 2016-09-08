import React, { Component } from 'react';
import {
  AppRegistry,
  SegmentedControlIOS,
  View
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class courseTypePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  onValueChange(index) {
    this.props.onValueChange(index);
    this.setState({selectedIndex: index});
  }

  render() {
    return (
      <SegmentedControlIOS
        values={['Full', 'Executive', 'Pitch & Putt', 'Mini']}
        selectedIndex={this.state.selectedIndex}
        onChange={(event) => {this.onValueChange(event.nativeEvent.selectedSegmentIndex)}}/>
    );
  }
}

AppRegistry.registerComponent('courseTypePicker', () => courseTypePicker);
