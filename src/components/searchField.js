'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native';

import styles from '../styles/basestyles.js';

export default class searchField extends Component {

  render () {
    return (
      <View style={styles.search_field_outter_wrapper}>
        <View style={styles.search_field_inner_wrapper}>
          <Image style={styles.icon_button} source={require('../images/ic_search.png')} />
          <TextInput
            style={styles.search_field_text_input}
            keyboardType="default"
            placeholder={this.props.placeholderText}
            onChangeText={(text) => this.props.onChangeSearchText(text)}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('searchField', () => searchField);
