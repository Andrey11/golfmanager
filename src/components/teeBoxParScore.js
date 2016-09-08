import React, { Component } from 'react';
import {
  AppRegistry,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class teeBoxParScore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dummy: ''
    };
  }

  setModalVisible(visible) {
    if (!visible) {
      this.props.onRequestClose();
    }
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <TouchableHighlight onPress={() => { this.setModalVisible(true) }}>
            <Text>Show Modal</Text>
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.props.onRequestClose()}}>
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TextInput
              keyboardType="default"
              placeholder={"Leave me a note"}
              onChangeText={(text) => this.setState({dummy: text})}
            />
            <TouchableHighlight onPress={() => {
              this.setModalVisible(false)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('teeBoxParScore', () => teeBoxParScore);
