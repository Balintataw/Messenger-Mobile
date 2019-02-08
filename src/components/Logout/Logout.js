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
            <TouchableOpacity onPress={this.logout}>
                <View style={styles.container}>
                    <Text>Logout</Text>
                </View>
            </TouchableOpacity>
        )
    }
};

export default withNavigation(Logout);
