'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput
} from 'react-native';

export default class textFieldWithIcon extends Component {

  setFocus () {
    this.refs.input_textfield.focus();
  }

  render () {
    return (
      <View style={[localstyles.component_wrapper, this.props.style]}>
        <View style={localstyles.image_wrapper}>
          <Image style={localstyles.icon_textfield_type}
            source={this.props.iconTextFieldTypeSource} />
        </View>
        <TextInput
          ref='input_textfield'
          style={localstyles.textinput}
          underlineColorAndroid='rgba(0,0,0,0)'
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholderText}
          placeholderTextColor='rgba(100, 110, 111, 0.6)'
          returnKeyType={this.props.returnKeyType}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={this.props.autoFocus}
          secureTextEntry={this.props.secureTextEntry}
          value={this.props.textValue}
          onChangeText={this.props.onChangeText}
          onBlur={this.props.onBlur}
          onSubmitEditing={this.props.onSubmitEditing}
        />
        <Image style={[localstyles.icon_textfield_state,
                       {display: this.props.textFieldState ?
                         'flex' : 'none'}]}

            source={this.props.iconTextFieldStateSource} />
      </View>
    );
  }
}

const localstyles = StyleSheet.create({
  component_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  icon_textfield_type: {
    width: 30,
    height: 30,
    tintColor: 'rgba(255, 255, 255, 1)',
  },

  icon_textfield_state: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: 'rgba(208, 68, 55, 1)',
  },

  image_wrapper: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 110, 111, 1)',
    // backgroundColor: 'rgba(48, 133, 46, 1)',
    // backgroundColor: 'rgba(37, 103, 35, 1)',
    // backgroundColor: 'rgba(55, 115, 55, 1)',
  },

  textinput: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0,
    // fontFamily: 'ArialRoundedMTBold',
    fontWeight: '200',
    fontFamily: 'Avenir',
  },

});



AppRegistry.registerComponent('textFieldWithIcon', () => textFieldWithIcon);
