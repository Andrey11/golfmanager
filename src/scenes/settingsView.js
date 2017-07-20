'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  base_cssheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from 'react-native';

import * as RightButtonMapper from '../navigation/rightButtonMapper';
import SettingsEdit from './settingsEdit';
import Button from '../components/button';
import UsernameField from '../components/usernameField';

import base_css from '../styles/basestyles.js';

export default class settingsView extends Component {

  constructor (props) {
    super(props);

    this.usernameFieldData = null;

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      serverCommunicating: false,
      userInfoLoaded: false,
      usernameVerfied: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      error: false
    };

    // bind function to settings.js scope
    this.logout = this.logout.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
    this.editUserSettings = this.editUserSettings.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.updateNicknamesColumns = this.updateNicknamesColumns.bind(this);
    this.updateDatabaseInfo = this.updateDatabaseInfo.bind(this);

    // handlers for usernameField component
    this.onUsernameFieldUpdate = this.onUsernameFieldUpdate.bind(this);
    this.onUsernameFieldSubmitEditing = this.onUsernameFieldSubmitEditing.bind(this);
  }

  componentDidMount () {
    RightButtonMapper.bindButton(this.props.navigator, this.editUserSettings);
    this.loadUserInfo();
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
      userInfoLoaded: true
    });
  }

  verifyEmail () {
    // TODO: Check if email verification has been set somehow so not to spam the user
    // user.sendEmailVerification();
  }

  editUserSettings () {
    if (!this.state.userInfoLoaded) {
      return;
    }

    this.props.navigator.push({
      component: SettingsEdit,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'DONE',
        username: this.state.username,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      }
    });
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

  logout () {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();
    fbAuth.signOut();
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
      <View style={base_css.settings_body}>

        <UsernameField
          firebaseApp={this.props.firebaseApp}
          username={this.state.username}
          onBlur={this.onUsernameFieldUpdate}
          isAutoFocus={false}
          onChangeText={() => this.setState({error: false})}
          onSubmitEditing={this.onUsernameFieldSubmitEditing}
        />

        {this._checkForErrorsInUsernameField()}

        <View style={base_css.text_field_with_icon}>
          <Image style={base_css.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            ref="firstnameTextField"
            style={base_css.textinput}
            keyboardType="default"
            placeholder={"First name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.firstname}
            onChangeText={(text) => this.setState({firstname: text})}
          />
        </View>
        <View style={base_css.text_field_with_icon}>
          <Image style={base_css.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            style={base_css.textinput}
            keyboardType="default"
            placeholder={"Last name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.lastname}
            onChangeText={(text) => this.setState({lastname: text})}
          />
        </View>

        
        <View style={base_css.text_field_with_icon}>
          <Image style={base_css.icon_button} source={require('../images/ic_email.png')} />
          <TextInput
            style={base_css.textinput}
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            editable={false}
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>

        <Button
          text="Logout"
          onpress={this.logout}
          button_styles={base_css.primary_button}
          button_text_styles={base_css.primary_button_text} />
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
      <View style={base_css.error_notification}>
        <Image style={base_css.icon_notification} source={require('../images/ic_error.png')} />
        <Text numberOfLines={5} style={base_css.notification_text}>{errorText}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('settingsView', () => settingsView);


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
