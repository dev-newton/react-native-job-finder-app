import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class  ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarIcon:(
      <Icon name="favorite" size={30} color="white" />
    ),
    headerRight:(
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="transparent"
        color="rgba(0, 122, 255, 1)"

      />
    ),
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
         company, formattedRelativeTime, jobtitle,
         url, longitude, latitude, jobkey
       } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#3399ff"
              onPress={() => Linking.openURL(url) }
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
    detailWrapper: {
      marginTop: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    italics: {
      fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
