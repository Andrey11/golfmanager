'use strict';
import React, {
  StyleSheet,
  PixelRatio
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },

  body_width_stretched: {
    flex:1,
    alignSelf: 'stretch',
  },

  margin_right_5: {
    marginRight: 5,
  },

  scene_offset_top: {
    marginTop: 60,
  },

  basic_text: {
    fontFamily: 'ArialRoundedMTBold',
    fontSize: 14,
  },

  tee_box_header_text: {
    fontFamily: 'ArialRoundedMTBold',
    fontSize: 12,
  },

  connecting_indicator: {
    paddingTop: 10,
  },

  // Global background image style
  background_image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // START OF       Navigation styles
  navBar: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderColor: 'rgba(190, 190, 190, 1)'
  },

  navTitle: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: 'ArialRoundedMTBold',
  },

  nav_text_button: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
    padding: 7,
    marginRight: 5
  },

  nav_button_text: {
    color: 'rgba(0, 77, 27, 1)',
    textAlign: 'center',
    fontFamily: 'ArialRoundedMTBold',
  },

  nav_left_icon_button: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingLeft: 7,
    paddingTop: 2,
  },

  nav_right_icon_button: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    paddingRight: 7,
    paddingTop: 2,
  },

  nav_icon: {
    width: 30,
    height: 30
  },
  // END OF       Navigation styles


  // START OF     select course scene
  select_course_body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  selectable_item: {
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
  // END OF       select course scene

  // START OF     iconTextButton component
  icon_text_button_layout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 3,
  },

  // END OF       iconTextButton scene

  // START OF     friendItem component
  friend_item: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  icon_text_button: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderColor: 'rgba(0, 77, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
  },

  friend_item_text: {
    fontSize: 14,
    fontFamily: 'ArialRoundedMTBold',
  },


  // END OF       select course scene

  // START OF     Notification dialogs
  error_notification: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(215, 0, 0, 0.7)',
    borderColor: 'rgba(125, 0, 0, 0.5)',
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    padding: 5,
  },

  success_notification: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 145, 27, 0.5)',
    borderColor: 'rgba(0, 145, 27, 1)',
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    padding: 5,
  },

  notification_text: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'ArialRoundedMTBold',
  },

  icon_notification: {
    width: 24,
    height: 24,
    marginLeft: 5,
    marginRight: 1,
    tintColor: 'rgba(255, 255, 255, 0.9)',
  },
  // END OF       Notification dialogs

  add_round_body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 60,
  },

  add_round_button: {
    backgroundColor: 'rgba(0, 145, 27, 1)',
    borderColor: 'rgba(0, 145, 27, 1)',
    borderRadius: 45,
    borderWidth: 1,
    margin: 10,
    padding: 20,
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
    flex: 1,
    marginTop: 60,
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

  scroll_body: {
    flex: 1
  },

  picker_android: {
    flex: 1,
    flexDirection: 'column'
  },

  // START OF     search field component
  search_field_outter_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    height: 50,
    backgroundColor: 'rgba(191, 191, 191, 0.8)'
  },

  search_field_inner_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    borderWidth: 1 / PixelRatio.get()
  },

  search_field_text_input: {
    fontFamily: 'ArialRoundedMTBold',
    fontSize: 14,
    width: 320,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0
  },
  // END OF     search field component

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

  textinput_with_two_icons: {
    fontSize: 14,
    width: 276,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
    fontFamily: 'ArialRoundedMTBold',
  },

  textinput: {
    fontSize: 14,
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
    fontFamily: 'ArialRoundedMTBold',
  },

  icon_hidden: {
    width: 24,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.0,
  },

  icon_button_green: {
    width: 24,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.7,
    tintColor: 'rgba(0, 145, 27, 1)',
  },

  icon_button_red: {
    width: 24,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.7,
    tintColor: 'rgba(215, 0, 0, 1)',
  },

  icon_button: {
    width: 24,
    height: 24,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.7
  },

  activity_indicator: {
    paddingLeft: 2,
    paddingRight: 2,
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
    fontFamily: 'ArialRoundedMTBold',
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
    fontSize: 18,
    fontFamily: 'ArialRoundedMTBold',
  },

  image: {
    width: 100,
    height: 100
  },


  // START OF     background colors
  bg_color_gold: {
    backgroundColor: 'rgba(247, 239, 0, 1)',
  },

  bg_color_black: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },

  bg_color_blue: {
    backgroundColor: 'rgba(0, 23, 171, 1)',
  },

  bg_color_white: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  bg_color_red: {
    backgroundColor: 'rgba(222, 0, 26, 1)',
  },

  bg_color_green: {
    backgroundColor: 'rgba(0, 77, 27, 1)',
  },
  // END OF     background colors

  // START OF   border colors
  br_color_black: {
    borderColor: 'rgba(0, 0, 0, 1)',
  },

  br_color_white: {
    borderColor: 'rgba(255, 255, 255, 1)',
  },




});
