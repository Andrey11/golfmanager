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

import { NavigationActions } from 'react-navigation';
import Button from '../components/button';
import IconButton from '../components/iconButton';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import Notification from '../components/notification';


import basestyles from '../styles/basestyles.js';

export default class resetPassword extends Component {

  static navigationOptions = ({ navigation }) => ({
      // title: 'Reset password',
      headerTitle:
        <Image style={localstyles.logo_image_header}
          source={require('../images/app-logo.png')} />,
      headerStyle: basestyles.header,
      headerTitleStyle: basestyles.header_title,
      headerLeft:
        <IconButton
          iconSource={require('../images/ic_arrow_back.png')}
          touchableHighlightStyle={basestyles.header_left_button}
          underlayColor={'rgba(255, 255, 255, 0)'}
          imageStyle={[basestyles.nav_icon, basestyles.header_icon_button]}
          onButtonPressed={() => navigation.goBack()}>
        </IconButton>,
      headerRight: null
        // <IconButton
        //   iconSource={require('../images/ic_check_circle.png')}
        //   touchableHighlightStyle={basestyles.nav_right_icon_button}
        //   underlayColor={'rgba(255, 255, 255, 0.3)'}
        //   imageStyle={basestyles.nav_icon}
        //   onButtonPressed={() => navigation.state.params.resetPassword()}>
        // </IconButton>,
  });

  constructor (props) {
    super(props);

    const { params } = this.props.navigation.state;

    // Inital state
    this.state = {
      email: '',
      connecting: false,
      emailErrorState: 'none',
      resetErrorEmailInvalid: false,
      resetErrorUserNotFound: false,
      resetSuccess: false,
      passwordResetSent: 'Success!',
      passwordResetInfoText: 'We sent you an email with details on how to ' +
      'complete the password reset process, you should check your inbox for ' +
      'further details.',
      forgotPassword: 'Forgot your password?',
      resetPasswordInfoText: 'No worries, simply enter the email address you ' +
      'used to create your Golf Life account. An email will be sent to ' +
      'you with details on how to complete the password reset process.',
      resetErrorEmailInvalidText: 'Sorry, this email is not valid',
      resetErrorUserNotFoundText: 'Email address does not exist',
      resetSuccessText: 'Password reset details have been sent!',
    };

    this.resetPassword = this.resetPassword.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
    this.closeNotification = this.closeNotification.bind(this);

    this.firebase = this.props.screenProps.firebase;
  }

  componentDidMount () {
    this.props.navigation.setParams({ resetPassword: this.resetPassword });
  }

  resetPassword () {
    let firebaseAuthentication = this.firebase.auth();

    this.setState({connecting: true});

    firebaseAuthentication.sendPasswordResetEmail(this.state.email)
    .then(() => this.onResetPasswordSent())
    .catch((error) => this.onResetPasswordError(error));
  }

  onResetPasswordSent () {
    this.setState({
      connecting: false,
      emailErrorState: 'none',
      textFieldState: false,
      resetErrorEmailInvalid: false,
      resetErrorUserNotFound: false,
      resetSuccess: true,
      email: ''
    });
  }

  onResetPasswordError (error) {
    var isResetErrorEmailInvalid = false;
    var isResetErrorUserNotFound = false;

    if (error && error.code == 'auth/invalid-email') {
      isResetErrorEmailInvalid = true;
    } else if (error && error.code == 'auth/user-not-found') {
      isResetErrorUserNotFound = true;
    }

    this.setState({
      connecting: false,
      emailErrorState: 'error',
      resetErrorEmailInvalid: isResetErrorEmailInvalid,
      resetErrorUserNotFound: isResetErrorUserNotFound,
      resetSuccess: false
    });
  }

  closeNotification () {
    this.setState({
      emailErrorState: 'none',
      resetErrorEmailInvalid: false,
      resetErrorUserNotFound: false,
      resetSuccess: false,
    });
  }

  render () {

    return (
      <View style={[basestyles.body,
        basestyles.main_background_color,
      ]}>

        <View style={basestyles.side_padding}>

          <Text style={localstyles.title_text}>
            {
              this.state.resetSuccess ?
              this.state.passwordResetSent :
              this.state.forgotPassword
            }
          </Text>

          <Text style={localstyles.description_text}>
            {
              this.state.resetSuccess ?
              this.state.passwordResetInfoText :
              this.state.resetPasswordInfoText
            }
          </Text>

          <TextFieldWithIcon
            iconTextFieldTypeSource={require('../images/ic_email.png')}
            iconTextFieldStateSource={require('../images/ic_error.png')}
            textFieldState={this.state.emailErrorState}
            textValue={this.state.email}
            autoFocus={false}
            onChangeText={(text) => this.setState({
              email: text,
              resetErrorEmailInvalid: false,
              resetErrorUserNotFound: false,
              resetSuccess: false,
              emailErrorState: 'none',
            })}
            placeholderText={"Enter your email address"}
            keyboardType='email-address'
            returnKeyType='go'
            onSubmitEditing={this.resetPassword} />

          <Button
            text='Reset password'
            // style={[{marginTop: 20}]}
            disabled={this.state.connecting}
            onpress={this.resetPassword}
            button_styles={this.state.connecting ?
            localstyles.login_button_disabled :
            localstyles.login_button}
            button_text_styles={this.state.connecting ?
            localstyles.login_button_text_disabled :
            localstyles.login_button_text} />

        </View>

        {this._renderMessage()}

      </View>
    );
  }

  _renderMessage () {
    if (this.state.resetErrorEmailInvalid) {
      return (
        // <View style={basestyles.error_notification}>
        //   <Image style={basestyles.icon_notification} source={require('../images/ic_error.png')} />
        //   <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetErrorEmailInvalidText}</Text>
        // </View>

        <Notification
          notificationText={this.state.resetErrorEmailInvalidText}
          onDismissNotification={this.closeNotification}
          type={'error'}
        />
      );
    } else if (this.state.resetErrorUserNotFound) {
      return (
        // <View style={basestyles.error_notification}>
        //   <Image style={basestyles.icon_notification} source={require('../images/ic_error.png')} />
        //   <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetErrorUserNotFoundText}</Text>
        // </View>

        <Notification
          notificationText={this.state.resetErrorUserNotFoundText}
          onDismissNotification={this.closeNotification}
          type={'error'}
        />
      );
    } else if (this.state.resetSuccess) {
      return (
        // <View style={basestyles.success_notification}>
        //   <Image style={basestyles.icon_notification} source={require('../images/ic_check_circle.png')} />
        //   <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetSuccessText}</Text>
        // </View>

        <Notification
          notificationText={this.state.resetSuccessText}
          onDismissNotification={this.closeNotification}
          type={'success'}
        />
      );
    } else {
      return null;
    }
  }
}

const localstyles = StyleSheet.create({

  logo_image_header: {
    marginTop: 5,
    width: 303/2.5,
    height: 92/2.5,
  },

  title_text: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '100',
    fontFamily: 'Avenir',
    fontSize: 24,
    marginTop: 60,
    paddingLeft: 20,
  },

  description_text: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '100',
    fontFamily: 'Avenir',
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 20,
    marginBottom: 40,
    paddingRight: 20,
    paddingLeft: 20,
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
});

AppRegistry.registerComponent('resetPassword', () => resetPassword);
