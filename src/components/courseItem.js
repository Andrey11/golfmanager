'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';

import Round from '../scenes/round';
import IconButton from './iconButton';

import styles from '../styles/basestyles.js';

export default class courseItem extends Component {

  constructor (props) {
    super(props);
	}

  render () {
    return (
      <TouchableHighlight
        underlayColor={'rgba(255, 255, 255, 0.8)'}
        style={styles.selectable_item}
        onPress={() => {this.props.onCourseSelected(this.props.courseName, this.props.courseId)}}>
        <View style={private_css.course_wrapper}>
          <IconButton
            iconSource={require('../images/ic_info_outline.png')}
            pressedParam={{courseId: 'hi'}}
            onButtonPressed={this.props.onViewCourseButtonPressed}>
          </IconButton>
          <View>
            <Text style={private_css.course_name}>{this._getCourseName(this.props.courseName)}</Text>
            <View>
              <Text style={private_css.course_province_city_country}>{this._getCourseLocation(this.props.courseName)}</Text>
            </View>
          </View>
          <IconButton
            iconSource={require('../images/ic_edit.png')}
            pressedParam={{courseId: 'hi'}}
            onButtonPressed={this.props.onEditCourseButtonPressed}>
          </IconButton>
        </View>
      </TouchableHighlight>
    );
  }

  _getCourseName (courseDisplayName) {
    return courseDisplayName.split(',')[0];
  }

  _getCourseLocation (courseDisplayName) {
    return this._getCourseProvinceAndCity(courseDisplayName) + ', ' + this._getCourseCountry(courseDisplayName);
  }

  _getCourseProvinceAndCity (courseDisplayName) {
    let parsedList = courseDisplayName.split(',');
    let length = parsedList.length;
    let dataString = length > 3 ? parsedList[1] + ', ' + parsedList[2] : parsedList[1];
    return dataString;
  }

  _getCourseCountry (courseDisplayName) {
    let courseDisplayNameArray = courseDisplayName.split(',');
    let country = courseDisplayNameArray[courseDisplayNameArray.length - 1];
    return country;
  }
}

AppRegistry.registerComponent('courseItem', () => courseItem);

const private_css = StyleSheet.create({
  course_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  course_name: {
    fontSize: 14,
    fontFamily: 'ArialRoundedMTBold',
  },

  course_province: {

  },

  course_city: {

  },

  course_country: {

  }



});
