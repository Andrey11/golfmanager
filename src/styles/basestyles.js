'use strict';
import React, {
  StyleSheet,
  PixelRatio
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  start_page__body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  start_page__text: {
    paddingRight: 10,
  },
  body: {
    // flex: 1,
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  scroll_body: {
    height: 500
  },

  picker_android: {
    flex: 1,
    flexDirection: 'column'
  },

  text_field_with_icon: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
    borderRadius: 3,
    borderWidth: 1 / PixelRatio.get()
  },

  textinput: {
    fontSize: 14,
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0
  },
  icon_button: {
    width: 24,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#0485A9',
    fontSize: 16
  },
  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
});
