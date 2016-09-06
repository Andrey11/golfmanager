'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import Login from './login';
import Settings from './settings';
import SplashScreen from './splashScreen';
import Signup from './signup';
import UserMain from './userMain';

import GiftedSpinner from 'react-native-gifted-spinner';
import Header from '../components/header';

import styles from '../styles/basestyles.js';

export default class appContainer extends Component {

	constructor (props) {
		super(props);

    // bind function to appContainer.js scope
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.onShowSettings = this.onShowSettings.bind(this);
    this.onShowSignup = this.onShowSignup.bind(this);
    this.onShowLogin = this.onShowLogin.bind(this);
    this.onBackButtonPressed = this.onBackButtonPressed.bind(this);
    this.onShowUserMain = this.onShowUserMain.bind(this);

    let firebaseApp = this.props.firebaseApp;
    let fbAuth = firebaseApp.auth();
    fbAuth.onAuthStateChanged(this.onAuthStateChanged);
	}

  componentWillMount () {
    this.setState({
      componentName: 'SplashScreen',
      headerTitle: '',
      loaded: false
    });
  }

  onShowSettings () {
    this.setState({
      componentName: 'Settings',
      headerTitle: 'Settings',
      loaded: true,
      showBackButton: true
    });
  }

  onShowSignup () {
    this.setState({
      componentName: 'Signup',
      headerTitle: "Create Account",
      loaded: false
    });
  }

  onShowLogin () {
    this.setState({
      componentName: 'Login',
      headerTitle: 'Login',
      loaded: false
    });
  }

  onShowUserMain () {
    this.setState({
      componentName: 'UserMain',
      headerTitle: 'Main Hub',
      loaded: true,
      showBackButton: false
    });
  }

  onBackButtonPressed () {
    this.setState({
      componentName: 'UserMain',
      headerTitle: 'Main Hub',
      loaded: true,
      showBackButton: false
    });
  }

  onAuthStateChanged (user) {
    if (user !== null) {
      if(!user.emailVerified) {
        this.onShowSettings();
      } else {
        this.onShowUserMain();
      }
    } else {
      this.onShowLogin();
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Header text={this.state.headerTitle}
          showBackButton={this.state.loaded && this.state.showBackButton === true}
          showSettingsButton={this.state.loaded && this.state.componentName !== 'Settings'}
          onBackButtonPressed={this.onBackButtonPressed}
          onSettingsButtonPressed={this.onShowSettings} />
        <View>
          {(() => {
            switch (this.state.componentName) {
              case "SplashScreen":
                return <SplashScreen />;
              case "Settings":
                return <Settings firebaseApp={this.props.firebaseApp} />
              case "Signup":
                return <Signup firebaseApp={this.props.firebaseApp} goShowLogin={this.onShowLogin} />;
              case "Login":
                return <Login firebaseApp={this.props.firebaseApp} onShowSignup={this.onShowSignup} />;
              case "UserMain":
                return <UserMain firebaseApp={this.props.firebaseApp} />;
              default:
                return <SplashScreen />;
            }
          })()}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('appContainer', () => appContainer);
