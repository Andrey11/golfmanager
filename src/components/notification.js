'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import basestyles from '../styles/basestyles.js';

export default class notification extends Component {

  constructor (props) {
    super(props);

    this._getNotificationStyleByType = this._getNotificationStyleByType.bind(this);
  }

  _getNotificationStyleByType () {
    if (this.props.type === 'error') {
      return basestyles.error_notification;
    }
    // else if (this.props.type === 'success') {
      return basestyles.success_notification;
    // }

  }

  render(){
    return (
      <View style={[this._getNotificationStyleByType(), this.props.style]}>

        <Text numberOfLines={5} style={basestyles.notification_text}>
          {this.props.notificationText}
        </Text>

        <TouchableOpacity
          style={localstyles.icon_close_position}
          onPress={this.props.onDismissNotification}>
          <Image
            source={require('../images/ic_highlight_off.png')}
            style={[localstyles.icon_close]} />
        </TouchableOpacity>

      </View>
    );
  }
}

const localstyles = StyleSheet.create({
  icon_close_position: {
    // position: 'absolute',
    // alignItems: 'flex-end',
    right: 10,
  },

  icon_close: {
    width: 24,
    height: 24,
    // tintColor: 'rgba(200, 200, 200, 0.8)',
    tintColor: 'rgba(0, 0, 0, 0.4)',
  },
});

AppRegistry.registerComponent('notification', () => notification);
