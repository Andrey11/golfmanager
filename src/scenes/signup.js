'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import Button from '../components/button';
import Login from './login';

import styles from '../styles/basestyles.js';

export default class signup extends Component {

	constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorEmailInvalid: false,
      errorUserAlreadyInUse: false,
      errorOperationNotAllowed: false,
      errorPasswordWeak: false,
      errorEmailInvalidText: 'Email address you provided is invalid',
      errorUserAlreadyInUseText: 'Email address you provided is already in use',
      errorOperationNotAllowedText: 'Unable create an account. Please contact golfmanager team.',
      errorPasswordWeakText: 'Password you provided is too short'
    };

    this.signup = this.signup.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
	}

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.signup;
  }

  goToLogin () {
    this.props.navigator.replace({
      component: Login,
      passProps: {
        navHeaderTitle: '',
        leftButton: false,
        rightButton: true,
        rightButtonName: 'LOGIN'
      }
    });
  }

  signup () {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();

    fbAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => this.addUserToGolfmanagerDatabase(user))
    .catch((error) => {
      var isErrorEmailInvalid = false;
      var isErrorUserAlreadyInUse = false;
      var isErrorOperationNotAllowed = false;
      var isErrorPasswordWeak = false;

      if (error && error.code == 'auth/invalid-email') {
        isErrorEmailInvalid = true;
      } else if (error && error.code == 'auth/email-already-in-use') {
        isErrorUserAlreadyInUse = true;
      } else if (error && error.code == 'auth/operation-not-allowed') {
        isErrorOperationNotAllowed = true;
      } else if (error && error.code == 'auth/weak-password') {
        isErrorPasswordWeak = true;
      }

      this.setState({
        errorEmailInvalid: isErrorEmailInvalid,
        errorUserAlreadyInUse: isErrorUserAlreadyInUse,
        errorOperationNotAllowed: isErrorOperationNotAllowed,
        errorPasswordWeak: isErrorPasswordWeak
      });
    });
  }

  addUserToGolfmanagerDatabase (user) {

    let firebaseApp = this.props.firebaseApp;
    let userDatabaseRef = firebaseApp.database().ref('users');

    // Add golfer to users database
    let userRef = userDatabaseRef.child(user.uid).set({
      firstname: '',
      lastname: '',
      displayName: '',
      email: user.email,
      address: {
        line1: '',
        line2: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
        phone: ''
      }
    });
  }

  render () {
    return (
      <View style={styles.unathenticated_body}>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_email.png')} />
  		    <TextInput
            style={styles.textinput}
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            value={this.state.email}
            blurOnSubmit={false}
            onChangeText={(text) => this.setState({
              email: text,
              errorEmailInvalid: false,
              errorUserAlreadyInUse: false,
              errorOperationNotAllowed: false
            })}
            onSubmitEditing={(event) => {
              this.refs.passwordTextField.focus();
            }}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_key.png')} />
          <TextInput
            ref="passwordTextField"
            style={styles.textinput}
            onChangeText={(text) => this.setState({
              password: text,
              errorPasswordWeak: false,
            })}
            value={this.state.password}
            secureTextEntry={true}
            blurOnSubmit={true}
            placeholder={"Password"}
            onSubmitEditing={(event) => {
              this.signup;
            }}
          />
        </View>

        {this._renderMessage()}

        <Button
          text="Got an Account?"
          onpress={this.goToLogin}
          button_styles={styles.semi_transparent_button}
          button_text_styles={styles.semi_transparent_button_text} />
      </View>
    );
  }

  _renderMessage () {
    if (this.state.errorEmailInvalid) {
      return (
        <View style={styles.error_notification}>
          <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={styles.notification_text}>{this.state.errorEmailInvalidText}</Text>
        </View>
      );
    } else if (this.state.errorUserAlreadyInUse) {
      return (
        <View style={styles.error_notification}>
          <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={styles.notification_text}>{this.state.errorUserAlreadyInUseText}</Text>
        </View>
      );
    } else if (this.state.errorOperationNotAllowed) {
      return (
        <View style={styles.error_notification}>
          <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={styles.notification_text}>{this.state.errorOperationNotAllowedText}</Text>
        </View>
      );
    } else if (this.state.errorPasswordWeak) {
      return (
        <View style={styles.error_notification}>
          <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={styles.notification_text}>{this.state.errorPasswordWeakText}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

AppRegistry.registerComponent('signup', () => signup);
