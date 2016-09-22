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
import IconButton from '../components/iconButton';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';
import Course from './course';
import Settings from './settings';
import Round from './round';

import styles from '../styles/basestyles.js';

export default class centralHub extends Component {

	constructor (props) {
    super(props);

    this.state = {
      renderPlaceholderOnly: true,
      modalVisible: false
    };

    this.showSettings = this.showSettings.bind(this);
    this.addRound = this.addRound.bind(this);
	}

  componentWillMount () {

  }

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.showSettings;

    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
  }

  onAddCourse () {

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onCourseTypePickerChange (index) {
    this.setState({courseTypeIndex: index});
  }

  showSettings () {
    let bgImageSource = require('../images/golf_bg_9.png');

    this.props.navigator.push({
      component: Settings,
      passProps: {
        navHeaderTitle: 'User Settings',
        leftButton: true,
        rightButton: true,
        sceneType: 'SETTINGS',
        rightButtonName: 'SAVE SETTINGS',
        bgImageSource: bgImageSource
      }
    });
  }

  addRound () {
    this.props.navigator.push({
      component: Round,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'SAVE ROUND'
      }
    });
  }

  render () {
    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    return (
      <View>

          <IconButton
            icon={require('../images/ic_golf_course.png')}
            onButtonPressed={this.addRound}
            buttonStyle={styles.add_round_button}  />

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
