'use strict';

import React, { Component } from 'react';
import {
  Text,
  Navigator
} from 'react-native';

import Button from '../components/button';
import IconButton from '../components/iconButton';

import styles from '../styles/basestyles.js';

export var navigationBarRouteMapper = {
  LeftButton (route, navigator, index, navState) {
    if(route.passProps.leftButton) {
      return (
        <IconButton
          iconSource={require('../images/ic_arrow_back.png')}
          touchableHighlightStyle={styles.nav_left_icon_button}
          underlayColor={'rgba(255, 255, 255, 0.3)'}
          imageStyle={styles.nav_icon}
          onButtonPressed={() => { navigator.pop() }}>
        </IconButton>
      );

    } else {
      return null;
    }
  },
  RightButton (route, navigator, index, navState) {
    if (route.passProps.rightButton) {
      if (route.passProps.rightButtonName) {
        return (
          <Button
            text={route.passProps.rightButtonName}
            onpress={() => route.passProps.onRightButtonPress()}
            button_styles={styles.nav_text_button}
            button_text_styles={styles.nav_button_text} />
        );
      } else {
        return (
          <IconButton
            iconSource={require('../images/ic_settings.png')}
            touchableHighlightStyle={styles.nav_right_icon_button}
            underlayColor={'rgba(255, 255, 255, 0.3)'}
            imageStyle={styles.nav_icon}
            onButtonPressed={() => route.passProps.onRightButtonPress()}>
          </IconButton>
        );
      }
    } else {
      return null;
    }
  },
  Title (route, navigator, index, navState) {
    return <Text style={ styles.navTitle }>{route.passProps.navHeaderTitle}</Text>
  }
};
