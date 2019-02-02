import React from 'react'
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation';

import { Auth } from 'aws-amplify';
import styles from './styles';

class Logout extends React.Component {
    logout = async () => {
        try {
            await Auth.signOut()
            await AsyncStorage.clear();
        } catch (err) {
            console.log('error signing out...: ', err);
        } finally {
            this.props.navigation.navigate('AuthLoading');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.logout}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

export default withNavigation(Logout);
