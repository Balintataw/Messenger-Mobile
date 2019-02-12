import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import Config from 'react-native-config';

import config from '../config';
import styles from './styles';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem(Config.USER_TOKEN);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
        <View style={styles.splashScreen}>
            <ActivityIndicator size="large" />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

export default AuthLoadingScreen;