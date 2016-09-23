'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  InteractionManager,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import * as RightButtonMapper from '../navigation/rightButtonMapper';

import DatePicker from '../components/datePicker';

export default class selectDate extends Component {

	constructor (props) {
    super(props);

    this.state = {currentDate: new Date()};

    this.onSetDate = this.onSetDate.bind(this);
    this.onDateTimeSelected = this.onDateTimeSelected.bind(this);
	}

  componentDidMount () {
    RightButtonMapper.bindButton(this.props.navigator, this.onSetDate);
    this.setState({currentDate: this.props.currentDate});
  }

  onSetDate () {
    this.props.onDateSelected(this.state.currentDate);
  }

  onDateTimeSelected (date) {
    this.setState({currentDate: date});
  }

  render () {
    return (
      <View style={styles.select_date_body}>
        <View style={styles.text_wrapper}>
          <Text style={styles.text_style}>{'Select Date (required)'}</Text>
        </View>
        <DatePicker onDateSelected={this.onDateTimeSelected} mode={'date'} defaultDate={this.state.currentDate} />

        <View style={styles.text_wrapper}>
          <Text style={styles.text_style}>{'Select Time (optional)'}</Text>
        </View>
        <DatePicker onDateSelected={this.onDateTimeSelected} mode={'time'} defaultDate={this.state.currentDate} />
      </View>
    );
  }
}


AppRegistry.registerComponent('selectDate', () => selectDate);

var styles = StyleSheet.create({
  select_date_body: {
    flex: 1,
    marginTop: 60,
    width: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  text_wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 30,
    backgroundColor: 'rgba(192, 192, 192, 0.7)',
  },

  text_style: {
    fontSize: 18
  }



});
