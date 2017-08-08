import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

// import styles from '../styles/basestyles.js';

export default class tester extends Component {

  render () {

    return (
        <View style={styles.container}>
          <Text style={{backgroundColor: 'rgba(0, 77, 27, 1)', marginTop: 200, alignSelf: 'center'}}>Loading</Text>
        </View>
    );
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch'
  },
});

AppRegistry.registerComponent('tester', () => tester);
