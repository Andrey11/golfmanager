'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// import * as RightButtonMapper from '../navigation/rightButtonMapper';

import Signup from './signup';
import ResetPassword from './resetPassword';
import Button from '../components/button';
import TextFieldWithIcon from '../components/textFieldWithIcon';

import basestyles from '../styles/basestyles.js';

import * as NavActionsUtil from '../navigation/navigationActionsUtil';

export default class login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      descriptionText: 'Play, record, create, share.',
      connecting: false,
      passwordErrorState: false,
      emailErrorState: false,
      errorEmailInvalid: false,
      errorEmptyEmail: false,
      errorUserDisabled: false,
      errorUserNotFound: false,
      errorWrongPassword: false,
      errorEmptyPassword: false,
      errorEmailIsRequiredText: 'Please enter your email',
      errorEmailInvalidText: 'Sorry, this email is not valid',
      errorPasswordIsRequiredText: 'Please enter your password',
      errorUserDisabledText: 'Your account has been disabled. ' +
        'Please contact golfmanager team to reactive the account',
      errorUserNotFoundText: 'Hmmm, we can\'t find an account linked to this email',
      errorWrongPasswordText: 'Sorry, this password is incorrect',
    };

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.login = this.login.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
    this.goToResetPassword = this.goToResetPassword.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);

    this.firebase = this.props.screenProps.firebase;
  }

  componentDidMount () {
    let firebaseAuthentication = this.firebase.auth();
    firebaseAuthentication.onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged (user) {
    if (user !== null) {
      this.props.navigation.dispatch(NavActionsUtil.authenticated);
    }
  }

  goToSignup () {
    this.props.navigation.navigate('Signup');
  }

  goToResetPassword () {
    this.props.navigation.navigate('ResetPassword');
  }

  login () {
    var firebaseAuth = this.firebase.auth();

    if (this.state.email.length === 0) {
      this.setState({
        errorEmptyEmail:true,
        emailErrorState: true,
      });
    } else if (this.state.password.length === 0) {
      this.setState({
        errorEmptyPassword:true,
        passwordErrorState: true,
      });
    } else {
      this.setState({connecting:true});

      firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => this.onLoginError(error));
    }
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
      connecting: false,
      errorEmailInvalid: isErrorEmailInvalid,
      errorUserDisabled: isErrorUserDisabled,
      errorUserNotFound: isErrorUserNotFound,
      errorWrongPassword: isErrorWrongPassword,
      passwordErrorState: isErrorWrongPassword,
      emailErrorState: isErrorEmailInvalid,
    });
  }

  closeNotification () {
    this.setState({
      emailErrorState: false,
      passwordErrorState: false,
      errorEmailInvalid: false,
      errorEmptyEmail: false,
      errorUserDisabled: false,
      errorUserNotFound: false,
      errorWrongPassword: false,
      errorEmptyPassword: false,
    });
  }

  onSubmitEmail () {
    if (this.state.email.length === 0) {
      this.setState({
        errorEmptyEmail: true,
        emailErrorState: true,
      });
    } else if (!this._validateEmail()) {
      this.setState({
        errorEmailInvalid: true,
        emailErrorState: true,
      });
    } else {
      this.refs.passwordTextField.setFocus();
    }
  }

  _validateEmail () {
    var email = this.state.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render () {
    return (
      <View style={[basestyles.body, basestyles.main_background_color]}>

        {this._renderMessage()}

        <Image style={localstyles.logo_image}
          source={require('../images/app-logo.png')} />

        <Text style={localstyles.description_text}>{this.state.descriptionText}</Text>

        <View style={localstyles.input_field_wrapper}>

          <TextFieldWithIcon
            iconTextFieldTypeSource={require('../images/ic_email.png')}
            iconTextFieldStateSource={require('../images/ic_error.png')}
            textFieldState={this.state.emailErrorState}
            textValue={this.state.email}
            autoFocus={false}
            onChangeText={(text) => this.setState({
              email: text,
              errorEmailInvalid: false,
              errorUserNotFound: false,
              errorEmptyEmail: false,
              emailErrorState: false,
            })}
            placeholderText={'Email address'}
            keyboardType='email-address'
            returnKeyType='next'
            onBlur={this.onSubmitEmail}
            onSubmitEditing={this.onSubmitEmail} />

          <TextFieldWithIcon
            style={[{marginTop: 20}]}
            ref='passwordTextField'
            iconTextFieldTypeSource={require('../images/ic_key.png')}
            iconTextFieldStateSource={require('../images/ic_error.png')}
            textFieldState={this.state.passwordErrorState}
            textValue={this.state.password}
            autoFocus={false}
            onChangeText={(text) => this.setState({
              password: text,
              errorWrongPassword: false,
              errorEmptyPassword: false,
              passwordErrorState: false,
            })}
            placeholderText={'Password'}
            secureTextEntry={true}
            returnKeyType='go'
            onSubmitEditing={(event) => this.login()} />

          <ActivityIndicator
            style={basestyles.connecting_indicator}
            color={'rgba(0, 0, 0, 0.9)'}
            animating={this.state.connecting} />

          <Button
            text='Login'
            disabled={this.state.connecting}
            style={[{marginTop: 20}]}
            onpress={this.login}
            button_styles={this.state.connecting ?
              localstyles.login_button_disabled :
              localstyles.login_button}
            button_text_styles={this.state.connecting ?
              localstyles.login_button_text_disabled :
              localstyles.login_button_text} />

          <View style={localstyles.secondary_action_wrapper}>
            <Button
              text='Forgot password?'
              onpress={this.goToResetPassword}
              button_styles={localstyles.text_button}
              button_text_styles={localstyles.text_button_text} />
            <Button
              text='Create an account'
              onpress={this.goToSignup}
              button_styles={localstyles.text_button}
              button_text_styles={localstyles.text_button_text} />
          </View>

        </View>

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
    } else if (this.state.errorEmptyEmail) {
      errorText = this.state.errorEmailIsRequiredText;
    } else if (this.state.errorEmptyPassword) {
      errorText = this.state.errorPasswordIsRequiredText;
    } else {
      return null;
    }

    return (
      <View style={basestyles.error_notification}>

        <Text numberOfLines={5} style={basestyles.notification_text}>
          {errorText}
        </Text>

        <TouchableOpacity
          style={localstyles.icon_close_position}
          onPress={this.closeNotification}>
          <Image
            source={require('../images/ic_highlight_off.png')}
            style={[localstyles.icon_close]} />
        </TouchableOpacity>

      </View>
    );
  }
}

const localstyles = StyleSheet.create({
  icon_close: {
    width: 24,
    height: 24,
    // tintColor: 'rgba(200, 200, 200, 0.8)',
    tintColor: 'rgba(0, 0, 0, 0.4)',
  },

  icon_close_position: {
    // position: 'absolute',
    // alignItems: 'flex-end',
    right: 10,
  },

  logo_image: {
    marginTop: 120,
    width: 303,
    height: 92,
  },

  description_text: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '100',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },

  input_field_wrapper: {
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

  secondary_action_wrapper: {
    flexDirection: 'row',
    paddingTop: 80,
    // flex: 1,
    // marginTop: 80,
  },

  login_button_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '200',
    fontFamily: 'Avenir',
  },

  login_button_text_disabled: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '200',
    fontFamily: 'Avenir',
  },

  login_button: {
    height: 50,
    // width: '100%',
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 115, 55, 1)',
    borderColor: 'rgba(55, 115, 55, 1)',
    borderRadius: 3,
    borderWidth: 1,
  },

  login_button_disabled: {
    height: 50,
    // width: '100%',
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 115, 55, 0.5)',
    borderColor: 'rgba(55, 115, 55, 0.5)',
    borderRadius: 3,
    borderWidth: 1,
  },

  text_button: {
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
  },

  text_button_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '200',
    fontFamily: 'Avenir',
  },

});

AppRegistry.registerComponent('login', () => login);
