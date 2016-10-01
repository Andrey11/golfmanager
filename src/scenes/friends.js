'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Picker,
  TouchableHighlight
} from 'react-native';

import { FriendStatusTypes, FriendActionTypes } from '../consts/const';

import FriendItem from '../components/friendItem';
import SearchField from '../components/searchField';

import styles from '../styles/basestyles.js';

export default class friends extends Component {

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
    this.filterUserFriendsMetaData = this.filterUserFriendsMetaData.bind(this);

    this.onAddFriend = this.onAddFriend.bind(this);
    this.onConfirmRequest = this.onConfirmRequest.bind(this);
    this.onGolferSelected = this.onGolferSelected.bind(this);

    this.showUsernames = this.showUsernames.bind(this);
    this._createSnapshotDisplayData = this._createSnapshotDisplayData.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
	}

  componentDidMount () {
    if (this.props.actionType === FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      this.loadUserFriends();
    } else if (this.props.actionType === FriendActionTypes.ADD_NEW_FRIEND) {
      this.loadAvailableUsers();
    }
  }

  componentWillUnmount () {
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;

    if (this.props.actionType === FriendActionTypes.ADD_NEW_FRIEND) {
      firebase.database().ref('users').off('value');
    }
  }

  loadAvailableUsers () {
    let firebase = this.props.firebaseApp;
    firebase.database().ref('users').on('value', this.showUsernames);
  }

  loadUserFriends () {
    let firebase = this.props.firebaseApp;
    let currentUser = firebase.auth().currentUser;
    firebase.database().ref('users/' + currentUser.uid + '/friends').once('value', this.loadUserFriendMetaData);
  }

  loadUserFriendMetaData (friendsSnapshot) {
    let firebase = this.props.firebaseApp;
    let friendsObj = friendsSnapshot.val();
    let friendsObjSize = Object.keys(friendsObj).length;
    let friendsList = [];
    let excludeList = this.props.alreadyAdded;
    let excludeListSize = Object.keys(excludeList).length;

    for(var friendUID in friendsObj) {
      if (friendsObj.hasOwnProperty(friendUID)) {
        firebase.database().ref('users/' + friendUID).once('value')
        .then((friendSnapshot) => {
          let friendData = friendSnapshot.val();
          if (!excludeList[friendSnapshot.getKey()]) {
            friendsList.push({
              username: friendData.displayName,
              key: friendSnapshot.getKey(),
              userUID: friendSnapshot.getKey(),
              friendStatus: FriendStatusTypes.APPROVED
            });
          }

          if (friendsList.length === (friendsObjSize - excludeListSize)) {
            this.setState({
              dataLoaded: true,
              snapshot: friendsList,
              currentDisplayData: friendsList
            });
          }
        });
      }
    }
  }

  filterUserFriendsMetaData () {
    let friendData = this.state.snapshot;
    let filter = this.state.filter;
    let friendsList = [];

    for(var key in friendData) {
      if (friendData.hasOwnProperty(key)) {
        let username = friendData[key].username;
        if (username.indexOf(filter) !== -1 && !this.props.alreadyAdded[key]) {
          friendsList.push(friendData[key]);
        }
      }
    }

    this.setState({currentDisplayData: friendsList});
  }

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
    if (this.props.actionType === FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      this.props.onGolferSelected(username, userUID);
    }
  }

  showUsernames (snapshot) {
    var snapshotDisplayData = this._createSnapshotDisplayData(snapshot);

    this.setState({
      dataLoaded: true,
      snapshotData: snapshot,
      currentDisplayData: snapshotDisplayData
    });
  }

  onChangeSearchText (text) {
    this.state.filter = text;

    if (this.props.actionType === FriendActionTypes.ADD_GOLFER_TO_ROUND) {
      this.filterUserFriendsMetaData();
    } else if (this.props.actionType === FriendActionTypes.ADD_NEW_FRIEND) {
      var snapshotDisplayData = this._createSnapshotDisplayData(this.state.snapshotData);
      this.setState({currentDisplayData: snapshotDisplayData});
    }
  }

  render () {
    if (!this.state.dataLoaded) {
      return this._renderPlaceholderView();
    }

    return (
      <View style={[styles.scene_offset_top, styles.select_course_body]}>
        <SearchField placeholderText={'Search by username'} onChangeSearchText={this.onChangeSearchText} />
        <ScrollView>
          {this._renderUserItems()}
        </ScrollView>
      </View>
    );
  }

  _createSnapshotDisplayData (snapshot) {
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
      let friendStatus = FriendStatusTypes.AVAILABLE;
      let userUID = key;

      if (friends && friends[currentUser.uid]) {
        friendStatus = friends[currentUser.uid]
      }

      if (!filter || (filter && username.indexOf(filter) !== -1)) {
        if (currentUser.uid !== userUID) {
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
        <ActivityIndicator
          style={styles.connecting_indicator}
          color={'rgba(0, 0, 0, 0.9)'}
          animating={true} />
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


AppRegistry.registerComponent('friends', () => friends);
