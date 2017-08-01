import React, { Component } from 'react';
import { Alert, Button, Clipboard, Text, View } from 'react-native';

import { Header } from '../components';

class ActiveTrip extends Component {
  state = { id: '', results: {} };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchID();
  }

  copyID = id => {
    Clipboard.setString(id);
    Alert.alert('Copied ID!');
  };

  fetchID = () => {
    fetch('http://localhost:8000/v1/keygen')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ id: responseJSON.id });
      })
      .catch(error => {
        console.log('Failed to fetch response.', error);
      });
  };

  fetchResults = () => {
    fetch('http://localhost:8000/v1/results?id=' + this.state.id)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ results: responseJSON });
      })
      .catch(error => {
        console.log('Failed to fetch response.', error);
      });
  };

  render() {
    return (
      <View>
        <Header>Active Trip</Header>
        <View style={styles.buttonStyle}>
          <Button
            onPress={() => this.copyID(this.state.id)}
            title={this.state.id}
            color="#007aff"
          />
          <Button onPress={this.fetchResults} title="Done" color="#007aff" />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderWidth: 1,
    padding: 5,
  },
};

export default ActiveTrip;
