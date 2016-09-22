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
  TouchableHighlight
} from 'react-native';

import CourseItem from '../components/courseItem';
import SearchField from '../components/searchField';

import styles from '../styles/basestyles.js';

export default class selectCourse extends Component {

	constructor (props) {
    super(props);

    this.getCourseItems = this.getCourseItems.bind(this);
    this.setCourseItems = this.setCourseItems.bind(this);
    this.createSnapshotDisplayData = this.createSnapshotDisplayData.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);

    this.state = {renderPlaceholderOnly: true, dataLoaded: false};
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

  render () {
    if (!this.state.dataLoaded) {
      return this._renderPlaceholderView();
    }

    //TODO: Display search dialog to narrow down list of course
    //TODO: Display course type picker that narrows down list of courses
    //TODO: Display scrollable view with courses
    //TODO: Display a button to add a new course

    return (
      <View style={styles.select_course_body}>
        <SearchField placeholderText={'Search courses'} onChangeSearchText={this.onChangeSearchText} />
        <ScrollView>
          {this.getCourseItems()}
        </ScrollView>
        <SearchField />
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


AppRegistry.registerComponent('selectCourse', () => selectCourse);
