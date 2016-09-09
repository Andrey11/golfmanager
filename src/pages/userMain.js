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


import styles from '../styles/basestyles.js';

export default class usermain extends Component {

	constructor (props) {
    super(props);

    this.state = {renderPlaceholderOnly: true};

    this.onAddCourse = this.onAddCourse.bind(this);
    this.onModalClosed = this.onModalClosed.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onCourseTypePickerChange = this.onCourseTypePickerChange.bind(this);
	}

  componentWillMount () {
    this.setState({
      courseName: '',
      courseTypeIndex: 0,
      courseTypeValues: ['Full', 'Executive', 'Pitch & Putt', 'Mini'],
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
    });
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

    let courseDisplayName = this.state.courseName + ',' +
                            this.state.city + ',' +
                            this.state.province + ',' +
                            this.state.country;

    let courseKey = coursesRef.push().key;

    let courseUpdateData = {};

    courseUpdateData['/courses/' + courseKey] = {
      courseName: this.state.courseName,
      courseDisplayName: courseDisplayName,
      courseType: this.state.courseType,
      address: {
        line1: this.state.line1,
        line2: this.state.line2,
        city: this.state.city,
        province: this.state.province,
        postal_code: this.state.postal_code,
        country: this.state.country
      }
    });

    courseUpdateData['courses/all/' + courseDisplayName] = courseKey;
    courseUpdateData['courses/' + this.state.courseTypeIndex + '/' + courseDisplayName] = courseKey;


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

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <View style={styles.body}>

        <TeeBoxParScore onRequestClose={this.onModalClosed} />

        <ScrollView style={styles.scroll_body}>
          <Text>{'Add new golf course'}</Text>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Golf course name"}
              autoFocus={true}
              onChangeText={(text) => this.setState({courseName: text})}
            />
          </View>

          <Text>{'Select course type:'}</Text>
          <CourseTypePicker
            courseTypeValues={this.state.courseTypeValues}
            onValueChange={this.onCourseTypePickerChange}
            defaultValue={this.state.courseTypeIndex}>
          </CourseTypePicker>

          <Text>{'Address:'}</Text>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Address line 1"}
              onChangeText={(text) => this.setState({line1: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Address line 2"}
              onChangeText={(text) => this.setState({line2: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"City"}
              onChangeText={(text) => this.setState({city: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Province / State"}
              onChangeText={(text) => this.setState({province: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Postal / Zip code"}
              onChangeText={(text) => this.setState({postal_code: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Country"}
              onChangeText={(text) => this.setState({country: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="phone-pad"
              placeholder={"Pro shop phone"}
              onChangeText={(text) => this.setState({pro_shop_phone: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="phone-pad"
              placeholder={"Club house phone"}
              onChangeText={(text) => this.setState({club_house_phone: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="phone-pad"
              placeholder={"Restaurant phone"}
              onChangeText={(text) => this.setState({restaurant_phone: text})}
            />
          </View>
          <View style={styles.text_field_with_icon}>
            <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
            <TextInput
              style={styles.textinput}
              keyboardType="default"
              placeholder={"Golf course website url"}
              onChangeText={(text) => this.setState({url: text})}
            />
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


AppRegistry.registerComponent('usermain', () => usermain);
