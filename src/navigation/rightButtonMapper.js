'use strict';

import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

export function bindButton (navigator, bindFunction) {
  let currentRoutesArray = navigator.getCurrentRoutes();
  let currentScene = currentRoutesArray[currentRoutesArray.length - 1];
  let passProps = currentScene.passProps;
  passProps.onRightButtonPress = bindFunction;
}
