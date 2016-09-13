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
import Button from '../components/button';
import styles from '../styles/basestyles.js';

export default class login extends Component {

  constructor(props){
    super(props);
    // bind function to login.js scope
    this.login = this.login.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
  }

  componentWillMount() {
    this.setState({
      email: '',
      password: '',
      animating: false
    });
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
        navHeaderTitle: 'Create Account',
        leftButton: false,
        rightButton: false
      }
    });
  }


  login() {
    var firebaseApp = this.props.firebaseApp;
    var fbAuth = firebaseApp.auth();

    fbAuth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // TODO: handle errors here
      alert('Login Failed. Please try again');
    });
  }

  render(){
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
          text="Forgot password?"
          onpress={this.goToSignup}
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
}

AppRegistry.registerComponent('login', () => login);
