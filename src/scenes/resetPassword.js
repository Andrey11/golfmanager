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


import basestyles from '../styles/basestyles.js';

export default class resetPassword extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: 'Reset password',
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
      headerRight:
        <IconButton
          iconSource={require('../images/ic_check_circle.png')}
          touchableHighlightStyle={basestyles.nav_right_icon_button}
          underlayColor={'rgba(255, 255, 255, 0.3)'}
          imageStyle={basestyles.nav_icon}
          onButtonPressed={() => navigation.state.params.resetPassword()}>
        </IconButton>,
  });

  constructor (props) {
    super(props);

    const { params } = this.props.navigation.state;

    // Inital state
    this.state = {
      email: '',
      connecting: false,
      resetErrorEmailInvalid: false,
      resetErrorUserNotFound: false,
      resetSuccess: false,
      resetPasswordInfo: 'Hello asdsad sadasd sadadas \n asdasdsad asdasda asdasd \n asdasdadasd',
      resetErrorEmailInvalidText: 'Email address you provided is invalid',
      resetErrorUserNotFoundText: 'Email address does not exist',
      resetSuccessText: 'Password reset email has been sent, please check your email for a link to create a new password'
    };

    this.resetPassword = this.resetPassword.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
  }

  componentDidMount () {
    this.props.navigation.setParams({ resetPassword: this.resetPassword });
  }

  resetPassword () {
    var firebaseApp = this.props.screenProps.firebase;
    var fbAuth = firebaseApp.auth();

    this.setState({connecting: true});

    fbAuth.sendPasswordResetEmail(this.state.email)
    .then(() => this.onResetPasswordSent())
    .catch((error) => this.onResetPasswordError(error));
  }

  onResetPasswordSent () {
    this.setState({
      connecting: false,
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
      resetErrorEmailInvalid: isResetErrorEmailInvalid,
      resetErrorUserNotFound: isResetErrorUserNotFound,
      resetSuccess: false
    });
  }
  /*  <View style={basestyles.text_field_with_icon}>
      <View style={basestyles.image_wrapper}>
        <Image style={basestyles.image_textfield_icon} source={require('../images/ic_email.png')} />
      </View>
      <TextInput
        style={basestyles.textinput}
        underlineColorAndroid='rgba(0,0,0,0)'
        keyboardType="email-address"
        placeholder={"Enter your email address"}
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
    </View>*/
  render () {
    /**
    <View style={basestyles.body}>
      <View style={basestyles.text_field_with_icon}>
        <Image style={basestyles.icon_button} source={require('../images/ic_email.png')} />
        <TextInput
          style={basestyles.textinput}
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

      <ActivityIndicator
        style={basestyles.connecting_indicator}
        color={'rgba(0, 0, 0, 0.9)'}
        animating={this.state.connecting} />

      <Button
        text="Return to login"
        onpress={this.goToLogin}
        button_styles={basestyles.semi_transparent_button}
        button_text_styles={basestyles.semi_transparent_button_text} />
    </View>
    */
    return (
      <View style={[basestyles.unathenticated_body,
                    basestyles.main_background_color,
                    basestyles.side_padding
                  ]}>
        <Text >
          {this.state.resetPasswordInfo}
        </Text>

        <TextFieldWithIcon
          iconSource={require('../images/ic_email.png')}
          textValue={this.state.email}
          onChangeText={(text) => this.setState({
            email: text,
            resetErrorEmailInvalid: false,
            resetErrorUserNotFound: false,
            resetSuccess: false
          })}
          placeholderText={"Enter your email address"}
          keyboardType="email-address"
        />


        {this._renderMessage()}

        <ActivityIndicator
          style={basestyles.connecting_indicator}
          color={'rgba(0, 0, 0, 0.9)'}
          animating={this.state.connecting} />
      </View>
    );
  }

  _renderMessage () {
    if (this.state.resetErrorEmailInvalid) {
      return (
        <View style={basestyles.error_notification}>
          <Image style={basestyles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetErrorEmailInvalidText}</Text>
        </View>
      );
    } else if (this.state.resetErrorUserNotFound) {
      return (
        <View style={basestyles.error_notification}>
          <Image style={basestyles.icon_notification} source={require('../images/ic_error.png')} />
          <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetErrorUserNotFoundText}</Text>
        </View>
      );
    } else if (this.state.resetSuccess) {
      return (
        <View style={basestyles.success_notification}>
          <Image style={basestyles.icon_notification} source={require('../images/ic_check_circle.png')} />
          <Text numberOfLines={5} style={basestyles.notification_text}>{this.state.resetSuccessText}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

AppRegistry.registerComponent('resetPassword', () => resetPassword);
