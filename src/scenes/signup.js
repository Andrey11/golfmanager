'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native';

import Button from '../components/button';
import IconButton from '../components/iconButton';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import Notification from '../components/notification';

import * as Validator from '../utilities/validator';

import * as NavActionsUtil from '../navigation/navigationActionsUtil';

import basestyles from '../styles/basestyles.js';

export default class signup extends Component {

  static navigationOptions = ({ navigation }) => ({
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
  });

	constructor (props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      connecting: false,
      usernameTextFieldState: 'none',
      emailErrorState: 'none',
      passwordErrorState: 'none',
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
      errorUsernameIsRequiredText: 'To create an account a unique username is required',
      errorEmailInvalidText: 'Email address you provided is invalid',
      errorUserAlreadyInUseText: 'Email address you provided is already in use',
      errorOperationNotAllowedText: 'Unable create an account.\n' +
      'Please contact golfmanager team.',
      errorPasswordWeakText: 'Password you provided is too short',
      createAccount: 'Create account',
      createAccountInfoText: 'Join Golf Life community and keep track of all ' +
      'your golf achievements in one place. Play with your friends. ' +
      'Earn rewards. And most importantly, have fun!',
    };

    this.signup = this.signup.bind(this);
    this.addUserToGolfmanagerDatabase = this.addUserToGolfmanagerDatabase.bind(this);
    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
    this._renderNotification = this._renderNotification.bind(this);

    this.firebase = this.props.screenProps.firebase;
	}

  componentDidMount () {

  }

  verifyUsernameAvailable () {
    let firebaseApp = this.firebase;
    let username = this.state.username.toLowerCase();

    this.setState({
      serverCommunicating: true,
      usernameTextFieldState: 'communicating',
    });

    if (username.length === 0) {
      this.setState({
        errorUsernameIsTaken: false,
        usernameVerfied: true,
        serverCommunicating: false,
        errorUsernameIsRequired: true,
        usernameTextFieldState: 'error',
      });
    } else {


      let usernamesRef = firebaseApp.database().ref('usernames');
      usernamesRef.orderByValue().equalTo(username).once('value')
      .then((snapshot) => {
        this.setState({
          errorUsernameIsTaken: snapshot.exists(),
          usernameVerfied: true,
          errorUsernameIsRequired: false,
          serverCommunicating: false,
          usernameTextFieldState: snapshot.exists() ? 'error' : 'success',
        });

        if (!snapshot.exists()) {
          this.refs.emailTextField.setFocus();
        }
      });
    }
  }

  signup () {
    let firebaseAuthentication = this.firebase.auth();

    if (this.state.creatingAccount || this.state.serverCommunicating) {
      return;
    }

    if (!this.state.usernameVerfied) {
      return;
    }

    this.setState({connecting: true});
    this.state.creatingAccount = true;

    // TODO: Should we display a small modal dialog saying
    // "Creating Account"

    let email = this.state.email.trim();
    let password = this.state.password.trim();

    firebaseAuthentication.createUserWithEmailAndPassword(email, password)
    .then((user) => this.setUserDisplayName(user))
    .catch((error) => this.onSignupError(error));
  }

  onSignupError (error) {
    let isErrorEmailInvalid = false;
    let isErrorUserAlreadyInUse = false;
    let isErrorOperationNotAllowed = false;
    let isErrorPasswordWeak = false;
    let emailErrorState = 'none';
    let passwordErrorState = 'none';

    if (error && error.code == 'auth/invalid-email') {
      isErrorEmailInvalid = true;
      emailErrorState = 'error';
    } else if (error && error.code == 'auth/email-already-in-use') {
      isErrorUserAlreadyInUse = true;
      emailErrorState = 'error';
    } else if (error && error.code == 'auth/operation-not-allowed') {
      isErrorOperationNotAllowed = true;
    } else if (error && error.code == 'auth/weak-password') {
      isErrorPasswordWeak = true;
      passwordErrorState = 'error';
    }

    this.setState({
      errorEmailInvalid: isErrorEmailInvalid,
      errorUserAlreadyInUse: isErrorUserAlreadyInUse,
      errorOperationNotAllowed: isErrorOperationNotAllowed,
      errorPasswordWeak: isErrorPasswordWeak,
      emailErrorState: emailErrorState,
      passwordErrorState: passwordErrorState,
      creatingAccount: false,
      connecting: false,
    });
  }

  setUserDisplayName (user) {
    user.updateProfile({displayName: this.state.username})
    .then(() => this.addUserToGolfmanagerDatabase());
  }

  addUserToGolfmanagerDatabase () {
    let firebase = this.firebase;
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

  closeNotification () {
    this.setState({
      emailErrorState: 'none',
      passwordErrorState: 'none',
      errorEmailInvalid: false,
      errorEmptyEmail: false,
      errorUserDisabled: false,
      errorUserNotFound: false,
      errorWrongPassword: false,
      errorEmptyPassword: false,
    });
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={[basestyles.body, basestyles.main_background_color,]}
        behavior='position'
      >

        {/* <View style={basestyles.text_field_with_icon}>
          <Image style={basestyles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            ref="usernameTextField"
            style={basestyles.textinput_with_two_icons}
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
        </View> */}

        <View style={basestyles.side_padding}>

          <Text style={localstyles.title_text}>
            {this.state.createAccount}
          </Text>

          <Text style={localstyles.description_text}>
            {this.state.createAccountInfoText}
          </Text>

          <TextFieldWithIcon
            ref='usernameTextField'
            iconTextFieldTypeSource={require('../images/ic_account_box.png')}
            textFieldState={this.state.usernameTextFieldState}
            textValue={this.state.username}
            autoFocus={false}
            onChangeText={(text) => this.setState({
                username: text,
                usernameVerfied: false,
                errorUsernameIsTaken: false,
                errorUsernameIsRequired: false,
            })}
            placeholderText={'Username'}
            keyboardType='default'
            returnKeyType='next'
            onBlur={this.verifyUsernameAvailable}
            onSubmitEditing={this.verifyUsernameAvailable} />

          <TextFieldWithIcon
            ref='emailTextField'
            style={[{marginTop: 20}]}
            iconTextFieldTypeSource={require('../images/ic_email.png')}
            iconTextFieldStateSource={require('../images/ic_error.png')}
            textFieldState={this.state.emailErrorState}
            textValue={this.state.email}
            autoFocus={false}
            onChangeText={(text) => this.setState({
              email: text,
              errorEmailInvalid: false,
              errorUserAlreadyInUse: false,
              errorOperationNotAllowed: false,
              emailErrorState: 'none',
            })}
            placeholderText={'Email address'}
            keyboardType='email-address'
            returnKeyType='next'
            // onBlur={this.onSubmitEmail}
            onSubmitEditing={() => {
              if (!Validator.validateEmail(this.state.email)) {
                this.setState({
                  errorEmailInvalid: true,
                  errorUserAlreadyInUse: false,
                  errorOperationNotAllowed: false,
                  emailErrorState: 'error',
                })
              } else {
                this.refs.passwordTextField.setFocus();
              }
            }} />

          <TextFieldWithIcon
            ref='passwordTextField'
            style={[{marginTop: 20}]}
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
            onSubmitEditing={(event) => this.signup()} />

          <Button
            text='Create account'
            style={[{marginTop: 20}]}
            disabled={this.state.connecting}
            connecting={this.state.connecting}
            onpress={this.signup}
            button_styles={this.state.connecting ?
            localstyles.login_button_disabled :
            localstyles.login_button}
            button_text_styles={this.state.connecting ?
            localstyles.login_button_text_disabled :
            localstyles.login_button_text} />

        </View>

        {/* <View style={basestyles.text_field_with_icon}>
          <Image style={basestyles.icon_button} source={require('../images/ic_email.png')} />
  		    <TextInput
            ref="emailTextField"
            style={basestyles.textinput}
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
        </View>*/}



        {/* <View style={basestyles.text_field_with_icon}>
          <Image style={basestyles.icon_button} source={require('../images/ic_key.png')} />
          <TextInput
            ref="passwordTextField"
            style={basestyles.textinput}
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
        </View> */}

        {this._renderNotification()}

      </KeyboardAvoidingView>
    );
  }

  _renderStatusNotification () {
    if (this.state.serverCommunicating) {
      return (<ActivityIndicator style={basestyles.activity_indicator} animating={true} size="small"/>);
    }
    return (<Image style={this._getStyleForUsernameField()} source={this._getStatusImageForUsernameField()} />);
  }

  _getStyleForUsernameField () {
    if (this.state.usernameVerfied) {
      return basestyles.icon_button_green;
    } else if (this.state.errorUsernameIsTaken || this.state.errorUsernameIsRequired) {
      return basestyles.icon_button_red;
    } else {
      return basestyles.icon_hidden;
    }
  }

  _getStatusImageForUsernameField () {
    if (this.state.usernameVerfied) {
      return require('../images/ic_verified_user.png');
    } else {
      return require('../images/ic_error.png');
    }
  }

  _renderNotification () {
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
      <Notification
        notificationText={errorText}
        type={'error'}
        onDismissNotification={this.closeNotification}
      />
    );
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
    marginBottom: 20,
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

AppRegistry.registerComponent('signup', () => signup);
