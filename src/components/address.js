'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

export default class address extends Component {

  render(){
    return (
      <View>
        <Text>{'Address:'}</Text>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Address line 1"}
            onChangeText={(text) => this.setState({line1: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Address line 2"}
            onChangeText={(text) => this.setState({line2: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"City"}
            onChangeText={(text) => this.setState({city: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Province / State"}
            onChangeText={(text) => this.setState({province: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Postal / Zip code"}
            onChangeText={(text) => this.setState({postal_code: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Country"}
            onChangeText={(text) => this.setState({country: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="phone-pad"
            placeholder={"Pro shop phone"}
            onChangeText={(text) => this.setState({pro_shop_phone: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="phone-pad"
            placeholder={"Club house phone"}
            onChangeText={(text) => this.setState({club_house_phone: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="phone-pad"
            placeholder={"Restaurant phone"}
            onChangeText={(text) => this.setState({restaurant_phone: text})}
          />
        </View>
        <View style={styles.text_field_with_icon}>
          <Image style={styles.icon_button} source={require('../images/ic_golf_course.png')} />
          <TextInput
            style={styles.textinput}
            keyboardType="default"
            placeholder={"Golf course website url"}
            onChangeText={(text) => this.setState({url: text})}
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('address', () => address);
