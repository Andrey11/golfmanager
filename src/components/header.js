'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';
import IconButton from './iconButton';

export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        { this.props.showBackButton ?
          <IconButton
            icon={require('../images/ic_arrow_back.png')}
            onButtonPressed={this.props.onBackButtonPressed}>
          </IconButton> :
          null
        }
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
        { this.props.showSettingsButton ?
          <IconButton
            icon={require('../images/ic_settings.png')}
            onButtonPressed={this.props.onSettingsButtonPressed}>
          </IconButton> :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DDDDDD',
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#000',
    fontSize: 18
  }
});

AppRegistry.registerComponent('header', () => header);
