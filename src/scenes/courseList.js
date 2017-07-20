'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Picker,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import CourseView from './course';
import CourseEdit from './course';

import CourseItem from '../components/courseItem';
import SearchField from '../components/searchField';
import IconButton from '../components/iconButton';

import base_css from '../styles/basestyles.js';

export default class courseList extends Component {

	constructor (props) {
    super(props);

    this.onViewCourseButtonPressed = this.onViewCourseButtonPressed.bind(this);
    this.onEditCourseButtonPressed = this.onEditCourseButtonPressed.bind(this);

    this.getCourseItems = this.getCourseItems.bind(this);
    this.setCourseItems = this.setCourseItems.bind(this);
    this.createSnapshotDisplayData = this.createSnapshotDisplayData.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);

    this.state = {
      renderPlaceholderOnly: true,
      dataLoaded: false};
	}

  // componentWillMount () {
  //   this.setState({
  //     courseName: '',
  //     courseTypeIndex: 0,
  //     courseTypeValues: ['Full', 'Executive', 'Pitch & Putt', 'Mini'],
  //     courseDisplayName: '',
  //     line1: '',
  //     line2: '',
  //     city: '',
  //     province: '',
  //     postal_code: '',
  //     country: '',
  //     pro_shop_phone: '',
  //     club_house_phone: '',
  //     restaurant_phone: '',
  //     url: '',
  //     modalVisible: false
  //   });
  // }

  componentDidMount () {
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({renderPlaceholderOnly: false});
    // });

    var firebaseApp = this.props.firebaseApp;
    let coursesRef = firebaseApp.database().ref('courses/all');
    coursesRef.once("value").then((snapshot) => this.setCourseItems(snapshot));
  }

  onViewCourseButtonPressed () {
    this.props.navigator.push({
      component: CourseView,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'EDIT COURSE',
      }
    });
  }

  onEditCourseButtonPressed () {
    this.props.navigator.push({
      component: CourseEdit,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'SAVE COURSE'
      }
    });
  }


  setCourseItems (snapshot) {

    var snapshotDisplayData = this.createSnapshotDisplayData(snapshot, null);

    this.setState({
      dataLoaded: true,
      snapshotData: snapshot,
      currentDisplayData: snapshotDisplayData
    });
  }

  createSnapshotDisplayData (snapshot, filter) {
    var snapshotDisplayData = [];

    snapshot.forEach(function (snapshotChild) {
      let snapshotDisplayItem = {};
      let courseName = snapshotChild.key;
      let key = snapshotChild.val();
      let courseId = snapshotChild.val();

      if (!filter || (filter && courseName.indexOf(filter) !== -1)) {
          snapshotDisplayItem.courseName = courseName;
          snapshotDisplayItem.key = key;
          snapshotDisplayItem.courseId = courseId;
          snapshotDisplayData.push(snapshotDisplayItem);
      }

    });

    return snapshotDisplayData;
  }

  getCourseItems () {
    let courseData = this.state.currentDisplayData;
    var courseSelectedFn = this.props.onCourseSelected;
    var childComponents = [];

    for(let i=0; i<courseData.length; i++) {
      let courseDataItem = courseData[i];
      let courseItemCmp = <CourseItem key={courseDataItem.key}
                            onCourseSelected={courseSelectedFn}
                            courseId={courseDataItem.courseId}
                            onViewCourseButtonPressed={this.onViewCourseButtonPressed}
                            onEditCourseButtonPressed={this.onEditCourseButtonPressed}
                            courseName={courseDataItem.courseName} />;

      childComponents.push(courseItemCmp);
    }

    if (childComponents.length > 0) {
      return childComponents;
    } else {
      return this._createEmptyCourseDisplay();
    }
  }

  onChangeSearchText (text) {
    var snapshotDisplayData = this.createSnapshotDisplayData(this.state.snapshotData, text);

    this.setState({currentDisplayData: snapshotDisplayData});
  }

  onAddCourse () {

  }

  render () {
    if (!this.state.dataLoaded) {
      return this._renderPlaceholderView();
    }

    //TODO: Display search dialog to narrow down list of course
    //TODO: Display course type picker that narrows down list of courses
    //TODO: Display scrollable view with courses
    //TODO: Display a button to add a new course

    return (
      <View style={[base_css.scene_offset_top, base_css.select_course_body]}>
        <SearchField placeholderText={'Search courses'} onChangeSearchText={this.onChangeSearchText} />
        <ScrollView>
          {this.getCourseItems()}
        </ScrollView>
        <IconButton
          iconSource={require('../images/ic_golf_course.png')}
          underlayColor={'rgba(0, 145, 27, 0.8)'}
          onButtonPressed={this.onAddCourse}
          touchableHighlightStyle={private_css.add_round_button}  />
      </View>
    );
  }

  _createEmptyCourseDisplay () {
    return (
      <View>
        <Text>{'Could not find the course you are looking for, please add this course so other users could also use it.'}</Text>
      </View>
    );
  }

  _renderPlaceholderView () {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('courseList', () => courseList);

const private_css = StyleSheet.create({
  add_round_button: {
    backgroundColor: 'rgba(0, 145, 27, 1)',
    borderColor: 'rgba(0, 145, 27, 1)',
    borderRadius: 45,
    borderWidth: 1,
    margin: 10,
    padding: 20,
  },


});
