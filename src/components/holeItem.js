'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { FriendStatusTypes, FriendActionTypes } from '../utilities/const';
import IconTextButton from './iconTextButton';


export default class holeItem extends Component {

  constructor (props) {
    super(props);

    this.state = {
      par: '0',
      distance: '0'
    };
  }

  componentDidMount () {
    this.setState({
      par: this.props.parText,
      distance: this.props.distanceText
    });
  }

  onChangeParText (text) {
    this.props.onChangeParText(this.props.hole, text);
    this.setState({par: text});
  }

  onChangeDistanceText (text) {
    this.props.onChangeDistanceText(this.props.hole, text);
    this.setState({distance: text});
  }

  render () {
    return (

        <View style={[styles.view_body, this._getViewBodyBackground()]}>

          <View style={styles.text_label_wrapper}>
            <Text style={styles.text_label}>
              {this.props.holeText}
            </Text>
          </View>

          <View style={styles.text_input_view_wrapper}>
            <Text style={styles.text_label}>
              {'Par: '}
            </Text>
            <TextInput
              style={styles.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              value={this.state.par}
              maxLength={2}
              onChangeText={(text) => this.onChangeParText(text)}
            />
          </View>

          <View style={styles.text_input_view_wrapper}>
            <Text style={styles.text_label}>
              {'Distance: '}
            </Text>
            <TextInput
              style={styles.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              value={this.state.distance}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text)}
            />
            <Text style={styles.text_label}>
              {' yards'}
            </Text>
          </View>

        </View>

    );
  }

  _getViewBodyBackground () {
    if (this.props.hole & 1) {
      return styles.view_body_background_odd;
    }
    return styles.view_body_background_even;
  }

}

AppRegistry.registerComponent('holeItem', () => holeItem);


const styles = StyleSheet.create({

  view_body: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  view_body_background_odd: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },

  view_body_background_even: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },

  text_label_wrapper: {
    width: 60,
    alignItems: 'flex-start',
  },

  text_label: {
    fontFamily: 'ArialRoundedMTBold',
  },

  text_input_view_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text_input_body: {
    fontFamily: 'ArialRoundedMTBold',
    height: 30,
    width: 50,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingLeft: 2,
    paddingRight: 2,
    borderColor: 'rgba(0, 77, 27, 0.3)',
    borderRadius: 3,
    borderWidth: 1,
  }

});
