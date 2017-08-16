'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class usernameField extends Component {


  constructor (props) {
    super(props);

    this.state = {
      username: '',
      propUsername: this.props.username,
      serverCommunicating: false,
      usernameVerfied: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      errorUsernameIsTakenText: 'This username is already taken',
      errorUsernameIsRequiredText: 'To create an account you need a unique username',
    };

    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
  }

  verifyUsernameAvailable () {
    let user = this.props.firebase.auth().currentUser;

    if (user.displayName === this.state.username) {
      this.props.onBlur(this.state);
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
      this.props.onBlur({
        error: true,
        errorText: this.state.errorUsernameIsTakenText,
        username: this.state.username
      });
    } else {
      let usernamesRef = this.props.firebase.database().ref('usernames');
      usernamesRef.orderByValue().equalTo(username).once('value')
      .then((snapshot) => {
        this.setState({
          errorUsernameIsTaken: snapshot.exists(),
          usernameVerfied: !snapshot.exists(),
          errorUsernameIsRequired: false,
          serverCommunicating: false
        });

        let isError =  snapshot.exists();
        let errorText = snapshot.exists() ? this.state.errorUsernameIsRequiredText : '';
        this.props.onBlur({
          error: isError,
          errorText: errorText,
          username: this.state.username
        });
      });
    }
  }

  render () {

    if (this.state.propUsername !== this.props.username) {
      this.state.propUsername = this.props.username;
      this.state.username = this.props.username;
    }

    return (
      <View style={styles.text_field_with_icon}>
        <Image style={styles.icon_button} source={require('../images/ic_account_box.png')} />
        <TextInput
          ref="usernameTextField"
          style={styles.textinput_with_two_icons}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder={"Username"}
          autoCorrect={false}
          autoFocus={this.props.isAutoFocus}
          value={this.state.username}
          onBlur={this.verifyUsernameAvailable}
          onChangeText={(text) => {
            this.setState({
              username: text,
              usernameVerfied: false,
              errorUsernameIsTaken: false,
              errorUsernameIsRequired: false
            });
            this.props.onChangeText(text);
          }}
          onSubmitEditing={(event) => {
            this.props.onSubmitEditing(event);
          }}
        />
        {this._renderStatusNotification()}
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
      return require('../images/ic_check_circle.png');
    } else {
      return require('../images/ic_error.png');
    }
  }
}

AppRegistry.registerComponent('usernameField', () => usernameField);
