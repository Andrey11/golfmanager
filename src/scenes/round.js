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

import * as RightButtonMapper from '../navigation/rightButtonMapper';
import { FriendActionTypes } from '../utilities/const';
import * as DateUtil from '../utilities/dates';

import Button from '../components/button';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';
import IconButton from '../components/iconButton';

import SelectGolfer from './friends';
import CourseList from './courseList';
import SelectDate from './selectDate';


import styles from '../styles/basestyles.js';

export default class round extends Component {

  constructor (props) {
    super(props);

    this.MAX_PLAYERS = 4;

    let creationDate = new Date();

    this.state = {
      renderPlaceholderOnly: true,
      courseName: '',
      courseId: '',
      date: creationDate,
      player1: false,
      player2: false,
      player3: false,
      player4: false,
      creator: null,
      dataCreated: creationDate,
      dateModified: creationDate,
    };

    this.addRound = this.addRound.bind(this);
    this.selectCourse = this.selectCourse.bind(this);
    this.selectGolfer = this.selectGolfer.bind(this);
    this.removeGolfer = this.removeGolfer.bind(this);
    this.selectDate = this.selectDate.bind(this);

    this.onDateSelected = this.onDateSelected.bind(this);
    this.onCourseSelected = this.onCourseSelected.bind(this);
    this.onGolferSelected = this.onGolferSelected.bind(this);

    this._getAlreadyAddedGolfers = this._getAlreadyAddedGolfers.bind(this);

	}

  componentDidMount () {
    RightButtonMapper.bindButton(this.props.navigator, this.addRound);

    let currentUser = this.props.firebaseApp.auth().currentUser;
    let username = currentUser.displayName;
    let userUID = currentUser.uid;

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false,
        player1: {
          username: username,
          userUID: userUID
        }
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
        currentDate: this.state.date || new Date(),
        onDateSelected: this.onDateSelected
      }
    });
  }

  onDateSelected (date) {
    this.props.navigator.pop();
    this.setState({date: date});
  }

  selectCourse () {
    this.props.navigator.push({
      component: CourseList,
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

  selectGolfer () {
    this.props.navigator.push({
      component: SelectGolfer,
      passProps: {
        navHeaderTitle: 'Select Player',
        leftButton: true,
        rightButton: false,
        actionType: FriendActionTypes.ADD_GOLFER_TO_ROUND,
        onGolferSelected: this.onGolferSelected,
        alreadyAdded: this._getAlreadyAddedGolfers()
      }
    });
  }

  onGolferSelected (username, userUID) {
    this.props.navigator.pop();

    let state = {};
    let stateParam = {
      username: username,
      userUID: userUID
    };

    if (!this.state.player2) {
      state['player2'] = stateParam;
    } else if (!this.state.player3) {
      state['player3'] = stateParam;
    } else if (!this.state.player4) {
      state['player4'] = stateParam;
    }

    this.setState(state);
  }

  removeGolfer (params) {
    let playerIndex = params.playerIndex;
    let index = params.index;
    let state = {};

    state[playerIndex] = false;

    for (let i=index; i<this.MAX_PLAYERS; i++) {
      let currentPlayerIndex = 'player' + i;
      let nextPlayerIndex = 'player' + (i+1);
      if (this.state[nextPlayerIndex]) {
        state[currentPlayerIndex] = this.state[nextPlayerIndex];
        this.state[nextPlayerIndex] = false;
      }
    }

    this.setState(state);
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
            value={DateUtil.getFormattedDate(this.state.date)}
          />
          <IconButton
            iconSource={require('../images/ic_navigate_next.png')}
            underlayColor={'rgba(255, 255, 255, 0.9)'}
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
            iconSource={require('../images/ic_navigate_next.png')}
            underlayColor={'rgba(255, 255, 255, 0.9)'}
            onButtonPressed={this.selectCourse} />
        </View>

        {this._renderPlayers()}

        {this._renderAddPlayerOption()}

      </View>
    );
  }

  _renderPlayers () {
    let players = [];
    for (let i=1; i<5; i++) {
      let playerIndex = 'player' + i;
      if (this.state[playerIndex]) {
        players.push(this._renderPlayer(this.state[playerIndex].username, playerIndex, i));
      }
    }

    if (players.length > 0) {
      return players;
    } else {
      return null;
    }
  }

  _renderPlayer (username, uniqueKey, index) {
    return (
      <View style={styles.text_field_with_icon} key={uniqueKey}>
        <Image style={styles.icon_button} source={require('../images/ic_person.png')} />
        <TextInput
          style={styles.textinput}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
          value={username}
        />
        {this._renderRemovePlayerOption(uniqueKey, index)}
      </View>
    );
  }

  _renderRemovePlayerOption (uniqueKey, index) {
    if (uniqueKey !== 'player1') {
      return (
        <IconButton
          iconSource={require('../images/ic_remove_circle.png')}
          underlayColor={'rgba(255, 255, 255, 0.9)'}
          pressedParam={{playerIndex: uniqueKey, index: index}}
          onButtonPressed={this.removeGolfer} />
      );
    } else {
      return null;
    }
  }

  _renderAddPlayerOption () {
    if (this.state.player1 && this.state.player2 && this.state.player3 && this.state.player4) {
      return null;
    }

    return (
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
          iconSource={require('../images/ic_add_circle.png')}
          underlayColor={'rgba(255, 255, 255, 0.9)'}
          onButtonPressed={this.selectGolfer} />
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

  _getAlreadyAddedGolfers () {
    let alreadyAdded = {};
    for(let i=2; i<5; i++) {
      let playerIndex = 'player' + i;
      if (this.state[playerIndex]) {
        alreadyAdded[this.state[playerIndex].userUID] = true;
      }
    }
    return alreadyAdded;
  }
}


AppRegistry.registerComponent('round', () => round);
