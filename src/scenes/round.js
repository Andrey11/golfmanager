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
import { FriendActionTypes, MonthNames } from '../consts/const';

import Button from '../components/button';
import TeeBoxParScore from '../components/teeBoxParScore';
import CourseTypePicker from '../components/courseTypePicker';
import IconButton from '../components/iconButton';

import SelectGolfer from './friends';
import SelectCourse from './selectCourse';
import SelectDate from './selectDate';


import styles from '../styles/basestyles.js';

export default class round extends Component {

  constructor (props) {
    super(props);

    let creationDate = new Date();

    this.state = {
      renderPlaceholderOnly: true,
      courseName: '',
      courseId: '',
      date: null,
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
    this.selectDate = this.selectDate.bind(this);

    this.getFormattedDate = this.getFormattedDate.bind(this);
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

  getFormattedDate () {
    if(this.state.date === null) {
      return '';
    }

    let date = this.state.date;
    date.setUTCSeconds(0);
    let day = date.getDate();
    let month = MonthNames[date.getMonth()];
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

    if (!this.state.player2) {
      this.setState({
        player2: {
          username: username,
          userUID: userUID
        }
      });
    } else if (!this.state.player3) {
      this.setState({
        player3: {
          username: username,
          userUID: userUID
        }
      });
    } else if (!this.state.player4) {
      this.setState({
        player4: {
          username: username,
          userUID: userUID
        }
      });
    }

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
        players.push(this._renderPlayer(this.state[playerIndex].username, playerIndex));
      }
    }

    if (players.length > 0) {
      return players;
    } else {
      return null;
    }
  }

  _renderPlayer (username, uniqueKey) {
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
      </View>
    );
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
