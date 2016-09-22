'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import Signup from './signup';
import ResetPassword from './resetPassword';
import Button from '../components/button';
import styles from '../styles/basestyles.js';

export default class login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorEmailInvalid: false,
      errorUserDisabled: false,
      errorUserNotFound: false,
      errorWrongPassword: false,
      errorEmailInvalidText: 'Email address you provided is invalid',
      errorUserDisabledText: 'Your account has been disabled. Please contact golfmanager team to reactive the account',
      errorUserNotFoundText: 'Account linked to email address does not exist',
      errorWrongPasswordText: 'You have entered an incorrect password',
    };

    this.login = this.login.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
    this.goToResetPassword = this.goToResetPassword.bind(this);
  }

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.login;
  }

  goToSignup () {
    this.props.navigator.replace({
      component: Signup,
      passProps: {
        navHeaderTitle: '',
        leftButton: false,
        rightButton: true,
        rightButtonName: 'SIGNUP'
      }
    });
  }

  goToResetPassword () {
    this.props.navigator.replace({
      component: ResetPassword,
      passProps: {
        navHeaderTitle: '',
        leftButton: false,
        rightButton: true,
        rightButtonName: 'RESET PASSWORD'
      }
    });
  }


  login () {
    var firebaseApp = this.props.firebaseApp;
    var fbAuth = firebaseApp.auth();

    fbAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => this.onLoginError(error));
  }

  onLoginError (error) {
    var isErrorEmailInvalid = false;
    var isErrorUserDisabled = false;
    var isErrorUserNotFound = false;
    var isErrorWrongPassword = false;

    if (error && error.code == 'auth/invalid-email') {
      isErrorEmailInvalid = true;
    } else if (error && error.code == 'auth/user-disabled') {
      isErrorUserDisabled = true;
    } else if (error && error.code == 'auth/user-not-found') {
      isErrorUserNotFound = true;
    } else if (error && error.code == 'auth/wrong-password') {
      isErrorWrongPassword = true;
    }

    this.setState({
      errorEmailInvalid: isErrorEmailInvalid,
      errorUserDisabled: isErrorUserDisabled,
      errorUserNotFound: isErrorUserNotFound,
      errorWrongPassword: isErrorWrongPassword
    });
  }

  render () {
    return (
      <View style={styles.unathenticated_body}>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_email.png')} />
          <TextInput
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            value={this.state.email}
            onChangeText={(text) => this.setState({
              email: text,
              errorEmailInvalid: false,
              errorUserNotFound: false
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
              errorWrongPassword: false,
            })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
            onSubmitEditing={(event) => {
              this.login;
            }}
          />
        </View>

        {this._renderMessage()}

        <Button
          text="Forgot password?"
          onpress={this.goToResetPassword}
          button_styles={styles.semi_transparent_button}
          button_text_styles={styles.semi_transparent_button_text} />
        <Button
          text="New user? Create an account."
          onpress={this.goToSignup}
          button_styles={styles.semi_transparent_button_second}
          button_text_styles={styles.semi_transparent_button_text} />
      </View>
    );
  }

  _renderMessage () {
    var errorText = null;

    if (this.state.errorEmailInvalid) {
      errorText = this.state.errorEmailInvalidText;
    } else if (this.state.errorUserDisabled) {
      errorText = this.state.errorUserDisabledText;
    } else if (this.state.errorUserNotFound) {
      errorText = this.state.errorUserNotFoundText;
    } else if (this.state.errorWrongPassword) {
      errorText = this.state.errorWrongPasswordText;
    } else {
      return null;
    }

    return (
      <View style={styles.error_notification}>
        <Image style={styles.icon_notification} source={require('../images/ic_error.png')} />
        <Text numberOfLines={5} style={styles.notification_text}>{errorText}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('login', () => login);
