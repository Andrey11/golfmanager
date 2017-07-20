'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from 'react-native';

import * as RightButtonMapper from '../navigation/rightButtonMapper';
import Button from '../components/button';
import UsernameField from '../components/usernameField';

import styles from '../styles/basestyles.js';

export default class settingsEdit extends Component {

  constructor (props) {
    super(props);

    this.usernameFieldData = null;

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      serverCommunicating: false,
      usernameVerfied: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      accountInfoHeader: 'User information',
      emailVerificationHeader: 'Email verification',
      error: false
    };

    // bind function to settings.js scope
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.updateNicknamesColumns = this.updateNicknamesColumns.bind(this);
    this.updateDatabaseInfo = this.updateDatabaseInfo.bind(this);

    // handlers for usernameField component
    this.onUsernameFieldUpdate = this.onUsernameFieldUpdate.bind(this);
    this.onUsernameFieldSubmitEditing = this.onUsernameFieldSubmitEditing.bind(this);
  }

  componentDidMount () {
    RightButtonMapper.bindButton(this.props.navigator, this.updateUserInfo);
    this.setState({
      username: this.props.username,
      email: this.props.email,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      serverCommunicating: false,
      usernameVerfied: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      accountInfoHeader: 'User information',
      emailVerificationHeader: 'Email verification',
      error: false
    });
  }

  loadUserInfo () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;
    let userDisplayName = user.displayName || '';
    let userInfoRef = firebaseApp.database().ref('users/' + user.uid);

    userInfoRef.once('value')
    .then((snapshot) => this.setUserInfo(snapshot, user));
  }

  setUserInfo (snapshot, user) {
    let userInfo = snapshot.val();

    this.setState({
      username: user.displayName,
      email: user.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      accountInfoHeader: 'User information',
      emailVerificationHeader: 'Email verification',
    });
  }

  verifyEmail () {
    // TODO: Check if email verification has been set somehow so not to spam the user
    // user.sendEmailVerification();
  }

  updateUserInfo () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;

    if (user.displayName === this.state.username) {
      this.updateDatabaseInfo();
    } else {
      user.updateProfile({displayName: this.state.username})
      .then(() => this.updateNicknamesColumns())
      .then(() => this.updateDatabaseInfo());
    }
  }

  updateNicknamesColumns () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;
    let updates = {};

    updates['/usernames/' + user.uid] = user.displayName.toLowerCase();
    return firebaseApp.database().ref().update(updates);
  }

  updateDatabaseInfo () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;
    let currentDate = new Date().getTime() / 1000;
    let updates = {
      displayName: user.displayName,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: user.email,
      address: {
        line1: '',
        line2: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        phone: ''
      },
      modifiedOn: currentDate
    };

    firebaseApp.database().ref('/users/' + user.uid).update(updates)
    .then(() => {this.props.navigator.pop()});
  }

  verifyUsernameAvailable () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;

    if (user.displayName === this.state.username) {
      return;
    }

    let username = this.state.username.toLowerCase();
    this.setState({serverCommunicating: true});

    if (username.length === 0) {
      this.setState({
        errorUsernameIsTaken: false,
        usernameVerfied: false,
        serverCommunicating: false,
        errorUsernameIsRequired: true
      });
    } else {
      let usernamesRef = firebaseApp.database().ref('usernames');
      usernamesRef.orderByValue().equalTo(username).once('value')
      .then((snapshot) => {
        this.setState({
          errorUsernameIsTaken: snapshot.exists(),
          usernameVerfied: !snapshot.exists(),
          errorUsernameIsRequired: false,
          serverCommunicating: false
        });
      });
    }
  }

  onUsernameFieldUpdate (usernameFieldData) {
    this.usernameFieldData = usernameFieldData;
    this.setState({error: this.usernameFieldData.error});
  }

  onUsernameFieldSubmitEditing () {
    this.refs.firstnameTextField.focus();
  }

  render () {
    return (
      <View style={styles.settings_body}>
        <Text>{this.state.accountInfoHeader}</Text>

        <UsernameField
          firebaseApp={this.props.firebaseApp}
          username={this.state.username}
          onBlur={this.onUsernameFieldUpdate}
          isAutoFocus={false}
          onChangeText={() => this.setState({error: false})}
          onSubmitEditing={this.onUsernameFieldSubmitEditing}
        />

        {this._checkForErrorsInUsernameField()}

        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            ref="firstnameTextField"
            style={styles.textinput}
            keyboardType="default"
            placeholder={"First name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.firstname}
            onChangeText={(text) => this.setState({firstname: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Last name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.lastname}
            onChangeText={(text) => this.setState({lastname: text})}
          />
        </View>

        <Text>{this.state.emailVerificationHeader}</Text>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_email.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            editable={false}
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>
      </View>
    );
  }

  _checkForErrorsInUsernameField () {
    if (this.state.error && this.usernameFieldData && this.usernameFieldData.error) {
      return this._renderErrorNotification(this.usernameFieldData.errorText);
    }
    return null;
  }

  _renderErrorNotification (errorText) {
    return (
      <View style={styles.error_notification}>
        <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
        <Text numberOfLines={5} style={styles.notification_text}>{errorText}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('settingsEdit', () => settingsEdit);
