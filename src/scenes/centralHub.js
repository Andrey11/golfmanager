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
  ActivityIndicator,
  Modal
} from 'react-native';

import { FriendActionTypes } from '../utilities/const';

import Button from '../components/button';
import IconButton from '../components/iconButton';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';

// import Course from './course';
import CourseList from './courseList';
import SettingsView from './settingsView';
import Round from './round';
import AddFriend from './friends';

import BackgroundImage from '../components/backgroundImage';

import styles from '../styles/basestyles.js';

export default class centralHub extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Central Hub',
      headerStyle: styles.teset,
      headerLeft: null,
      headerRight:
        <IconButton
          iconSource={require('../images/ic_settings.png')}
          touchableHighlightStyle={styles.nav_right_icon_button}
          underlayColor={'rgba(255, 255, 255, 0.3)'}
          imageStyle={styles.nav_icon}
          onButtonPressed={() => navigation.state.params.handleSave()}>
        </IconButton>
  });

	constructor (props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      renderPlaceholderOnly: true
    };

    this.showSettings = this.showSettings.bind(this);
    this.addRound = this.addRound.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.addCourse = this.addCourse.bind(this);

    // this._getHeaderRightButton = this._getHeaderRightButton.bind(this);
	}

  componentDidMount () {
    // RightButtonMapper.bindButton(this.props.navigator, this.showSettings);
    this.props.navigation.setParams({ handleSave: this.showSettings });


    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  // static _getHeaderRightButton () {
  //   return (
  //     <IconButton
  //       iconSource={require('../images/ic_settings.png')}
  //       touchableHighlightStyle={styles.nav_right_icon_button}
  //       underlayColor={'rgba(255, 255, 255, 0.3)'}
  //       imageStyle={styles.nav_icon}
  //       onButtonPressed={this.showSettings}>
  //     </IconButton>);
  // }

  onAddCourse () {

  }

  onCourseTypePickerChange (index) {
    this.setState({courseTypeIndex: index});
  }

  showSettings () {
    // let bgImageSource = require('../images/golf_bg_9.png');

    let nav = this.props.navigation;

    nav.navigate('SettingsView');

    // this.props.navigator.push({
    //   component: SettingsView,
    //   // sceneBackgroundImage: bgImageSource,
    //   passProps: {
    //     navHeaderTitle: '',
    //     leftButton: true,
    //     rightButton: true,
    //     sceneType: 'SETTINGS',
    //     rightButtonName: 'EDIT'
    //   }
    // });
  }

  addRound () {
    this.props.navigator.push({
      component: Round,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'SAVE ROUND',
        actionType: FriendActionTypes.ADD_GOLFER_TO_ROUND,
      }
    });
  }

  addCourse () {
    this.props.navigator.push({
      component: CourseList,
      passProps: {
        navHeaderTitle: 'Courses',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'ADD COURSE',
      }
    });
  }

  addFriend () {
    this.props.navigator.push({
      component: AddFriend,
      passProps: {
        navHeaderTitle: 'Add Friend',
        leftButton: true,
        rightButton: false,
        actionType: FriendActionTypes.ADD_NEW_FRIEND,
      }
    });
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <BackgroundImage>

          <IconButton
            iconSource={require('../images/ic_golf_course.png')}
            underlayColor={'rgba(0, 145, 27, 0.8)'}
            onButtonPressed={this.addCourse}
            touchableHighlightStyle={styles.add_round_button}  />

          <IconButton
            iconSource={require('../images/ic_person.png')}
            underlayColor={'rgba(0, 145, 27, 0.8)'}
            onButtonPressed={this.addFriend}
            touchableHighlightStyle={styles.add_round_button}  />

          <IconButton
            iconSource={require('../images/ic_group_work.png')}
            underlayColor={'rgba(0, 145, 27, 0.8)'}
            onButtonPressed={this.addRound}
            touchableHighlightStyle={styles.add_round_button}  />

      </BackgroundImage>
    );
  }

  _renderPlaceholderView() {
    return (
      <BackgroundImage>
        <ActivityIndicator size='large' />
      </BackgroundImage>
    );
  }
}


AppRegistry.registerComponent('centralHub', () => centralHub);
