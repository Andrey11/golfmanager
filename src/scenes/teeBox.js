'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Image,
  InteractionManager,
  Picker,
  TouchableHighlight
} from 'react-native';

import HoleItem from '../components/holeItem';
import styles from '../styles/basestyles.js';

export default class teeBox extends Component {

	constructor (props) {
    super(props);

    this.state = {
      par1: '0',
      par2: '0',
      par3: '0',
      par4: '0',
      par5: '0',
      par6: '0',
      par7: '0',
      par8: '0',
      par9: '0',
      par10: '0',
      par11: '0',
      par12: '0',
      par13: '0',
      par14: '0',
      par15: '0',
      par16: '0',
      par17: '0',
      par18: '0',
      distancePar1: '0',
      distancePar2: '0',
      distancePar3: '0',
      distancePar4: '0',
      distancePar5: '0',
      distancePar6: '0',
      distancePar7: '0',
      distancePar8: '0',
      distancePar9: '0',
      distancePar10: '0',
      distancePar11: '0',
      distancePar12: '0',
      distancePar13: '0',
      distancePar14: '0',
      distancePar15: '0',
      distancePar16: '0',
      distancePar17: '0',
      distancePar18: '0',
      teeBoxType: '0',
    };

    this.onChangeParText = this.onChangeParText.bind(this);
    this.onChangeDistanceText = this.onChangeDistanceText.bind(this);
	}

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  onChangeParText (holeNumber, text) {
    var newState = {};
    newState['par' + holeNumber] = text;

    this.setState(newState);
  }

  onChangeDistanceText (holeNumber, text) {
    var newState = {};
    newState['distancePar' + holeNumber] = text;

    this.setState(newState);
  }

  render () {
    return (
      <View style={[styles.scene_offset_top, styles.body_width_stretched]}>

        { this._renderTeeBoxStats() }

        <ScrollView>
          {this._renderParItems()}
        </ScrollView>

      </View>
    );
  }

  _renderParItems () {
    let holeItems = [];
    let holeText = '';
    let parText = ''
    let distanceText = '';

    for(let i=1; i<=18; i++) {
      holeText = 'Hole #' + i;
      parText = this.state['par' + i];
      distanceText = this.state['distancePar' + i];

      holeItems.push(
        <HoleItem
          key={i}
          hole={i.toString()}
          holeText={holeText}
          parText={parText}
          distanceText={distanceText}
          onChangeParText={this.onChangeParText}
          onChangeDistanceText={this.onChangeDistanceText}
        />
      );
    }

    return holeItems;
  }

  _renderTeeBoxStats () {
    let parScore = 0;
    let totalDistance = 0;

    return (
      <View>
        <Text>
          {'Par: ' + parScore}
        </Text>
        <Text>
          {'Total distance: ' + totalDistance}
        </Text>
      </View>
    );
  }


}

AppRegistry.registerComponent('teeBox', () => teeBox);
