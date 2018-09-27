import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';


class  MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="my-location" size={30} tintColor={{tintColor}} color="white" />
    )
  }

onRegionChangeComplete = (region) => {
  this.setState({ region });
}

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if(!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
         />
         <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            backgroundColor="#3399ff"
            icon={{ name: 'search' }}
            onPress={ this.onButtonPress}
          />
         </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(null, actions)(MapScreen);
