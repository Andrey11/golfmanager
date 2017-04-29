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

import { TeeBoxTypes } from '../utilities/const';

import IconTextButton from './iconTextButton';

import base_css from '../styles/basestyles.js';

export default class holeItemFull extends Component {

  constructor (props) {
    super(props);

    this.state = {
      par: '0',
      distanceRED: '0',
      distanceWHITE: '0',
      distanceBLUE: '0',
      distanceBLACK: '0',
      distanceGOLD: '0',
    };
  }

  componentDidMount () {
    this.setState({
      par: this.props.parText,
      distanceRED: this.props.distanceREDText,
      distanceWHITE: this.props.distanceWHITEText,
      distanceBLUE: this.props.distanceBLUEText,
      distanceBLACK: this.props.distanceBLACKText,
      distanceGOLD: this.props.distanceGOLDText,
    });
  }

  onChangeParText (text) {
    this.props.onChangeParText(this.props.hole, text);
    this.setState({par: text});
  }

  onChangeDistanceText (text, teeType) {
    this.props.onChangeDistanceText(this.props.hole, text, teeType);

    let state = {};
    state['distance' + teeType] = text;

    this.setState(state);
  }

  render () {
    return (

        <View style={private_css.view_body}>

          <View style={[private_css.header_wrapper, base_css.bg_color_white]}>
            <Text style={private_css.text_label}>
              {this.props.hole}
            </Text>
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_green]}>
            <TextInput
              style={private_css.text_input_par_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              value={this.state.par}
              maxLength={1}
              onChangeText={(text) => this.onChangeParText(text)}
            />
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_gold]}>
            <TextInput
              style={private_css.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'next'}
              value={this.state.distanceGOLD}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text, TeeBoxTypes.GOLD)}
            />
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_black]}>
            <TextInput
              style={private_css.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'next'}
              value={this.state.distanceBLACK}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text, TeeBoxTypes.BLACK)}
            />
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_blue]}>
            <TextInput
              style={private_css.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'next'}
              value={this.state.distanceBLUE}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text, TeeBoxTypes.BLUE)}
            />
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_white]}>
            <TextInput
              style={private_css.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'next'}
              value={this.state.distanceWHITE}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text, TeeBoxTypes.WHITE)}
            />
          </View>

          <View style={[private_css.header_wrapper, base_css.bg_color_red]}>
            <TextInput
              style={private_css.text_input_body}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              selectTextOnFocus={true}
              keyboardType={'numeric'}
              returnKeyType={'next'}
              value={this.state.distanceRED}
              maxLength={3}
              onChangeText={(text) => this.onChangeDistanceText(text, TeeBoxTypes.RED)}
            />
          </View>

        </View>
    );
  }
}

AppRegistry.registerComponent('holeItemFull', () => holeItemFull);


const private_css = StyleSheet.create({

  view_body: {
    flex: 1,
    paddingRight: 2,
    paddingLeft: 2,
    // paddingTop: 5,
    paddingBottom: 1,
    marginRight: 0,
    marginLeft: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  header_wrapper: {
    // backgroundColor: 'rgba(134, 121, 122, 0.8)',
    height: 34,
    width: 52,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2,
  },

  text_label_wrapper: {
    width: 30,
    alignItems: 'flex-start',
  },

  text_label: {
    fontFamily: 'ArialRoundedMTBold',
  },

  text_input_view_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text_input_par_body: {
    fontFamily: 'ArialRoundedMTBold',
    height: 30,
    width: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingLeft: 2,
    paddingRight: 2,
    borderColor: 'rgba(0, 77, 27, 0.3)',
    // borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 3,
    borderWidth: 1,
  },

  text_input_body: {
    fontFamily: 'ArialRoundedMTBold',
    height: 30,
    width: 40,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingLeft: 2,
    paddingRight: 2,
    // borderColor: 'rgba(0, 77, 27, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    borderWidth: 1,
  }

});
