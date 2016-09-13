'use strict';
import React, {
  StyleSheet,
  PixelRatio
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },

  navBar: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderColor: 'rgba(190, 190, 190, 1)'
  },

  navTitle: {
    fontSize: 16
  },

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  start_page__body: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#FFFFFF',
    borderRadius: 3
  },

  start_page__text: {
    paddingRight: 10,
  },

  loading_wrapper: {
    // height: 40,
    // width: 150,
    // backgroundColor: '#FFFFFF',
    // borderColor: '#FFFFFF',
    // borderRadius: 3,
    // opacity: 0.3
  },

  settings_body: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  unathenticated_body: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center'
  },

  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  forgot_password_style: {
    alignItems: 'flex-start',
    width: 344,
  },

  background_image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },


  scroll_body: {
    height: 500
  },

  picker_android: {
    flex: 1,
    flexDirection: 'column'
  },

  text_field_with_icon: {
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    paddingRight: 10,
    opacity: 0.5
  },

  transparent_button: {
    marginTop: 5,
    marginBottom: 10
  },

  transparent_button_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16
  },

  semi_transparent_button: {
    marginTop: 50,
    padding: 15,
    width: 344,
    backgroundColor: 'rgba(0, 77, 27, 0.5)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },

  semi_transparent_button_second: {
    marginTop: 5,
    padding: 15,
    width: 344,
    backgroundColor: 'rgba(0, 77, 27, 0.5)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
  },

  semi_transparent_button_text: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  },

  login_button: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
    padding: 7,
    marginRight: 5
  },

  login_button_text: {
    color: 'rgba(0, 77, 27, 1)',
    textAlign: 'center',
  },

  primary_button: {
    margin: 10,
    width: 344,
    padding: 13,
    backgroundColor: 'rgba(0, 77, 27, 1)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
  },
  primary_button_text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  }
});
