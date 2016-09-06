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

import styles from '../styles/basestyles.js';

export default class signup extends Component {

	constructor(props){
    super(props);

    // bind function to signup.js scope
    this.signup = this.signup.bind(this);
	}

  componentWillMount() {
    this.setState({
      email: '',
      password: ''
    });
  }

  signup() {
    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();

    fbAuth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        switch(error.code){
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
            break;
          default:
            alert("Error creating user:");
        }
    });
  }

  render() {
    return (
      <View style={styles.body}>
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
            onChangeText={(text) => this.setState({email: text})}
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
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            blurOnSubmit={true}
            placeholder={"Password"}
            onSubmitEditing={(event) => {
              this.signup;
            }}
          />
        </View>
        <Button
          text="Signup"
          onpress={this.signup}
          button_styles={styles.primary_button}
          button_text_styles={styles.primary_button_text} />

        <Button
          text="Got an Account?"
          onpress={this.props.goShowLogin}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
