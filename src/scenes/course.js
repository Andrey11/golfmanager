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
import { CourseTypes } from '../utilities/const';
import Button from '../components/button';
import IconButton from '../components/iconButton';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';


import styles from '../styles/basestyles.js';

export default class course extends Component {

	constructor (props) {
    super(props);

    this.state = {
      renderPlaceholderOnly: true,
      courseName: '',
      courseTypeIndex: 0,
      courseTypeValues: [CourseTypes.FULL, CourseTypes.EXECUTIVE, CourseTypes.PITCH_AND_PUTT, CourseTypes.MINI],
      courseDisplayName: '',
      line1: '',
      line2: '',
      city: '',
      province: '',
      postal_code: '',
      country: '',
      pro_shop_phone: '',
      club_house_phone: '',
      restaurant_phone: '',
      url: '',
      modalVisible: false
    };

    this.onAddCourse = this.onAddCourse.bind(this);
    this.onModalClosed = this.onModalClosed.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onCourseTypePickerChange = this.onCourseTypePickerChange.bind(this);
	}

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  onAddCourse () {
    // TODO: Add validation
    /*
      18-9 hole
    */
    let firebaseApp = this.props.firebaseApp;
    let coursesRef = firebaseApp.database().ref('courses');

    let courseDisplayName = this.state.courseName + ' ,' +
                            this.state.city + ' ,' +
                            this.state.province + ' ,' +
                            this.state.country;

    let courseKey = coursesRef.push().key;

    let courseUpdateData = {};

    courseUpdateData['/courses/' + courseKey] = {
      courseName: this.state.courseName,
      courseDisplayName: courseDisplayName,
      courseType: this.state.courseTypeIndex,
      address: {
        line1: this.state.line1,
        line2: this.state.line2,
        city: this.state.city,
        province: this.state.province,
        postal_code: this.state.postal_code,
        country: this.state.country
      }
    };

    courseUpdateData['courses/names/all/' + courseDisplayName] = courseKey;
    courseUpdateData['courses/names/' + this.state.courseTypeIndex + '/' + courseDisplayName] = courseKey;


    firebaseApp.database().ref().update(courseUpdateData);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onModalClosed () {
    debugger;
  }

  onCourseTypePickerChange (index) {
    this.setState({courseTypeIndex: index});
  }

  addAddress () {

  }

  addTeeBox () {
    
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <View style={styles.body}>

        <TeeBoxParScore onRequestClose={this.onModalClosed} />

        <ScrollView style={styles.scroll_body}>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Golf course name"}
              onChangeText={(text) => this.setState({courseName: text})}
            />
          </View>

          <Text>{'Select course type:'}</Text>
          <CourseTypePicker
            courseTypeValues={this.state.courseTypeValues}
            onValueChange={this.onCourseTypePickerChange}
            defaultValue={this.state.courseTypeIndex}>
          </CourseTypePicker>

          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Address"}
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              value={'Address:'}
            />
            <IconButton
              iconSource={require('../images/ic_add_circle.png')}
              underlayColor={'rgba(255, 255, 255, 0.9)'}
              onButtonPressed={this.addAddress} />
          </View>

          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Add tee box"}
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              value={''}
            />
            <IconButton
              iconSource={require('../images/ic_add_circle.png')}
              underlayColor={'rgba(255, 255, 255, 0.9)'}
              onButtonPressed={this.addAddress} />
          </View>

        </ScrollView>
        <Button
          text="Add course"
          onpress={this.onAddCourse}
          button_styles={styles.primary_button}
          button_text_styles={styles.primary_button_text} />
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


AppRegistry.registerComponent('course', () => course);
