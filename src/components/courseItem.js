'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class courseItem extends Component {

  render () {
    return (
      <TouchableHighlight
        underlayColor={'rgba(255, 255, 255, 0.8)'}
        style={styles.selectable_course_item}
        onPress={() => {this.props.onCourseSelected(this.props.courseName, this.props.courseId)}}>
        <Text>{this.props.courseName}</Text>
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('courseItem', () => courseItem);
