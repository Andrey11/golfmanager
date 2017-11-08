'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  base_cssheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
} from 'react-native';

import Button from '../components/button';
import UsernameField from '../components/usernameField';
import IconButton from '../components/iconButton';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import TextField from '../components/textField';

import * as NavActionsUtil from '../navigation/navigationActionsUtil';

import basestyles from '../styles/basestyles.js';

export default class settingsView extends Component {

  //TODO: perform slide down action when opening settings
  static navigationOptions = ({ navigation }) => ({
      title: 'Settings',
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
          iconSource={require('../images/ic_check.png')}
          touchableHighlightStyle={basestyles.header_right_button}
          underlayColor={'rgba(255, 255, 255, 0)'}
          imageStyle={[basestyles.nav_icon, basestyles.header_icon_button]}
          onButtonPressed={() => navigation.state.params.updateDatabaseInfo()}>
        </IconButton>,

  });

  constructor (props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.usernameFieldData = null;

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      serverCommunicating: false,
      userInfoLoaded: false,
      usernameVerfied: false,
      errorUsernameIsTaken: false,
      errorUsernameIsRequired: false,
      error: false,
    };

    // bind function to settings.js scope
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.logout = this.logout.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyUsernameAvailable = this.verifyUsernameAvailable.bind(this);
    this.editUserSettings = this.editUserSettings.bind(this);
    this.loadUserInfo = this.loadUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.updateNicknamesColumns = this.updateNicknamesColumns.bind(this);
    this.updateDatabaseInfo = this.updateDatabaseInfo.bind(this);

    // handlers for usernameField component
    this.onUsernameFieldUpdate = this.onUsernameFieldUpdate.bind(this);
    this.onUsernameFieldSubmitEditing = this.onUsernameFieldSubmitEditing.bind(this);

    this.firebase = this.props.screenProps.firebase;
  }

  componentDidMount () {
    // RightButtonMapper.bindButton(this.props.navigator, this.editUserSettings);
    let firebaseAuthentication = this.firebase.auth();
    this.unsubscribeOnAuthStateChanged =
      firebaseAuthentication.onAuthStateChanged(this.onAuthStateChanged);
    this.props.navigation.setParams({ updateDatabaseInfo: this.updateDatabaseInfo });
    this.loadUserInfo();
  }

  componentWillUnmount() {
    this.unsubscribeOnAuthStateChanged();
  }

  onAuthStateChanged (user) {
    if (user === null) {
      this.props.navigation.dispatch(NavActionsUtil.unauthenticated);
    }
  }

  loadUserInfo () {
    let firebaseApp = this.props.screenProps.firebase;
    let user = firebaseApp.auth().currentUser;
    let userDisplayName = user.displayName || '';
    let userInfoRef = firebaseApp.database().ref('users/' + user.uid);

    userInfoRef.once('value')
    .then((snapshot) => this.setUserInfo(snapshot, user));
  }

  setUserInfo (snapshot, user) {
    let userInfo = snapshot.val();

    this.setState({
      username: user.displayName,
      email: user.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      userInfoLoaded: true,
      server_state: {
        username: user.displayName,
        email: user.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
      },
    });
  }

  verifyEmail () {
    // TODO: Check if email verification has been set somehow so not to spam the user
    // user.sendEmailVerification();
  }

  editUserSettings () {
    if (!this.state.userInfoLoaded) {
      return;
    }

    this.props.navigator.push({
      component: SettingsEdit,
      passProps: {
        navHeaderTitle: '',
        leftButton: true,
        rightButton: true,
        rightButtonName: 'DONE',
        username: this.state.username,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      }
    });
  }

  updateNicknamesColumns () {
    let firebaseApp = this.props.screenProps.firebase;
    let user = firebaseApp.auth().currentUser;
    let updates = {};

    updates['/usernames/' + user.uid] = user.displayName.toLowerCase();
    return firebaseApp.database().ref().update(updates);
  }

  updateDatabaseInfo () {
    let firebaseApp = this.props.screenProps.firebase;
    let user = firebaseApp.auth().currentUser;
    let currentDate = new Date().getTime() / 1000;
    let updates = {
      displayName: user.displayName,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
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
      modifiedOn: currentDate
    };

    firebaseApp.database().ref('/users/' + user.uid).update(updates)
    .then(() => {this.props.navigation.goBack()});
  }

  verifyUsernameAvailable () {
    let firebaseApp = this.props.screenProps.firebase;
    let user = firebaseApp.auth().currentUser;

    if (user.displayName === this.state.username) {
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

  logout () {
    this.props.screenProps.firebase.auth().signOut();
  }

  onUsernameFieldUpdate (usernameFieldData) {
    this.usernameFieldData = usernameFieldData;
    this.setState({error: this.usernameFieldData.error});
  }

  onUsernameFieldSubmitEditing () {
    this.refs.firstnameTextField.focus();
  }

  render () {
/*
<View style={basestyles.text_field_with_icon}>
  <Image style={basestyles.icon_button} source={require('../images/ic_account_box.png')} />
  <TextInput
    ref="firstnameTextField"
    style={basestyles.textinput}
    keyboardType="default"
    placeholder={"First name"}
    autoCapitalize="none"
    autoCorrect={false}
    value={this.state.firstname}
    onChangeText={(text) => this.setState({firstname: text})}
  />
</View>
*/
    return (
      <View style={[basestyles.body,
                    basestyles.main_background_color]}>

        <Image
          style={basestyles.icon_button_large}
          source={require('../images/ic_account_box.png')} />

        {/*}<UsernameField
          firebase={this.props.screenProps.firebase}
          username={this.state.username}
          onBlur={this.onUsernameFieldUpdate}
          isAutoFocus={false}
          onChangeText={() => this.setState({error: false})}
          onSubmitEditing={this.onUsernameFieldSubmitEditing}
        />

        {this._checkForErrorsInUsernameField()}

        <TextField
          onChangeText={(text) => this.setState({firstname: text})}
          fieldLabel='First name'
          value={this.state.firstname} />

        <View style={basestyles.text_field_with_icon}>
          <Image style={basestyles.icon_button} source={require('../images/ic_account_box.png')} />
          <TextInput
            style={basestyles.textinput}
            keyboardType="default"
            placeholder={"Last name"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.lastname}
            onChangeText={(text) => this.setState({lastname: text})}
          />
        </View>

        <View style={basestyles.text_field_with_icon}>
          <Image style={basestyles.icon_button} source={require('../images/ic_email.png')} />
          <TextInput
            style={basestyles.textinput}
            keyboardType="email-address"
            placeholder={"Email Address"}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            editable={false}
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>*/}

        <Button
          text="Logout"
          onpress={this.logout}
          button_styles={localstyles.button}
          button_text_styles={localstyles.button_text} />
      </View>
    );
  }

  _checkForErrorsInUsernameField () {
    if (this.state.error && this.usernameFieldData && this.usernameFieldData.error) {
      return this._renderErrorNotification(this.usernameFieldData.errorText);
    }
    return null;
  }

  _renderErrorNotification (errorText) {
    return (
      <View style={basestyles.error_notification}>
        <Image style={basestyles.icon_notification} source={require('../images/ic_error.png')} />
        <Text numberOfLines={5} style={basestyles.notification_text}>{errorText}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('settingsView', () => settingsView);


const localstyles = StyleSheet.create({
  add_round_button: {
    backgroundColor: 'rgba(0, 145, 27, 1)',
    borderColor: 'rgba(0, 145, 27, 1)',
    borderRadius: 45,
    borderWidth: 1,
    margin: 10,
    padding: 20,
  },

  button_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '200',
    fontFamily: 'Avenir',
  },

  button: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 115, 55, 1)',
    borderColor: 'rgba(55, 115, 55, 1)',
    borderRadius: 3,
    borderWidth: 1,
  },


});
