'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Picker,
  TouchableHighlight
} from 'react-native';

import { FriendStatusTypes, FriendActionTypes } from '../const/const';

import FriendItem from '../components/friendItem';
import SearchField from '../components/searchField';

import styles from '../styles/basestyles.js';

export default class addFriend extends Component {

	constructor (props) {
    super(props);

    this.state = {
      dataLoaded: false,
      filter: null,
      noMatches: 'Could not find the person you are looking for.'
    };

    // TODO: Add ability to invite friends (possibly via email address from contact address book)
    // noMatches: 'Could not find the person you are looking for. You may invite this person by clicking invite friend button.'

    this.loadAvailableUsers = this.loadAvailableUsers.bind(this);
    this.loadUserFriends = this.loadUserFriends.bind(this);
    this.loadUserFriendMetaData = this.loadUserFriendMetaData.bind(this);

    this.onAddFriend = this.onAddFriend.bind(this);
    this.onConfirmRequest = this.onConfirmRequest.bind(this);
    this.onGolferSelected = this.onGolferSelected.bind(this);

    this.showUsernames = this.showUsernames.bind(this);
    this.createSnapshotDisplayData = this.createSnapshotDisplayData.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
	}

  componentDidMount () {
    if (FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      this.loadUserFriends();
    } else {
      this.loadAvailableUsers();
    }
  }

  componentWillUnmount () {
    let firebase = this.props.firebaseApp;

    if (FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      let currentUser = firebase.auth().currentUser;
      this.loadUserFriends();
    } else {
      firebase.database().ref('users/' + currentUser.uid + '/friends').off('value');
    }
  }

  loadAvailableUsers () {
    let firebase = this.props.firebaseApp;
    firebase.database().ref('users').orderByKey().on('value', this.showUsernames);
  }

  loadUserFriends () {
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;
    firebase.database().ref('users/' + currentUser.uid + '/friends').orderByKey().on('value', this.loadUserFriendMetaData);
  }

  loadUserFriendMetaData

  onAddFriend (username, userUID) {
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;
    let updates = {};

    updates['users/' + userUID + '/friends/' + currentUser.uid] = 'requested';
    updates['users/' + currentUser.uid + '/friends/' + userUID] = 'pending';

    firebase.database().ref().update(updates);
  }

  onConfirmRequest (username, userUID) {
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;
    let updates = {};

    updates['users/' + userUID + '/friends/' + currentUser.uid] = 'approved';
    updates['users/' + currentUser.uid + '/friends/' + userUID] = 'approved';

    firebase.database().ref().update(updates);
  }

  onGolferSelected (username, userUID) {
    if (this.props.actionType) {
      this.props.onGolferSelected(username, userUID);
    }
  }

  showUsernames (snapshot) {
    var snapshotDisplayData = this.createSnapshotDisplayData(snapshot);

    this.setState({
      dataLoaded: true,
      snapshotData: snapshot,
      currentDisplayData: snapshotDisplayData
    });
  }

  onChangeSearchText (text) {
    this.state.filter = text;
    var snapshotDisplayData = this.createSnapshotDisplayData(this.state.snapshotData);
    this.setState({currentDisplayData: snapshotDisplayData});
  }

  createSnapshotDisplayData (snapshot) {
    let filter = this.state.filter;
    let snapshotDisplayData = [];
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;

    // TODO:
    // - mark friends as already added
    // - mark pending friends as pending
    snapshot.forEach(function (snapshotChild) {
      let snapshotDisplayItem = {};
      let userData = snapshotChild.val();
      let username = userData.displayName;
      let key = snapshotChild.getKey();
      let friends = userData.friends || null;
      let friendStatus = friends[currentUser.uid] || FriendStatusTypes.AVAILABLE;
      let userUID = key;

      if (!filter || (filter && username.indexOf(filter) !== -1)) {
        if (currentUser.uid !== userUID && friendStatus === FriendStatusTypes.APPROVED) {
          snapshotDisplayItem.username = username;
          snapshotDisplayItem.key = key;
          snapshotDisplayItem.userUID = userUID;
          snapshotDisplayItem.friendStatus = friendStatus;
          snapshotDisplayData.push(snapshotDisplayItem);
        }
      }
    });

    return snapshotDisplayData;
  }

  render () {
    if (!this.state.dataLoaded) {
      return this._renderPlaceholderView();
    }

    return (
      <View style={styles.select_course_body}>
        <SearchField placeholderText={'Search by username'} onChangeSearchText={this.onChangeSearchText} />
        <ScrollView>
          {this._renderUserItems()}
        </ScrollView>
        <SearchField />
      </View>
    );
  }

  _renderUserItems () {
    let userData = this.state.currentDisplayData;
    let childComponents = [];

    for(let userDataItem of userData) {
      let userItem = <FriendItem key={userDataItem.key}
                        onConfirmRequest={this.onConfirmRequest}
                        onAddFriend={this.onAddFriend}
                        onGolferSelected={this.onGolferSelected}
                        userUID={userDataItem.userUID}
                        friendStatus={userDataItem.friendStatus}
                        actionType={this.props.actionType}
                        username={userDataItem.username} />;

      childComponents.push(userItem);
    }

    if (childComponents.length > 0) {
      childComponents.sort(this._sortByUsername);
      return childComponents;
    } else {
      return this._renderEmptyCourseDisplay();
    }
  }

  _renderEmptyCourseDisplay () {
    return (
      <View>
        <Text>{this.state.noMatches}</Text>
      </View>
    );
  }

  _renderPlaceholderView () {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  _sortByUsername (a, b) {
    var nameA = a.props.username.toUpperCase(); // ignore upper and lowercase
    var nameB = b.props.username.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
}


AppRegistry.registerComponent('addFriend', () => addFriend);
