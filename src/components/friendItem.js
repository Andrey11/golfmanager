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
import { FriendStatusTypes, FriendActionTypes } from '../const/const';
import IconTextButton from './iconTextButton';

import styles from '../styles/basestyles.js';

export default class friendItem extends Component {

  onItemPressed () {
    if (this.props.actionType === FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      this.props.onGolferSelected(this.props.username, this.props.userUID);
    }
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor={'rgba(255, 255, 255, 0.8)'}
        style={styles.selectable_item}
        onPress={() => this.onItemPressed()}>
        <View style={styles.friend_item}>
          <Text>{this.props.username}</Text>
          {this._renderActionField()}
        </View>
      </TouchableHighlight>
    );
  }

  _renderActionField () {
    if (this.props.actionType === FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      return null;
    }

    if (this.props.friendStatus === FriendStatusTypes.AVAILABLE) {
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
    } else if (this.props.friendStatus === FriendStatusTypes.PENDING) {
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
    } else if (this.props.friendStatus === FriendStatusTypes.REQUESTED) {
      return (
        <View>
          <Text>{'REQUESTED'}</Text>
        </View>
      );
    } else if (this.props.friendStatus === FriendStatusTypes.APPROVED) {
      return (
        <View>
          <Text>{'APPROVED'}</Text>
        </View>
      );
    } else if (this.props.friendStatus === FriendStatusTypes.BLOCKED) {
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
