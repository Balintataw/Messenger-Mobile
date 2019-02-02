import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import { Auth } from 'aws-amplify';
import styles from './styles';

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  logout = async () => {
    try {
      await Auth.signOut()
      // go to login Screen
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    console.log('props; ', this.props)
    return (
      <View style={styles.container}>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
        <Button
          onPress={() => {
              // redirect
          }}
          title="View next screen"
        />
      </View>
    )
  }
};