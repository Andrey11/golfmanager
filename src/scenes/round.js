'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Picker,
  TouchableHighlight,
  Modal
} from 'react-native';

import Button from '../components/button';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';
import IconButton from '../components/iconButton';

import SelectCourse from './selectCourse';
import SelectDate from './selectDate';


import styles from '../styles/basestyles.js';

export default class round extends Component {

  constructor (props) {
    super(props);

    this.state = {
      renderPlaceholderOnly: true,
      courseName: '',
      courseId: '',
      date: null,
      currentUserName: '',
    };

    this.addRound = this.addRound.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.selectDate = this.selectDate.bind(this);

    this.getFormattedDate = this.getFormattedDate.bind(this);
    this.onDateSelected = this.onDateSelected.bind(this);
    this.onCourseSelected = this.onCourseSelected.bind(this);

	}

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.addRound;

    let currentUser = this.props.firebaseApp.auth().currentUser;
    let currentUserName = currentUser.displayName || currentUser.email;
    let currentUserId = currentUser.uid;

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false,
        currentUserName: currentUserName,
        currentUserId: currentUserId
      });
    });
  }

  addRound () {
    // TODO: Save round here

    // Course Name

  }

  selectDate () {
    this.props.navigator.push({
      component: SelectDate,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'SET DATE',
        currentDate: new Date(),
        onDateSelected: this.onDateSelected
      }
    });
  }

  onDateSelected (date) {
    this.props.navigator.pop();
    this.setState({date: date});
  }

  getFormattedDate () {
    const MONTH_NAMES = ["January", "February", "March",  "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"];

    if(this.state.date === null) {
      return '';
    }

    let date = this.state.date;
    date.setUTCSeconds(0);
    let day = date.getDate();
    let month = MONTH_NAMES[date.getMonth()];
    let year = date.getFullYear();
    let time = date.toLocaleTimeString();

    return month + ' ' + day + ' ' + year + ' ' + time;
  }

  selectCourse () {
    this.props.navigator.push({
      component: SelectCourse,
      passProps: {
        navHeaderTitle: 'Select Course',
        leftButton: true,
        rightButton: false,
        onCourseSelected: this.onCourseSelected
      }
    });
  }

  onCourseSelected (courseName, courseId) {
    this.props.navigator.pop();
    this.setState({
      courseName: courseName,
      courseId: courseId
    });
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <View style={styles.add_round_body}>

        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_date_range.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Select date"}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            value={this.getFormattedDate()}
          />
          <IconButton
            icon={require('../images/ic_navigate_next.png')}
            onButtonPressed={this.selectDate} />
        </View>

        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Select course"}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            value={this.state.courseName}
          />
          <IconButton
            icon={require('../images/ic_navigate_next.png')}
            onButtonPressed={this.selectCourse} />
        </View>

        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_person.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            value={this.state.currentUserName}
          />
        </View>

        

        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_person.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Add another player"}
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
          />
          <IconButton
            icon={require('../images/ic_add_circle.png')}
            onButtonPressed={this.selectCourse} />
        </View>


      </View>
    );
  }

  _renderPlaceholderView() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('round', () => round);
