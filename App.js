import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

console.disableYellowBox = true;

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        },
        {
          tabBarPosition: 'bottom',
          tabBarOptions: {
              upperCaseLabel: false,
              showIcon: true,
              tintColor: 'grey',

            labelStyle: {
            margin: 0,
            color: '#c2e0ff'
          },
          iconStyle: {
            tintColor: '#3399ff',
            activeTintColor: 'white',
          },
          style: {
            backgroundColor: '#3399ff'
          },
          indicatorStyle: {
           backgroundColor: 'transparent',
       }
        }
      })
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      lazyLoad: true
    }
  );

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
