import React, { Component } from 'react';
import {
  AppRegistry,
  Picker,
  View
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class courseTypePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseType: 'full'
    };
  }

  onValueChange(type) {
    this.props.onValueChange(type);
    this.setState({courseType: type});
  }

  render() {
    return (
      <View style={styes.picker_android}>
        <Picker
          selectedValue={this.state.courseType}
          onValueChange={(type) => this.setState({courseType: type})}>
          <Picker.Item label="Full" value="full" />
          <Picker.Item label="Executive" value="exec" />
          <Picker.Item label="Pitch and Putt" value="pitchandputt" />
          <Picker.Item label="Mini" value="mini" />
        </Picker>
      </View>
    );
  }
}

AppRegistry.registerComponent('courseTypePicker', () => courseTypePicker);
