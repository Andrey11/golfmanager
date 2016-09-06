'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../components/button';
import styles from '../styles/basestyles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    // bind function to login.js scope
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.setState({
      email: '',
      password: ''
    });
  }

  login() {

    var firebaseApp = this.props.firebaseApp;
    var fbAuth = firebaseApp.auth();

    fbAuth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      alert('Login Failed. Please try again');
    });
  }

  render(){
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
            placeholder={"Password"}
            onSubmitEditing={(event) => {
              this.login;
            }}
          />
        </View>
        <Button
          text="Login"
          onpress={this.login}
          button_styles={styles.primary_button}
          button_text_styles={styles.primary_button_text} />
        <Button
          text="New here?"
          onpress={this.props.onShowSignup}
          button_styles={styles.transparent_button}
          button_text_styles={styles.transparent_button_text} />
      </View>
    );
  }
}

AppRegistry.registerComponent('login', () => login);
