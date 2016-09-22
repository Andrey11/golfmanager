import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  DatePickerIOS,
  StyleSheet
} from 'react-native';

// import styles from '../styles/basestyles.js';

export default class datePicker extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <DatePickerIOS
          date={this.props.defaultDate}
          mode={this.props.mode}
          onDateChange={this.props.onDateSelected}
        />
      </View>

    );
  }
}

AppRegistry.registerComponent('datePicker', () => datePicker);

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});
