'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from 'react-native';

import * as RightButtonMapper from '../navigation/rightButtonMapper';
import Button from '../components/button';

import styles from '../styles/basestyles.js';

export default class settings extends Component {

  constructor (props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      firstname: '',
      lastname: '',
      accountInfoHeader: 'User information',
      emailVerificationHeader: 'Email verification',
    };

    // bind function to settings.js scope
    this.logout = this.logout.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateDatabaseInfo = this.updateDatabaseInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  componentDidMount () {

    RightButtonMapper.bindButton(this.props.navigator, this.updateUserInfo);

    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;
    let userDisplayName = user.displayName || '';
    let userInfoRef = firebaseApp.database().ref('users/' + user.uid);

    userInfoRef.once('value').then((snapshot) => this.setUserInfo(snapshot, user));
  }

  setUserInfo (snapshot, user) {
    let userInfo = snapshot.val();

    this.setState({
      displayName: user.displayName,
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

    user.updateProfile({displayName: this.state.displayName})
    .then(() => this.updateDatabaseInfo());
  }

  updateDatabaseInfo () {
    let firebaseApp = this.props.firebaseApp;
    let user = firebaseApp.auth().currentUser;
    let userRef = firebaseApp.database().ref('users/' + user.uid);

    if (userRef) {
      userRef.update({
        displayName: user.displayName,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      });
    }

    this.props.navigator.pop();
  }

  logout () {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();
    fbAuth.signOut();
  }

  render () {
    return (
      <View style={styles.settings_body}>
        <Text>{this.state.accountInfoHeader}</Text>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Display name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.displayName}
            onChangeText={(text) => this.setState({displayName: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
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

        <Button
          text="Logout"
          onpress={this.logout}
          button_styles={styles.primary_button}
          button_text_styles={styles.primary_button_text} />
      </View>
    );
  }

}

AppRegistry.registerComponent('settings', () => settings);
