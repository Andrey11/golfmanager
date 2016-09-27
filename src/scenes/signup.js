'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

import * as RightButtonMapper from '../navigation/rightButtonMapper';

import Button from '../components/button';
import Login from './login';

import styles from '../styles/basestyles.js';

export default class signup extends Component {

	constructor (props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      serverCommunicating: false,
      creatingAccount: false,
      usernameVerfied: false,
      errorEmailInvalid: false,
      errorUserAlreadyInUse: false,
      errorOperationNotAllowed: false,
      errorPasswordWeak: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      errorUsernameIsTakenText: 'This username is already taken',
      errorUsernameIsRequiredText: 'To create an account you need a unique username',
      errorEmailInvalidText: 'Email address you provided is invalid',
      errorUserAlreadyInUseText: 'Email address you provided is already in use',
      errorOperationNotAllowedText: 'Unable create an account. Please contact golfmanager team.',
      errorPasswordWeakText: 'Password you provided is too short'
    };

    this.signup = this.signup.bind(this);
    this.addUserToGolfmanagerDatabase = this.addUserToGolfmanagerDatabase.bind(this);
    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
	}

  componentDidMount () {
    RightButtonMapper.bindButton(this.props.navigator, this.signup);
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

  verifyUsernameAvailable () {
    let firebaseApp = this.props.firebaseApp;
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

  signup () {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();

    if (this.state.creatingAccount || this.state.serverCommunicating) {
      return;
    }

    if (!this.state.usernameVerfied) {
      return;
    }

    this.state.creatingAccount = true;

    // TODO: Should we display a small modal dialog saying
    // "Creating Account"

    fbAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => this.setUserDisplayName(user))
    .catch((error) => this.onSignupError(error));
  }

  onSignupError (error) {
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
      errorPasswordWeak: isErrorPasswordWeak,
      creatingAccount: false
    });
  }

  setUserDisplayName (user) {
    user.updateProfile({displayName: this.state.username})
    .then(() => this.addUserToGolfmanagerDatabase());
  }

  addUserToGolfmanagerDatabase () {
    let firebase = this.props.firebaseApp;
    let user = firebase.auth().currentUser;
    let updates = {};
    let currentDate = new Date().getTime() / 1000;

    updates['/usernames/' + user.uid] = user.displayName.toLowerCase();
    updates['/users/' + user.uid] = {
      firstname: '',
      lastname: '',
      displayName: user.displayName,
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
      createdOn: currentDate,
      modifiedOn: currentDate
    };

    return firebase.database().ref().update(updates);
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.state.usernameVerfied && this.state.usernameVerfied !== prevState.usernameVerfied) {
      this.refs.emailTextField.focus();
    } else if (this.state.errorUsernameIsTaken && this.state.errorUsernameIsTaken !== prevState.errorUsernameIsTaken) {
      this.refs.usernameTextField.focus();
    }
  }

  render () {
    return (
      <View style={styles.unathenticated_body}>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            ref="usernameTextField"
            style={styles.textinput_with_two_icons}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder={"Username"}
            autoCorrect={false}
            autoFocus={true}
            value={this.state.username}
            onBlur={this.verifyUsernameAvailable}
            onChangeText={(text) => this.setState({
              username: text,
              errorUsernameIsTaken: false,
              errorUsernameIsRequired: false
            })}
            onSubmitEditing={(event) => {
              this.refs.emailTextField.focus();
            }}
          />
          {this._renderStatusNotification()}
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_email.png')} />
  		    <TextInput
            ref="emailTextField"
            style={styles.textinput}
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
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
              this.signup();
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

  _renderStatusNotification () {
    if (this.state.serverCommunicating) {
      return (<ActivityIndicator style={styles.activity_indicator} animating={true} size="small"/>);
    }
    return (<Image style={this._getStyleForUsernameField()} source={this._getStatusImageForUsernameField()} />);
  }

  _getStyleForUsernameField () {
    if (this.state.usernameVerfied) {
      return styles.icon_button_green;
    } else if (this.state.errorUsernameIsTaken || this.state.errorUsernameIsRequired) {
      return styles.icon_button_red;
    } else {
      return styles.icon_hidden;
    }
  }

  _getStatusImageForUsernameField () {
    if (this.state.usernameVerfied) {
      return require('../images/ic_verified_user.png');
    } else {
      return require('../images/ic_error.png');
    }
  }

  _renderMessage () {
    var errorText = null;
    if (this.state.errorUsernameIsRequired) {
      errorText = this.state.errorUsernameIsRequiredText;
    } else if (this.state.errorUsernameIsTaken) {
      errorText = this.state.errorUsernameIsTakenText;
    } else if (this.state.errorEmailInvalid) {
      errorText = this.state.errorEmailInvalidText;
    } else if (this.state.errorUserAlreadyInUse) {
      errorText = this.state.errorUserAlreadyInUseText;
    } else if (this.state.errorOperationNotAllowed) {
      errorText = this.state.errorOperationNotAllowedText;
    } else if (this.state.errorPasswordWeak) {
      errorText = this.state.errorPasswordWeakText;
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

AppRegistry.registerComponent('signup', () => signup);
