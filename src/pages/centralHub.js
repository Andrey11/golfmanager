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

import GiftedSpinner from 'react-native-gifted-spinner';

import Button from '../components/button';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';
import Course from './course';
import Settings from './settings';

import styles from '../styles/basestyles.js';

export default class centralHub extends Component {

	constructor (props) {
    super(props);

    this.state = {
      renderPlaceholderOnly: true,
      modalVisible: false
    };

    this.onRightButtonPress = this.onRightButtonPress.bind(this);
    this.onModalClosed = this.onModalClosed.bind(this);
	}

  componentWillMount () {

  }

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.onRightButtonPress;

    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  onAddCourse () {

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

  onRightButtonPress () {
    let bgImageSource = require('../images/golf_bg_9.png');

    this.props.navigator.push({
      component: Settings,
      passProps: {
        navHeaderTitle: 'User Settings',
        leftButton: true,
        rightButton: false,
        sceneType: 'SETTINGS',
        bgImageSource: bgImageSource
      }
    });
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <View>
        <Text>ANDREY IS HERE</Text>
      </View>
    );
  }

  _renderPlaceholderView() {
    // TODO: Create a proper loader
    return (
      <View style={styles.start_page__body}>
        <Text style={styles.start_page__text}>Loading</Text>
        <GiftedSpinner />
      </View>
    );
  }
}


AppRegistry.registerComponent('centralHub', () => centralHub);
