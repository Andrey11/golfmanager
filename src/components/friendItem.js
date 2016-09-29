'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

import IconTextButton from './iconTextButton';

import styles from '../styles/basestyles.js';

export default class friendItem extends Component {

  onItemPressed () {
    if (this.props.actionType) {
      this.props.onGolferSelected(this.props.username, this.props.userUID);
    }
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor={'rgba(255, 255, 255, 0.8)'}
        style={styles.selectable_course_item}
        onPress={() => this.onItemPressed()}>
        <View style={styles.friend_item}>
          <Text>{this.props.username}</Text>
          {this._renderActionField()}
        </View>
      </TouchableHighlight>
    );
  }

  _renderActionField () {
    const AVAILABLE = 'available';
    const PENDING = 'pending';
    const APPROVED = 'approved';
    const REQUESTED = 'requested';
    const BLOCKED = 'blocked';

    if (this.props.actionType) {
      return null;
    }

    if (this.props.friendStatus === AVAILABLE) {
      return (
        <IconTextButton
          touchableHighlightStyle={styles.icon_text_button}
          underlayColor={'rgba(255, 255, 255, 0.8)'}
          onButtonPressed={() => {this.props.onAddFriend(this.props.username, this.props.userUID)}}
          imageStyle={[styles.icon_button, styles.margin_right_5]}
          imageSource={require('../images/ic_person_add.png')}
          buttonTextStyle={styles.friend_item_text}
          buttonText={'Add Friend'}>
        </IconTextButton>
      );
    } else if (this.props.friendStatus === PENDING) {
      return (
        <IconTextButton
          touchableHighlightStyle={styles.icon_text_button}
          underlayColor={'rgba(255, 255, 255, 0.8)'}
          onButtonPressed={() => {this.props.onConfirmRequest(this.props.username, this.props.userUID)}}
          imageStyle={[styles.icon_button, styles.margin_right_5]}
          imageSource={require('../images/ic_person_add.png')}
          buttonTextStyle={styles.friend_item_text}
          buttonText={'Confirm'}>
        </IconTextButton>
      );
    } else if (this.props.friendStatus === REQUESTED) {
      return (
        <View>
          <Text>{'REQUESTED'}</Text>
        </View>
      );
    } else if (this.props.friendStatus === APPROVED) {
      return (
        <View>
          <Text>{'APPROVED'}</Text>
        </View>
      );
    } else if (this.props.friendStatus === BLOCKED) {
      return (
        <View>
          <Text>{'BLOCKED'}</Text>
        </View>
      );
    } else {
      return null;
    }
  }

}

AppRegistry.registerComponent('friendItem', () => friendItem);
