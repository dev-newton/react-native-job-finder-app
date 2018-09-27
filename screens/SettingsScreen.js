import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class  SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Review Jobs',
    tabBarIcon:(
      <Icon name="favorite" size={30} color="white" />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever'}}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
