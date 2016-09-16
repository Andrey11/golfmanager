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

import Login from './login';
import Signup from './signup';
import Button from '../components/button';
import styles from '../styles/basestyles.js';

export default class resetPassword extends Component {

  constructor (props) {
    super(props);

    // Inital state
    this.state = {
      email: '',
      resetErrorEmailInvalid: false,
      resetErrorUserNotFound: false,
      resetSuccess: false,
      resetErrorEmailInvalidText: 'Email address you provided is invalid',
      resetErrorUserNotFoundText: 'Email address does not exist',
      resetSuccessText: 'Password reset email has been sent, please check your inbox for instructions on how to reset your password'
    };

    this.resetPassword = this.resetPassword.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
  }

  componentDidMount () {
    let currentRoutesArray = this.props.navigator.getCurrentRoutes();
    let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
    let passProps = currentScene.passProps;
    passProps.onRightButtonPress = this.resetPassword;
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

  goToSignup () {
    this.props.navigator.replace({
      component: Signup,
      passProps: {
        navHeaderTitle: 'Create Account',
        leftButton: false,
        rightButton: false
      }
    });
  }


  resetPassword () {
    var firebaseApp = this.props.firebaseApp;
    var fbAuth = firebaseApp.auth();

    fbAuth.sendPasswordResetEmail(this.state.email).then(() => {
      this.setState({
        resetErrorEmailInvalid: false,
        resetErrorUserNotFound: false,
        resetSuccess: true,
        email: ''
      });

    }).catch((error) => {
      var isResetErrorEmailInvalid = false;
      var isResetErrorUserNotFound = false;

      if (error && error.code == 'auth/invalid-email') {
        isResetErrorEmailInvalid = true;
      } else if (error && error.code == 'auth/user-not-found') {
        isResetErrorUserNotFound = true;
      }

      this.setState({
        resetErrorEmailInvalid: isResetErrorEmailInvalid,
        resetErrorUserNotFound: isResetErrorUserNotFound,
        resetSuccess: false
      });
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
            placeholder={"Enter Your Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            value={this.state.email}
            onChangeText={(text) => this.setState({
              email: text,
              resetErrorEmailInvalid: false,
              resetErrorUserNotFound: false,
              resetSuccess: false
            })}
          />
        </View>

        {this._renderMessage()}

        <Button
          text="Return to login"
          onpress={this.goToLogin}
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
    if (this.state.resetErrorEmailInvalid) {
      return (
        <Text>{this.state.resetErrorEmailInvalidText}</Text>
      );
    } else if (this.state.resetErrorUserNotFound) {
      return (
        <Text>{this.state.resetErrorUserNotFoundText}</Text>
      );
    } else if (this.state.resetSuccess) {
      return (
        <Text>{this.state.resetSuccessText}</Text>
      );
    } else {
      return null;
    }
  }
}

AppRegistry.registerComponent('resetPassword', () => resetPassword);
